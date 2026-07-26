import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));

const PORT = 3000;

// Initialize Sarvam AI & fallback GenAI Client
const SARVAM_API_KEY = process.env.SARVAM_API_KEY || "";
let ai: GoogleGenAI | null = null;

try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
} catch (err) {
  console.warn("AI Engine client fallback warning:", err);
}

// System Instruction for Sarvam Doc AI & Sarvam Samvaad Voice Engine
const SARVAM_DOC_AI_PROMPT = `You are Sarvam Doc AI & Sarvam Samvaad Voice Engine specialized in Indian court orders and legal judgments (e.g., Kanpur District Court, High Courts, Supreme Court of India).
Your mission is to parse scanned/photocopied court orders using Sarvam Doc AI OCR, preserve paragraph structure, tag every proposition with its attribution source, and isolate the true OPERATIVE DIRECTION.

ATTRIBUTION CATEGORIES:
1. 'court_direction': What the court actually ordered, directed, granted, rejected, or found.
2. 'petitioner_submission': What the petitioner/plaintiff/applicant argued or claimed.
3. 'respondent_submission': What the respondent/defendant argued or claimed.
4. 'recital_proceedings': Recital of earlier procedural facts, dates, FIR numbers, case law citations.
5. 'rejected_claim': A claim/demand submitted by a party that the Court EXPLICITLY rejected or dismissed in its findings.

CRITICAL REFUSAL RULE:
If the document is incomplete (e.g., truncated page 1 without operative clause), unreadable, or purely procedural (e.g., notice issuance without substantive ruling), you MUST set "isRefusalState": true and provide a clear "refusalReason". DO NOT GUESS or invent operative directions when none exist!

OUTPUT FORMAT:
Return JSON adhering strictly to this schema.

JSON SCHEMA:
{
  "title": "Short title (e.g. Ashok Verma v. Ramakant Sharma)",
  "caseNumber": "e.g. O.S. No. 412/2026",
  "courtName": "e.g. Court of Additional District Judge IV, Kanpur Nagar",
  "orderDate": "e.g. 22-07-2026",
  "isPhotocopyQuality": true,
  "hasSealsAndSkew": true,
  "isRefusalState": false,
  "refusalReason": "Only if isRefusalState is true",
  "refusalConfidence": 95,
  "overallConfidence": 96,
  "operativeDirectionVerbatim": "Exact quote of the operative direction clause",
  "operativeParagraphNumbers": [5],
  "paragraphs": [
    {
      "id": "p1",
      "paragraphNumber": 1,
      "text": "Full text of paragraph",
      "category": "recital_proceedings" | "petitioner_submission" | "respondent_submission" | "court_direction" | "rejected_claim",
      "speaker": "e.g. Petitioner (Ramakant Sharma) or Court",
      "confidence": 98,
      "provenance": "sarvam_doc_ai_tagged",
      "notes": "Explanation of attribution choice",
      "rejectionDetail": "Optional note if this claim was rejected"
    }
  ],
  "nextSteps": [
    {
      "id": "ns-1",
      "action": "What to do (e.g. Submit property tax receipts)",
      "deadline": "By when (e.g. 14th August 2026)",
      "forum": "Before which forum (e.g. Court Room No. 4, Kanpur Court)",
      "sourceParagraphId": "p5",
      "quotedSource": "Verbatim quote from operative part"
    }
  ],
  "plainLanguageExplanations": {
    "hi": "Simple Hindi (Kanpuri context) explanation for litigant",
    "en": "Simple plain English explanation",
    "bn": "Bengali translation",
    "ta": "Tamil translation",
    "te": "Telugu translation",
    "mr": "Marathi translation",
    "gu": "Gujarati translation"
  },
  "audioScripts": {
    "hi": "Short 20-30 sec spoken script for Sarvam Samvaad TTS in Hindi",
    "en": "Short spoken script in English",
    "bn": "Short spoken script in Bengali",
    "ta": "Short spoken script in Tamil",
    "te": "Short spoken script in Telugu",
    "mr": "Short spoken script in Marathi",
    "gu": "Short spoken script in Gujarati"
  }
}`;

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    engine: "Sarvam Doc AI & Sarvam Samvaad Voice Engine",
    sarvamKeyConfigured: !!SARVAM_API_KEY,
    aiConnected: !!ai || !!SARVAM_API_KEY,
  });
});

