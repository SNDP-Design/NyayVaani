import express from "express";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import { mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { strFromU8, unzipSync, zipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import { SarvamAIClient } from "sarvamai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "4.25mb" }));

const SARVAM_API_KEY = process.env.SARVAM_API_KEY || "";
const SARVAM_DOCUMENT_PAGE_LIMIT = 10;
const NYAYVAANI_PDF_PAGE_LIMIT = 50;
const sarvam = SARVAM_API_KEY
  ? new SarvamAIClient({ apiSubscriptionKey: SARVAM_API_KEY })
  : null;

const LANGUAGE_CODES: Record<string, string> = {
  hi: "hi-IN",
  en: "en-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  pa: "pa-IN",
};

const COURT_ANALYSIS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "title",
    "caseNumber",
    "courtName",
    "orderDate",
    "isPhotocopyQuality",
    "hasSealsAndSkew",
    "isRefusalState",
    "refusalReason",
    "refusalConfidence",
    "overallConfidence",
    "operativeDirectionVerbatim",
    "operativeParagraphNumbers",
    "paragraphs",
    "nextSteps",
    "plainLanguageExplanation",
  ],
  properties: {
    title: { type: "string" },
    caseNumber: { type: "string" },
    courtName: { type: "string" },
    orderDate: { type: "string" },
    isPhotocopyQuality: { type: "boolean" },
    hasSealsAndSkew: { type: "boolean" },
    isRefusalState: { type: "boolean" },
    refusalReason: { type: "string" },
    refusalConfidence: { type: "number", minimum: 0, maximum: 100 },
    overallConfidence: { type: "number", minimum: 0, maximum: 100 },
    operativeDirectionVerbatim: { type: "string" },
    operativeParagraphNumbers: {
      type: "array",
      items: { type: "number" },
    },
    paragraphs: {
      type: "array",
      maxItems: 24,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "paragraphNumber",
          "text",
          "category",
          "speaker",
          "confidence",
          "notes",
          "rejectionDetail",
        ],
        properties: {
          id: { type: "string" },
          paragraphNumber: { type: "number" },
          text: { type: "string" },
          category: {
            type: "string",
            enum: [
              "court_direction",
              "petitioner_submission",
              "respondent_submission",
              "recital_proceedings",
              "rejected_claim",
              "unknown_unclear",
            ],
          },
          speaker: { type: "string" },
          confidence: { type: "number", minimum: 0, maximum: 100 },
          notes: { type: "string" },
          rejectionDetail: { type: "string" },
        },
      },
    },
    nextSteps: {
      type: "array",
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "action",
          "deadline",
          "forum",
          "sourceParagraphId",
          "quotedSource",
        ],
        properties: {
          id: { type: "string" },
          action: { type: "string" },
          deadline: { type: "string" },
          forum: { type: "string" },
          sourceParagraphId: { type: "string" },
          quotedSource: { type: "string" },
        },
      },
    },
    plainLanguageExplanation: { type: "string", maxLength: 1600 },
  },
};

const COURT_ANALYSIS_INSTRUCTION = `You are NyayVaani, a careful Indian court-order
analysis assistant powered only by Sarvam AI. The document text was extracted by
Sarvam Vision. Analyze only that extracted text.

Rules:
1. Preserve the distinction between the court's directions, petitioner/applicant
   submissions, respondent submissions, procedural recitals, and claims explicitly
   rejected by the court.
2. Copy the operative direction verbatim. Never invent or silently repair wording.
3. If the document is incomplete, unreadable, missing the operative page, or purely
   procedural without a substantive direction, set isRefusalState to true and
   explain why. Never guess a court direction.
4. Every next step must come only from the operative direction and must include its
   exact quoted source. Use "Not stated" when the document gives no deadline or forum.
5. Produce one concise English plain-language explanation of no more than 100
   words. It must be calm and clearly state that it is not legal advice.
6. NyayVaani will localize that explanation with Sarvam Translate and read it
   aloud with Sarvam Bulbul v3.
7. Confidence scores must reflect extraction ambiguity and must never be presented
   as a guarantee.
8. Keep the response compact. Include at most 24 legally significant paragraphs
   and at most 8 next steps. Do not reproduce the entire document.
9. Write nextSteps action, deadline, and forum in the user's preferred language.
   Keep quotedSource verbatim from the extracted document.`;

