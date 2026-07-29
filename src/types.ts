export type AttributionCategory =
  | 'court_direction'
  | 'petitioner_submission'
  | 'respondent_submission'
  | 'recital_proceedings'
  | 'rejected_claim'
  | 'unknown_unclear';

export type ProvenanceStatus = 'ai_tagged' | 'human_verified' | 'flagged' | 'refused';

export interface TaggedParagraph {
  id: string;
  paragraphNumber: number;
  text: string;
  category: AttributionCategory;
  speaker: string;
  confidence: number;
  provenance: ProvenanceStatus;
  notes?: string;
  rejectionDetail?: string;
}

export interface NextStep {
  id: string;
  action: string;
  deadline: string;
  forum: string;
  sourceParagraphId: string;
  quotedSource: string;
}

export interface AnalysisResult {
  documentId: string;
  sourceDocumentText?: string;
  title: string;
  caseNumber: string;
  courtName: string;
  orderDate: string;
  isPhotocopyQuality: boolean;
  hasSealsAndSkew: boolean;
  isRefusalState: boolean;
  refusalReason?: string;
  refusalConfidence?: number;
  operativeDirectionVerbatim?: string;
  operativeParagraphNumbers?: number[];
  paragraphs: TaggedParagraph[];
  nextSteps: NextStep[];
  plainLanguageExplanations: {
    hi: string; // Hindi (Kanpuri context)
    en: string; // Plain English
    bn: string; // Bengali
    ta: string; // Tamil
    te: string; // Telugu
    mr: string; // Marathi
    gu: string; // Gujarati
    pa?: string; // Punjabi
  };
  audioScripts: {
    hi: string;
    en: string;
    bn: string;
    ta: string;
    te: string;
    mr: string;
    gu: string;
    pa?: string;
  };
  overallConfidence: number;
  processedAt: string;
}

export interface CourtDocumentCase {
  id: string;
  title: string;
  caseNumber: string;
  courtName: string;
  isRefusalCase: boolean;
  analysis: AnalysisResult;
}

export type SupportedLanguage = 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa';
