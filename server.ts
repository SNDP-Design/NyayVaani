import express from "express";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import { mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { createServer as createViteServer } from "vite";
import { strFromU8, unzipSync, zipSync } from "fflate";
import { SarvamAIClient } from "sarvamai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));

const PORT = Number(process.env.PORT || 3000);
const SARVAM_API_KEY = process.env.SARVAM_API_KEY || "";
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
    "plainLanguageExplanations",
    "audioScripts",
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
    plainLanguageExplanations: {
      type: "object",
      additionalProperties: false,
      required: ["hi", "en", "bn", "ta", "te", "mr", "gu", "pa"],
      properties: {
        hi: { type: "string" },
        en: { type: "string" },
        bn: { type: "string" },
        ta: { type: "string" },
        te: { type: "string" },
        mr: { type: "string" },
        gu: { type: "string" },
        pa: { type: "string" },
      },
    },
    audioScripts: {
      type: "object",
      additionalProperties: false,
      required: ["hi", "en", "bn", "ta", "te", "mr", "gu", "pa"],
      properties: {
        hi: { type: "string" },
        en: { type: "string" },
        bn: { type: "string" },
        ta: { type: "string" },
        te: { type: "string" },
        mr: { type: "string" },
        gu: { type: "string" },
        pa: { type: "string" },
      },
    },
  },
};

const QUESTION_RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["answer", "keyFact", "suggestedFollowups"],
  properties: {
    answer: { type: "string" },
    keyFact: { type: "string" },
    suggestedFollowups: {
      type: "array",
      maxItems: 3,
      items: { type: "string" },
    },
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
5. Explanations must be plain, calm, non-legal-advice language. Produce Hindi,
   English, Bengali, Tamil, Telugu, Marathi, Gujarati, and Punjabi versions.
6. Audio scripts must be concise and natural for Sarvam Bulbul v3.
7. Confidence scores must reflect extraction ambiguity and must never be presented
   as a guarantee.`;

function requireSarvam(res: express.Response): SarvamAIClient | null {
  if (!sarvam) {
    res.status(503).json({
      error: "Sarvam AI is not configured. Add SARVAM_API_KEY to the server environment.",
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
    throw new Error("Sarvam returned an empty structured response.");
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
  return JSON.parse(jsonText);
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
  const inputPath =
    pdfFiles.length === 1
      ? path.join(tempDir, "court-order.pdf")
      : path.join(tempDir, "court-order-pages.zip");
  const outputPath = path.join(tempDir, "sarvam-vision-output.zip");

  try {
    if (pdfFiles.length === 1) {
      await writeFile(inputPath, pdfFiles[0].bytes);
    } else {
      const pages: Record<string, Uint8Array> = {};
      files.forEach((file, index) => {
        const pageNumber = String(index + 1).padStart(2, "0");
        pages[`page-${pageNumber}.${file.extension}`] = file.bytes;
      });
      await writeFile(inputPath, zipSync(pages, { level: 6 }));
    }

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
        status.error_message || "Sarvam Vision could not digitize this document.",
      );
    }

    await job.downloadOutput(outputPath);
    const archive = unzipSync(new Uint8Array(await readFile(outputPath)));
    const markdownFiles = Object.entries(archive)
      .filter(([name]) => name.toLowerCase().endsWith(".md"))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, bytes]) => `\n\n--- ${name} ---\n${strFromU8(bytes)}`);

    if (markdownFiles.length > 0) {
      return markdownFiles.join("").trim();
    }

    const jsonFiles = Object.entries(archive)
      .filter(([name]) => name.toLowerCase().endsWith(".json"))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, bytes]) => `\n\n--- ${name} ---\n${strFromU8(bytes)}`);

    if (jsonFiles.length === 0) {
      throw new Error("Sarvam Vision returned no readable document content.");
    }
    return jsonFiles.join("").trim();
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

  const completion = await sarvam.chat.completions({
    model: "sarvam-105b",
    messages: [
      { role: "system", content: COURT_ANALYSIS_INSTRUCTION },
      {
        role: "user",
        content: `Preferred user language: ${toLanguageCode(language)}

SARVAM VISION EXTRACTED COURT DOCUMENT:
"""
${extractedText}
"""`,
      },
    ],
    temperature: 0.1,
    reasoning_effort: "medium",
    max_tokens: 10000,
    n: 1,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "court_order_analysis",
        strict: true,
        schema: COURT_ANALYSIS_SCHEMA,
      },
    },
  } as any);

  const analysis = parseJsonContent(
    (completion as any).choices?.[0]?.message?.content,
  );
  analysis.documentId = `sarvam-${randomUUID()}`;
  analysis.processedAt = new Date().toISOString();
  analysis.paragraphs = Array.isArray(analysis.paragraphs)
    ? analysis.paragraphs.map((paragraph: any) => ({
        ...paragraph,
        provenance: "ai_tagged",
      }))
    : [];
  return analysis;
}

function sarvamErrorMessage(error: any): string {
  const statusCode = error?.statusCode || error?.status;
  if (statusCode === 403) {
    return "The Sarvam API key is missing, invalid, or does not have access to this feature.";
  }
  if (statusCode === 429) {
    return "Sarvam is receiving too many requests. Please wait briefly and try again.";
  }
  return error?.message || "The Sarvam request could not be completed.";
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
    return res.json({ success: true, analysis });
  } catch (error: any) {
    console.error("Sarvam document analysis error:", error);
    return res.status(500).json({
      error: "Sarvam could not analyze this court document.",
      details: sarvamErrorMessage(error),
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

    const completion = await client.chat.completions({
      model: "sarvam-30b",
      messages: [
        {
          role: "system",
          content: `You are NyayVaani, a careful Sarvam-powered assistant for Indian
court litigants. Answer only from the supplied document analysis. Clearly separate
what the court ordered from what either party claimed. If the answer is absent,
say that the document does not state it. Do not give legal advice. Reply in
${toLanguageCode(language)} using simple spoken language.`,
        },
        ...historyMessages,
        {
          role: "user",
          content: `DOCUMENT ANALYSIS:
${JSON.stringify(documentAnalysis)}

QUESTION:
${question.trim()}`,
        },
      ],
      temperature: 0.15,
      reasoning_effort: "low",
      max_tokens: 900,
      n: 1,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "document_question_answer",
          strict: true,
          schema: QUESTION_RESPONSE_SCHEMA,
        },
      },
    } as any);

    const result = parseJsonContent(
      (completion as any).choices?.[0]?.message?.content,
    );
    return res.json({
      success: true,
      answer: result.answer,
      keyFact: result.keyFact,
      suggestedFollowups: result.suggestedFollowups || [],
    });
  } catch (error: any) {
    console.error("Sarvam question-answering error:", error);
    return res.status(500).json({
      error: "Sarvam could not answer this question.",
      details: sarvamErrorMessage(error),
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
    return res.status(500).json({
      error: "Sarvam could not generate speech.",
      details: sarvamErrorMessage(error),
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
    return res.status(500).json({
      error: "Sarvam could not transcribe the recording.",
      details: sarvamErrorMessage(error),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NyayVaani Sarvam AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