function requireSarvam(res: express.Response): SarvamAIClient | null {
  if (!sarvam) {
    res.status(503).json({
      error: "Sarvam AI is temporarily unavailable. Please contact the NyayVaani team.",
      code: "SARVAM_NOT_CONFIGURED",
    });
    return null;
  }
  return sarvam;
}

function toLanguageCode(language: string): string {
  return LANGUAGE_CODES[language] || "en-IN";
}

function parseJsonContent(content: unknown): any {
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("SARVAM_EMPTY_RESPONSE");
  }

  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  const jsonText =
    firstBrace >= 0 && lastBrace >= firstBrace
      ? cleaned.slice(firstBrace, lastBrace + 1)
      : cleaned;
  try {
    return JSON.parse(jsonText);
  } catch {
    throw new Error("SARVAM_INVALID_JSON_RESPONSE");
  }
}

function completionText(completion: any): string {
  const message = completion?.choices?.[0]?.message;
  const content =
    typeof message?.content === "string" ? message.content.trim() : "";
  if (content) return content;
  if (typeof message?.refusal === "string" && message.refusal.trim()) {
    throw new Error("SARVAM_REFUSED_RESPONSE");
  }
  throw new Error("SARVAM_EMPTY_RESPONSE");
}

function clampConfidence(value: unknown, fallback = 50): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  const percentage = numeric > 0 && numeric <= 1 ? numeric * 100 : numeric;
  return Math.min(100, Math.max(0, percentage));
}

function languageMap(
  value: unknown,
  fallback: string,
): Record<string, string> {
  const source =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const english =
    typeof source.en === "string" && source.en.trim()
      ? source.en.trim()
      : fallback;
  return Object.fromEntries(
    Object.keys(LANGUAGE_CODES).map((language) => [
      language,
      typeof source[language] === "string" && source[language].trim()
        ? source[language].trim()
        : english,
    ]),
  );
}

async function translateExplanation(
  englishText: string,
): Promise<Record<string, string>> {
  const cleanEnglish = englishText.trim().slice(0, 1000);
  if (!sarvam || !cleanEnglish) {
    return languageMap({}, cleanEnglish);
  }

  const translations = await Promise.all(
    Object.entries(LANGUAGE_CODES).map(async ([language, languageCode]) => {
      if (language === "en") return [language, cleanEnglish] as const;
      try {
        const result = await sarvam.text.translate(
          {
            input: cleanEnglish,
            source_language_code: "en-IN",
            target_language_code: languageCode,
            model: "mayura:v1",
            mode: "formal",
            output_script: "fully-native",
          } as any,
          { timeoutInSeconds: 30, maxRetries: 1 },
        );
        const translated =
          typeof result.translated_text === "string"
            ? result.translated_text.trim()
            : "";
        return [language, translated || cleanEnglish] as const;
      } catch (error) {
        console.error(`Sarvam translation failed for ${language}:`, error);
        return [language, cleanEnglish] as const;
      }
    }),
  );

  return Object.fromEntries(translations);
}

