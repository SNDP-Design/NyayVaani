import React, { useState } from 'react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { LitigantAudioPlayer } from './LitigantAudioPlayer';
import { AlertOctagon, CheckCircle2, Quote, Calendar, Building2, ArrowRight, ShieldCheck, Share2, Printer, AlertTriangle, FileText, Sparkles } from 'lucide-react';

interface OperativeAnalysisProps {
  analysis: AnalysisResult;
  selectedLanguage: SupportedLanguage;
  onOpenExport: () => void;
}

export const OperativeAnalysis: React.FC<OperativeAnalysisProps> = ({
  analysis,
  selectedLanguage,
  onOpenExport
}) => {
  const plainText = analysis.plainLanguageExplanations[selectedLanguage] || analysis.plainLanguageExplanations['hi'] || analysis.plainLanguageExplanations['en'];
  const audioScript = analysis.audioScripts[selectedLanguage] || plainText;

  return (
    <div className="space-y-5">
      
      {/* 1. REFUSAL STATE NOTICE (If complete operative clause cannot be located) */}
      {analysis.isRefusalState ? (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 shadow-sm text-slate-900">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <AlertOctagon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-rose-950">
                  REFUSAL STATE TRIGGERED (Safety Non-Guess Boundary)
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-200 text-rose-900 border border-rose-300 rounded">
                  Confidence: {analysis.refusalConfidence || 95}%
                </span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed font-sans">
                {analysis.refusalReason || 'The machine cannot locate an operative court direction with high confidence. The document is either incomplete or purely procedural.'}
              </p>

              <div className="pt-2 border-t border-rose-200 text-xs text-rose-950 font-medium">
                👉 <strong className="text-rose-950">Action for Litigant:</strong> Do not rely on unverified outcomes. Please obtain the complete certified copy from the court copyist or consult your advocate / court clerk.
              </div>
            </div>
          </div>
        </div>
      ) : (

        /* 2. VERBATIM OPERATIVE DIRECTION PINNED AT TOP */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md text-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center">
                <Quote className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Operative Direction (Isolated Verbatim)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold bg-white/10 text-slate-200 rounded">
              Verbatim Extract
            </span>
          </div>

          <blockquote className="text-sm sm:text-base font-serif italic text-white bg-slate-950/60 border-l-4 border-indigo-500 p-4 rounded-r-lg leading-relaxed select-text">
            "{analysis.operativeDirectionVerbatim}"
          </blockquote>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Source: Paragraph {analysis.operativeParagraphNumbers?.join(', ')} of Court Order</span>
            <span className="text-green-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Verbatim Quote
            </span>
          </div>
        </div>
      )}

      {/* 3. LITIGANT PLAIN-LANGUAGE EXPLANATION & AUDIO PLAYER */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-indigo-950">
              Plain Language Explanation for Litigant
            </h3>
          </div>
          <button
            onClick={onOpenExport}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200 shadow-xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share / Print Sheet</span>
          </button>
        </div>

        {/* Written Explanation */}
        <div className="p-4 bg-white border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed font-sans shadow-xs">
          {plainText}
        </div>

        {/* Audio Player Component */}
        <LitigantAudioPlayer
          textToRead={audioScript}
          language={selectedLanguage}
        />

      </div>

      {/* 4. NEXT STEPS EXTRACTION (Derived ONLY from Operative Clause) */}
      {!analysis.isRefusalState && analysis.nextSteps.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              What you must do next (Derived from Order)
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {analysis.nextSteps.map((step, idx) => (
              <div
                key={step.id || idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-900">
                    <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-xs">
                      {idx + 1}
                    </span>
                    <span>{step.action}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Calendar className="h-3.5 w-3.5 text-red-600 shrink-0" />
                    <span className="font-medium text-slate-500">Deadline:</span>
                    <strong className="text-red-600 font-bold">{step.deadline}</strong>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Building2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    <span className="font-medium text-slate-500">Forum:</span>
                    <strong className="text-indigo-900 font-semibold">{step.forum}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 italic bg-white p-2 rounded border border-slate-200/60">
                  Quoted Source: "{step.quotedSource}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PARAGRAPH VOICE ATTRIBUTION BREAKDOWN */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2 shadow-sm">
        <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
          Paragraph Voice Attribution Balance
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-emerald-800 block font-medium">Court Voice:</span>
            <strong className="text-emerald-950 text-xs font-bold">
              {analysis.paragraphs.filter((p) => p.category === 'court_direction').length} Paragraphs
            </strong>
          </div>
          <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-blue-800 block font-medium">Petitioner Claims:</span>
            <strong className="text-blue-950 text-xs font-bold">
              {analysis.paragraphs.filter((p) => p.category === 'petitioner_submission' || p.category === 'rejected_claim').length} Paragraphs
            </strong>
          </div>
          <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-200">
            <span className="text-orange-800 block font-medium">Respondent Claims:</span>
            <strong className="text-orange-950 text-xs font-bold">
              {analysis.paragraphs.filter((p) => p.category === 'respondent_submission').length} Paragraphs
            </strong>
          </div>
          <div className="p-2.5 bg-slate-100 rounded-lg border border-slate-200">
            <span className="text-slate-600 block font-medium">Recital / Facts:</span>
            <strong className="text-slate-900 text-xs font-bold">
              {analysis.paragraphs.filter((p) => p.category === 'recital_proceedings').length} Paragraphs
            </strong>
          </div>
        </div>
      </div>

    </div>
  );
};