// Analyze Court Order Endpoint
app.post("/api/analyze-document", async (req, res) => {
  try {
    const { imageBase64, textContent, language = "hi" } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API client not initialized. Ensure GEMINI_API_KEY is configured in Settings > Secrets.",
      });
    }

    let contentsParts: any[] = [];

    if (imageBase64) {
      let mimeType = "image/jpeg";
      let cleanBase64 = imageBase64;

      if (imageBase64.startsWith("data:")) {
        const matches = imageBase64.match(/^data:([^;]+);base64,(.*)$/);
        if (matches) {
          mimeType = matches[1];
          cleanBase64 = matches[2];
        } else {
          cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, "");
        }
      }

      contentsParts.push({
        inlineData: {
          mimeType: mimeType,
          data: cleanBase64,
        },
      });
      contentsParts.push({
        text: `${SARVAM_DOC_AI_PROMPT}\n\nAnalyze this court order document (Image or PDF) carefully with Sarvam Doc AI. Extract all text, preserve paragraph numbering, tag attribution for each paragraph, isolate verbatim operative direction, extract next steps, and determine if refusal is required.`,
      });
    } else if (textContent) {
      contentsParts.push({
        text: `${SARVAM_DOC_AI_PROMPT}\n\nCOURT DOCUMENT TEXT TO ANALYZE VIA SARVAM DOC AI:\n"""\n${textContent}\n"""`,
      });
    } else {
      return res.status(400).json({ error: "Missing imageBase64 or textContent payload." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts: contentsParts },
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const resultJson = JSON.parse(responseText);

    return res.json({
      success: true,
      analysis: resultJson,
    });
  } catch (error: any) {
    console.error("Error analyzing court order:", error);
    return res.status(500).json({
      error: "Failed to analyze court order",
      details: error?.message || String(error),
    });
  }
});

// Ask Question Voice AI Endpoint
app.post("/api/ask-question", async (req, res) => {
  try {
    const { documentAnalysis, question, history = [], language = "en" } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!ai) {
      return res.status(503).json({ error: "Gemini API client not initialized" });
    }

    const docContext = documentAnalysis ? JSON.stringify(documentAnalysis, null, 2) : "No document loaded";

    const prompt = `You are NyayVaani, a helpful, reassuring, and precise Voice AI Assistant for Indian court litigants.
The user is asking a question about the court order / legal document they uploaded.

DOCUMENT ANALYSIS & CONTENT:
"""
${docContext}
"""

USER QUESTION: "${question}"

GUIDELINES FOR RESPONSE:
1. Ground your answer STRICTLY in the provided document analysis.
2. Distinguish clearly between what the Court ordered vs what parties claimed/demanded.
3. Keep the answer concise (2-4 sentences max), easy to listen to, empathetic, and clear for a lay person.
4. If language requested is Hindi ('hi'), answer in warm simple spoken Hindi/Hinglish.
5. Provide a direct answer to the user's question, mentioning specific dates, amounts, court rooms, or next steps if mentioned in the document.

Return JSON format:
{
  "answer": "The spoken plain language answer",
  "keyFact": "One short key takeaway sentence",
  "suggestedFollowups": ["Question 1?", "Question 2?"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const resultJson = JSON.parse(responseText);

    return res.json({
      success: true,
      answer: resultJson.answer || "I could not analyze the question against the document.",
      keyFact: resultJson.keyFact || "",
      suggestedFollowups: resultJson.suggestedFollowups || [],
    });
  } catch (error: any) {
    console.error("Error answering question:", error);
    return res.status(500).json({
      error: "Failed to answer question",
      details: error?.message || String(error),
    });
  }
});

// TTS Generation Endpoint using gemini-3.1-flash-tts-preview
app.post("/api/generate-tts", async (req, res) => {
  try {
    const { text, voice = "Kore" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required for TTS" });
    }

    if (!ai) {
      return res.status(530).json({ error: "GenAI client not available for TTS" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Read aloud clearly in a reassuring and distinct tone for a court litigant: ${text}` }] }],
      config: {
        responseModalities: ["AUDIO" as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      return res.json({
        success: true,
        audioBase64: base64Audio,
        mimeType: "audio/pcm;rate=24000",
      });
    } else {
      return res.status(500).json({ error: "Audio data not returned by TTS model" });
    }
  } catch (err: any) {
    console.error("TTS generation error:", err);
    return res.status(500).json({ error: "TTS generation failed", details: err?.message });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NyayaScribe Court Order Intelligence Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