async function translateNextSteps(
  steps: Array<Record<string, any>>,
  language: string,
): Promise<Array<Record<string, any>>> {
  const targetLanguage = LANGUAGE_CODES[language];
  if (!sarvam || !targetLanguage || language === "en") return steps;

  return Promise.all(
    steps.map(async (step) => {
      const fields = [step.action, step.deadline, step.forum].map((value) =>
        String(value || "Not stated").trim(),
      );
      try {
        const result = await sarvam.text.translate(
          {
            input: fields.map((value, index) => `${index + 1}. ${value}`).join("\n"),
            source_language_code: "en-IN",
            target_language_code: targetLanguage,
            model: "sarvam-translate:v1",
            mode: "formal",
          } as any,
          { timeoutInSeconds: 30, maxRetries: 1 },
        );
        const translatedFields = String(result.translated_text || "")
          .split(/\r?\n/)
          .map((line) => line.replace(/^\s*\d+\s*[.)-]\s*/, "").trim())
          .filter(Boolean);
        if (translatedFields.length !== 3) return step;
        return {
          ...step,
          action: translatedFields[0],
          deadline: translatedFields[1],
          forum: translatedFields[2],
        };
      } catch (error) {
        console.error("Sarvam next-step translation failed:", error);
        return step;
      }
    }),
  );
}

function normalizeCourtAnalysis(value: unknown): any {
  const raw =
    value && typeof value === "object" ? (value as Record<string, any>) : {};
  const operativeDirection =
    typeof raw.operativeDirectionVerbatim === "string"
      ? raw.operativeDirectionVerbatim.trim()
      : "";
  const isRefusalState = Boolean(raw.isRefusalState) || !operativeDirection;
  const paragraphs = Array.isArray(raw.paragraphs)
    ? raw.paragraphs.slice(0, 24).map((paragraph: any, index: number) => {
        const allowedCategories = new Set([
          "court_direction",
          "petitioner_submission",
          "respondent_submission",
          "recital_proceedings",
          "rejected_claim",
          "unknown_unclear",
        ]);
        return {
          id: `p-${index + 1}`,
          paragraphNumber: Number.isFinite(Number(paragraph?.paragraphNumber))
            ? Number(paragraph.paragraphNumber)
            : index + 1,
          text: String(paragraph?.text || ""),
          category: allowedCategories.has(paragraph?.category)
            ? paragraph.category
            : "unknown_unclear",
          speaker: String(paragraph?.speaker || "Not stated"),
          confidence: clampConfidence(paragraph?.confidence),
          notes: String(paragraph?.notes || ""),
          rejectionDetail: String(paragraph?.rejectionDetail || ""),
          provenance: "ai_tagged",
        };
      })
    : [];
  const nextSteps = Array.isArray(raw.nextSteps)
    ? raw.nextSteps.slice(0, 8).map((step: any, index: number) => ({
        id: `step-${index + 1}`,
        action: String(step?.action || ""),
        deadline: String(step?.deadline || "Not stated"),
        forum: String(step?.forum || "Not stated"),
        sourceParagraphId:
          typeof step?.sourceParagraphId === "string" &&
          /^p-\d+$/.test(step.sourceParagraphId)
            ? step.sourceParagraphId
            : "",
        quotedSource: String(step?.quotedSource || ""),
      }))
    : [];
  const explanationFallback = isRefusalState
    ? "NyayVaani could not identify a reliable operative court direction in this document."
    : "NyayVaani analyzed the court order. Verify all extracted directions against the original document.";
  const explanation =
    typeof raw.plainLanguageExplanation === "string" &&
    raw.plainLanguageExplanation.trim()
      ? raw.plainLanguageExplanation.trim()
      : typeof raw.plainLanguageExplanations?.en === "string" &&
          raw.plainLanguageExplanations.en.trim()
        ? raw.plainLanguageExplanations.en.trim()
        : explanationFallback;
  const explanations = languageMap({}, explanation);

  return {
    title: String(raw.title || "Uploaded Court Document"),
    caseNumber: String(raw.caseNumber || "Not stated"),
    courtName: String(raw.courtName || "Not stated"),
    orderDate: String(raw.orderDate || "Not stated"),
    isPhotocopyQuality: Boolean(raw.isPhotocopyQuality),
    hasSealsAndSkew: Boolean(raw.hasSealsAndSkew),
    isRefusalState,
    refusalReason: isRefusalState
      ? String(
          raw.refusalReason ||
            "A reliable operative direction could not be identified. Please verify the complete court order.",
        )
      : String(raw.refusalReason || ""),
    refusalConfidence: clampConfidence(raw.refusalConfidence),
    overallConfidence: clampConfidence(raw.overallConfidence),
    operativeDirectionVerbatim: operativeDirection,
    operativeParagraphNumbers: Array.isArray(raw.operativeParagraphNumbers)
      ? raw.operativeParagraphNumbers
          .map((number: unknown) => Number(number))
          .filter(Number.isFinite)
      : [],
    paragraphs,
    nextSteps,
    plainLanguageExplanations: explanations,
    audioScripts: explanations,
    documentId: `sarvam-${randomUUID()}`,
    processedAt: new Date().toISOString(),
  };
}

function decodeDataUrl(value: string): {
  bytes: Uint8Array;
  mimeType: string;
  extension: string;
} {
  const match = value.match(/^data:([^;]+);base64,(.*)$/s);
  if (!match) {
    throw new Error("The uploaded file is not a valid base64 data URL.");
  }

  const mimeType = match[1].toLowerCase();
  const extension =
    mimeType === "application/pdf"
      ? "pdf"
      : mimeType === "image/png"
        ? "png"
        : mimeType === "image/jpeg" || mimeType === "image/jpg"
          ? "jpg"
          : "";

  if (!extension) {
    throw new Error("Sarvam Vision supports PDF, PNG, and JPEG court documents.");
  }

  return {
    bytes: new Uint8Array(Buffer.from(match[2], "base64")),
    mimeType,
    extension,
  };
}

async function extractDocumentText(
  dataUrls: string[],
  language: string,
): Promise<string> {
  if (!sarvam) {
    throw new Error("Sarvam AI is not configured.");
  }
  if (dataUrls.length === 0 || dataUrls.length > 10) {
    throw new Error("Upload one PDF or up to 10 court-order images.");
  }

  const files = dataUrls.map(decodeDataUrl);
  const pdfFiles = files.filter((file) => file.extension === "pdf");
  if (pdfFiles.length > 1 || (pdfFiles.length === 1 && files.length > 1)) {
    throw new Error("Upload one PDF by itself, or upload up to 10 images together.");
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "nyayvaani-"));

  const digitizeFile = async (
    inputPath: string,
    outputPath: string,
    sectionLabel: string,
  ): Promise<string> => {
    const job = await sarvam.documentIntelligence.createJob({
      language: toLanguageCode(language) as any,
      outputFormat: "md",
      pollingIntervalMs: 2000,
      maxPollingAttempts: 150,
    });
    await job.uploadFile(inputPath);
    await job.start();
    const status = await job.waitUntilComplete();

    if (
      status.job_state !== "Completed" &&
      status.job_state !== "PartiallyCompleted"
    ) {
      throw new Error(
        status.error_message || "The document could not be digitized.",
      );
    }

    await job.downloadOutput(outputPath);
    const archive = unzipSync(new Uint8Array(await readFile(outputPath)));
    const markdownFiles = Object.entries(archive)
      .filter(([name]) => name.toLowerCase().endsWith(".md"))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(
        ([name, bytes]) =>
          `\n\n--- ${sectionLabel} • ${name} ---\n${strFromU8(bytes)}`,
      );

    if (markdownFiles.length > 0) {
      return markdownFiles.join("").trim();
    }

    const jsonFiles = Object.entries(archive)
      .filter(([name]) => name.toLowerCase().endsWith(".json"))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(
        ([name, bytes]) =>
          `\n\n--- ${sectionLabel} • ${name} ---\n${strFromU8(bytes)}`,
      );

    if (jsonFiles.length === 0) {
      throw new Error("The document service returned no readable content.");
    }
    return jsonFiles.join("").trim();
  };

  try {
    if (pdfFiles.length === 1) {
      const sourcePdf = await PDFDocument.load(pdfFiles[0].bytes);
      const pageCount = sourcePdf.getPageCount();
      if (pageCount < 1) {
        throw new Error("The uploaded PDF has no readable pages.");
      }
      if (pageCount > NYAYVAANI_PDF_PAGE_LIMIT) {
        const error = new Error(
          `This PDF has ${pageCount} pages. NyayVaani currently supports PDFs up to ${NYAYVAANI_PDF_PAGE_LIMIT} pages.`,
        ) as Error & { statusCode?: number; code?: string };
        error.statusCode = 422;
        error.code = "PDF_PAGE_LIMIT";
        throw error;
      }

      const batchStarts = Array.from(
        { length: Math.ceil(pageCount / SARVAM_DOCUMENT_PAGE_LIMIT) },
        (_, index) => index * SARVAM_DOCUMENT_PAGE_LIMIT,
      );
      const batchTexts = await Promise.all(
        batchStarts.map(async (startPage, batchIndex) => {
          const endPage = Math.min(
            startPage + SARVAM_DOCUMENT_PAGE_LIMIT,
            pageCount,
          );
          const batchPdf = await PDFDocument.create();
          const pageIndexes = Array.from(
            { length: endPage - startPage },
            (_, index) => startPage + index,
          );
          const copiedPages = await batchPdf.copyPages(sourcePdf, pageIndexes);
          copiedPages.forEach((page) => batchPdf.addPage(page));

          const inputPath = path.join(
            tempDir,
            `court-order-pages-${startPage + 1}-${endPage}.pdf`,
          );
          const outputPath = path.join(
            tempDir,
            `document-output-${batchIndex + 1}.zip`,
          );
          await writeFile(inputPath, await batchPdf.save());
          return digitizeFile(
            inputPath,
            outputPath,
            `Pages ${startPage + 1}-${endPage}`,
          );
        }),
      );
      return batchTexts.join("\n\n").trim();
    } else {
      const inputPath = path.join(tempDir, "court-order-pages.zip");
      const outputPath = path.join(tempDir, "document-output.zip");
      const pages: Record<string, Uint8Array> = {};
      files.forEach((file, index) => {
        const pageNumber = String(index + 1).padStart(2, "0");
        pages[`page-${pageNumber}.${file.extension}`] = file.bytes;
      });
      await writeFile(inputPath, zipSync(pages, { level: 6 }));
      return await digitizeFile(
        inputPath,
        outputPath,
        `Pages 1-${files.length}`,
      );
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function analyzeCourtText(
  extractedText: string,
  language: string,
): Promise<any> {
  if (!sarvam) {
    throw new Error("Sarvam AI is not configured.");
  }

  const splitForAnalysis = (text: string, maxCharacters = 9000): string[] => {
    const chunks: string[] = [];
    let cursor = 0;
    while (cursor < text.length) {
      let end = Math.min(cursor + maxCharacters, text.length);
      if (end < text.length) {
        const paragraphBreak = text.lastIndexOf("\n\n", end);
        if (paragraphBreak > cursor + Math.floor(maxCharacters * 0.65)) {
          end = paragraphBreak;
        }
      }
      chunks.push(text.slice(cursor, end).trim());
      cursor = end;
    }
    return chunks.filter(Boolean);
  };

  const createLongDocumentDigest = async (text: string): Promise<string> => {
    const chunks = splitForAnalysis(text);
    const digests = await Promise.all(
      chunks.map(async (chunk, index) => {
        const completion = await sarvam.chat.completions(
          {
            model: "sarvam-30b",
            messages: [
              {
                role: "system",
                content: `Create compact, factual notes from one section of an Indian
court order for a later whole-document analysis. Preserve exact case numbers, court
name, dates, party names, paragraph numbers, deadlines, amounts, and the final
operative directions. Clearly label court findings, petitioner claims, respondent
claims, and procedural history. Copy decisive court wording verbatim when present.
Do not add legal advice or facts that are absent. Return plain English text, not JSON.`,
              },
              {
                role: "user",
                content: `Document section ${index + 1} of ${chunks.length}:

${chunk}`,
              },
            ],
            temperature: 0,
            reasoning_effort: "low",
            max_tokens: 1600,
            n: 1,
          } as any,
          { timeoutInSeconds: 90, maxRetries: 1 },
        );
        try {
          return `SECTION ${index + 1} NOTES:\n${completionText(completion)}`;
        } catch (error: any) {
          error.code = "LONG_DOCUMENT_DIGEST_FAILED";
          throw error;
        }
      }),
    );
    return digests.join("\n\n");
  };

  const analysisText =
    extractedText.length > 16000
      ? await createLongDocumentDigest(extractedText)
      : extractedText;
  const messages = [
    { role: "system", content: COURT_ANALYSIS_INSTRUCTION },
    {
      role: "user",
      content: `Preferred user language: ${toLanguageCode(language)}

${analysisText === extractedText ? "EXTRACTED COURT DOCUMENT" : "FULL-DOCUMENT FACTUAL DIGEST"}:
"""
${analysisText}
"""`,
    },
  ];

  let rawAnalysis: any;
  try {
    const completion = await sarvam.chat.completions(
      {
        model: "sarvam-105b",
        messages,
        temperature: 0.1,
        reasoning_effort: "low",
        max_tokens: 4096,
        n: 1,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "court_order_analysis",
            strict: true,
            schema: COURT_ANALYSIS_SCHEMA,
          },
        },
      } as any,
      { timeoutInSeconds: 120, maxRetries: 1 },
    );
    rawAnalysis = parseJsonContent(
      (completion as any).choices?.[0]?.message?.content,
    );
  } catch (error: any) {
    if (
      error?.message !== "SARVAM_EMPTY_RESPONSE" &&
      error?.message !== "SARVAM_INVALID_JSON_RESPONSE"
    ) {
      throw error;
    }

    try {
      const fallbackCompletion = await sarvam.chat.completions(
        {
          model: "sarvam-30b",
          messages: [
            ...messages,
            {
              role: "system",
              content: `Return one compact, valid JSON object only. Do not use a
markdown fence or commentary. Match this JSON schema exactly:
${JSON.stringify(COURT_ANALYSIS_SCHEMA)}`,
            },
          ],
          temperature: 0,
          reasoning_effort: "low",
          max_tokens: 4096,
          n: 1,
        } as any,
        { timeoutInSeconds: 120, maxRetries: 1 },
      );
      rawAnalysis = parseJsonContent(
        (fallbackCompletion as any).choices?.[0]?.message?.content,
      );
    } catch (fallbackError: any) {
      fallbackError.code = "STRUCTURED_ANALYSIS_FAILED";
      throw fallbackError;
    }
  }

  const analysis = normalizeCourtAnalysis(rawAnalysis);
  const localizedExplanation = await translateExplanation(
    analysis.plainLanguageExplanations.en,
  );
  analysis.plainLanguageExplanations = localizedExplanation;
  analysis.audioScripts = localizedExplanation;
  analysis.nextSteps = await translateNextSteps(analysis.nextSteps, language);
  return analysis;
}

function sarvamErrorMessage(error: any): string {
  if (error?.code === "PDF_PAGE_LIMIT") {
    return error.message;
  }
  const statusCode = error?.statusCode || error?.status;
  const errorCode = error?.body?.error?.code;
  if (statusCode === 403 || errorCode === "invalid_api_key_error") {
    return "Document analysis is temporarily unavailable. Please contact the NyayVaani team.";
  }
  if (statusCode === 429) {
    return "Document analysis is busy right now. Please wait briefly and try again.";
  }
  if (
    error?.message === "SARVAM_EMPTY_RESPONSE" ||
    error?.message === "SARVAM_INVALID_JSON_RESPONSE" ||
    error?.message === "SARVAM_REFUSED_RESPONSE"
  ) {
    return "NyayVaani could not produce a complete response. Please try again.";
  }
  if (statusCode === 400) {
    return "NyayVaani could not process this request. Please try again.";
  }
  return "NyayVaani could not complete this request. Please try again.";
}

function errorStatus(error: any): number {
  const statusCode = Number(error?.statusCode || error?.status);
  if (statusCode === 403) return 503;
  if (statusCode === 429) return 429;
  if (statusCode === 400) return 422;
  return 502;
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    provider: "Sarvam AI",
    configured: !!sarvam,
    models: {
      document: "Sarvam Vision",
      analysis: "Sarvam-105B",
      conversation: "Sarvam-30B",
      speechToText: "Saaras v3",
      textToSpeech: "Bulbul v3",
    },
  });
});

app.post("/api/analyze-document", async (req, res) => {
  const client = requireSarvam(res);
  if (!client) return;

  try {
    const {
      imageBase64,
      imagesBase64,
      textContent,
      language = "en",
    } = req.body;

    let extractedText = "";
    if (typeof textContent === "string" && textContent.trim()) {
      extractedText = textContent.trim();
    } else {
      const dataUrls: string[] =
        Array.isArray(imagesBase64) && imagesBase64.length > 0
          ? imagesBase64
          : Array.isArray(imageBase64)
            ? imageBase64
            : typeof imageBase64 === "string"
              ? [imageBase64]
              : [];

      if (dataUrls.length === 0) {
        return res.status(400).json({
          error: "Upload one PDF, up to 10 document images, or paste court-order text.",
        });
      }
      extractedText = await extractDocumentText(dataUrls, language);
    }

    const analysis = await analyzeCourtText(extractedText, language);
    analysis.sourceDocumentText = extractedText.slice(0, 140000);
    return res.json({ success: true, analysis });
  } catch (error: any) {
    console.error("Sarvam document analysis error:", error);
    return res.status(errorStatus(error)).json({
      error: sarvamErrorMessage(error),
      code: error?.code || "DOCUMENT_ANALYSIS_FAILED",
    });
  }
});

app.post("/api/ask-question", async (req, res) => {
  const client = requireSarvam(res);
  if (!client) return;

  try {
    const {
      documentAnalysis,
      question,
      history = [],
      language = "en",
    } = req.body;
    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question is required." });
    }

    const historyMessages = Array.isArray(history)
      ? history.slice(-6).map((message: any) => ({
          role: message?.sender === "agent" ? "assistant" : "user",
          content: String(message?.text || ""),
        }))
      : [];

    const messages = [
      {
        role: "system",
        content: `You are NyayVaani, a careful Sarvam-powered assistant for Indian
court litigants. Answer only from the supplied document analysis and source document
text. Clearly separate
what the court ordered from what either party claimed. If the answer is absent,
say that the document does not state it. Do not give legal advice. Reply in
simple English. Give a direct answer in 2 to 4 short sentences. Return normal
text, not JSON or Markdown. NyayVaani will localize the answer with Sarvam
Translate when the user selected another language.`,
      },
      ...historyMessages,
      {
        role: "user",
        content: `DOCUMENT ANALYSIS AND SOURCE TEXT:
${JSON.stringify(documentAnalysis)}

QUESTION:
${question.trim()}`,
      },
    ];

    let answer = "";
    try {
      const completion = await client.chat.completions(
        {
          model: "sarvam-30b",
          messages,
          temperature: 0.15,
          reasoning_effort: "low",
          max_tokens: 1500,
          n: 1,
        } as any,
        { timeoutInSeconds: 60, maxRetries: 1 },
      );
      answer = completionText(completion);
    } catch (error: any) {
      if (error?.message !== "SARVAM_EMPTY_RESPONSE") throw error;
      const retry = await client.chat.completions(
        {
          model: "sarvam-30b",
          messages: [
            messages[0],
            messages[messages.length - 1],
            {
              role: "user",
              content:
                "Answer the question now in plain text using only the supplied document.",
            },
          ],
          temperature: 0,
          reasoning_effort: "low",
          max_tokens: 1500,
          n: 1,
        } as any,
        { timeoutInSeconds: 60, maxRetries: 1 },
      );
      answer = completionText(retry);
    }

    if (language !== "en" && LANGUAGE_CODES[language]) {
      const localizedAnswers = await translateExplanation(answer);
      answer = localizedAnswers[language] || answer;
    }

    const keyFact =
      answer.split(/(?<=[.!?।])\s+/)[0]?.slice(0, 240) || "";
    return res.json({
      success: true,
      answer,
      keyFact,
      suggestedFollowups: [],
      responseLanguage: language,
    });
  } catch (error: any) {
    console.error("Sarvam question-answering error:", error);
    return res.status(errorStatus(error)).json({
      error: sarvamErrorMessage(error),
      code: "SARVAM_QUESTION_FAILED",
    });
  }
});

app.post("/api/generate-tts", async (req, res) => {
  const client = requireSarvam(res);
  if (!client) return;

  try {
    const {
      text,
      language = "hi",
      speaker = "shubh",
      pace = 1,
    } = req.body;
    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required for speech." });
    }

    const response = await client.textToSpeech.convert({
      text: text.trim().slice(0, 2500),
      target_language_code: toLanguageCode(language) as any,
      model: "bulbul:v3",
      speaker,
      pace: Math.min(2, Math.max(0.5, Number(pace) || 1)),
      speech_sample_rate: 24000,
      output_audio_codec: "wav",
      temperature: 0.5,
    });

    const audioBase64 = response.audios?.join("");
    if (!audioBase64) {
      throw new Error("Sarvam Bulbul returned no audio.");
    }
    return res.json({
      success: true,
      audioBase64,
      mimeType: "audio/wav",
      provider: "Sarvam AI",
      model: "bulbul:v3",
    });
  } catch (error: any) {
    console.error("Sarvam text-to-speech error:", error);
    return res.status(errorStatus(error)).json({
      error: sarvamErrorMessage(error),
      code: "SARVAM_TTS_FAILED",
    });
  }
});

app.post("/api/transcribe-speech", async (req, res) => {
  const client = requireSarvam(res);
  if (!client) return;

  try {
    const {
      audioBase64,
      mimeType = "audio/webm",
      language = "en",
    } = req.body;
    if (typeof audioBase64 !== "string" || !audioBase64.trim()) {
      return res.status(400).json({ error: "Recorded audio is required." });
    }

    const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, "");
    const audioBlob = new Blob([Buffer.from(cleanBase64, "base64")], {
      type: mimeType,
    });
    const response = await client.speechToText.transcribe({
      file: audioBlob,
      model: "saaras:v3",
      mode: "transcribe",
      language_code: toLanguageCode(language) as any,
    });

    return res.json({
      success: true,
      transcript: response.transcript,
      languageCode: response.language_code,
      provider: "Sarvam AI",
      model: "saaras:v3",
    });
  } catch (error: any) {
    console.error("Sarvam speech-to-text error:", error);
    return res.status(errorStatus(error)).json({
      error: sarvamErrorMessage(error),
      code: "SARVAM_STT_FAILED",
    });
  }
});

app.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error?.type === "entity.too.large") {
      return res.status(413).json({
        error: "The upload is too large for the hosted app. Please keep it under 3 MB.",
        code: "UPLOAD_TOO_LARGE",
      });
    }
    if (error instanceof SyntaxError) {
      return res.status(400).json({
        error: "NyayVaani could not read this request. Please try again.",
        code: "INVALID_REQUEST",
      });
    }
    console.error("Unhandled NyayVaani API error:", error);
    return res.status(500).json({
      error: "NyayVaani could not complete this request. Please try again.",
      code: "INTERNAL_ERROR",
    });
  },
);

export default app;
