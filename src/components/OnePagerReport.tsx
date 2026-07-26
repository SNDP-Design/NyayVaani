import React from 'react';
import { ShieldCheck, Cpu, Code2, AlertTriangle, CheckCircle2, Scale, Sparkles, FileText, ArrowRight, Server, Radio } from 'lucide-react';

export const OnePagerReport: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-900 max-w-5xl mx-auto pb-16">
      
      {/* Title Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-widest">
          <Scale className="h-4 w-4" /> System Architectural Brief
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          NyayVaani: Document Intelligence for Litigant Court Order Interpretation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-sans">
          An end-to-end attribution system that separates judge directions from party submissions in scanned/photocopied Indian court orders, quotes verbatim operative rulings, and translates next steps into spoken regional dialects.
        </p>
      </div>

      {/* 1. WORKFLOW ARCHITECTURE */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Cpu className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">1. End-to-End Workflow Architecture</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-indigo-600 font-mono font-bold">STEP 1</span>
            <h4 className="font-bold text-slate-900">Sarvam Vision Capture</h4>
            <p className="text-slate-600 text-[11px]">Camera capture of photocopied order with auto-deskew, seal detection, and binarization cleaner.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-indigo-600 font-mono font-bold">STEP 2</span>
            <h4 className="font-bold text-slate-900">Attribution Tagging</h4>
            <p className="text-slate-600 text-[11px]">Paragraph-by-paragraph tagging: Court Direction vs Petitioner vs Respondent vs Recital vs Rejected Claims.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-indigo-600 font-mono font-bold">STEP 3</span>
            <h4 className="font-bold text-slate-900">Operative Isolation</h4>
            <p className="text-slate-600 text-[11px]">Pins verbatim operative court clause at the top. Checks for refusal state if order is incomplete.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-indigo-600 font-mono font-bold">STEP 4</span>
            <h4 className="font-bold text-slate-900">Next-Steps Derived</h4>
            <p className="text-slate-600 text-[11px]">Extracts actions, deadlines, and court room forums derived ONLY from the operative clause.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-indigo-600 font-mono font-bold">STEP 5</span>
            <h4 className="font-bold text-slate-900">Mayura/Bulbul Voice</h4>
            <p className="text-slate-600 text-[11px]">Translates plain language explanation into Kanpuri Hindi/regional languages with TTS audio player.</p>
          </div>
        </div>
      </div>

      {/* 2. INTEGRATION SURFACE (API CONTRACT) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Server className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">2. Integration Surface & API Specification</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Endpoint 1 */}
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-indigo-400 font-bold">
              <span>POST /api/analyze-document</span>
              <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">JSON API</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans">
              Accepts base64 image or OCR text. Returns paragraph attribution array, verbatim operative quote, refusal status, and next steps.
            </p>
            <pre className="p-2 bg-slate-950 rounded text-[10px] text-slate-300 overflow-x-auto">
{`{
  "imageBase64": "data:image/jpeg;base64,...",
  "language": "hi"
}`}
            </pre>
          </div>

          {/* Endpoint 2 */}
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-indigo-400 font-bold">
              <span>POST /api/generate-tts</span>
              <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">Audio API</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans">
              Accepts plain language script. Returns 24kHz PCM audio base64 stream for Mayura/Bulbul voice playback.
            </p>
            <pre className="p-2 bg-slate-950 rounded text-[10px] text-slate-300 overflow-x-auto">
{`{
  "text": "नमस्ते अशोक वर्मा जी...",
  "voice": "Kore"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* 3. PROVENANCE & ATTRIBUTION BREAKDOWN */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">3. Visual Provenance & Verification Metrics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-emerald-900 font-bold block">1. Operative Clause Provenance</span>
            <p className="text-emerald-950 text-[11px] leading-relaxed">
              Operative direction is pinned verbatim at the top. The machine NEVER paraphrases the ruling before quoting the exact words from the judgment.
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
            <span className="text-amber-900 font-bold block">2. Rejected Claim Isolation</span>
            <p className="text-amber-950 text-[11px] leading-relaxed">
              When a petitioner's claim is rejected by the court (e.g., Ramakant's demand for wall demolition), it is tagged as REJECTED CLAIM to prevent litigants from confusing claims with outcomes.
            </p>
          </div>

          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <span className="text-rose-900 font-bold block">3. Honest Refusal Boundary</span>
            <p className="text-rose-950 text-[11px] leading-relaxed">
              If the document is truncated (e.g. Page 1 of 3) or purely procedural without substantive ruling, the system triggers a Refusal State rather than hallucinating an outcome.
            </p>
          </div>
        </div>
      </div>

      {/* 4. NON-ADVICE BOUNDARY & WHY DOC AI REMAINS PRIMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Why Document Intelligence Primary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-600" />
            Why Document Intelligence Remains Primary
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard LLM summarisers flatten a legal order into a single voice. In Indian court orders, 80% of the text consists of party claims ("The petitioner submitted...", "The counsel relied on..."). A naive summary turns a rejected claim into an apparent court order, causing litigants to pay for wrong actions.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Document Intelligence preserves positional paragraph structure, tags every speaker, and guarantees that audio translation is derived ONLY from the isolated operative ruling.
          </p>
        </div>

        {/* Non-Advice Boundary */}
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Non-Advice Boundary & Legal Disclaimer
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            NyayVaani is an assistive document reading tool designed to aid literacy and isolate operative text in court orders. It does NOT provide legal representation, advice, or strategy.
          </p>
          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-950">
            👉 <strong>Mandatory Litigant Protocol:</strong> Litigants must verify next-step deadlines with their advocate or the court copyist before taking legal action.
          </div>
        </div>

      </div>

      {/* 5. DEPLOY-OR-PILOT VERDICT */}
      <div className="bg-indigo-900 text-white border border-indigo-950 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-indigo-200 font-bold uppercase tracking-widest block">Executive Verdict</span>
          <h3 className="text-lg font-bold text-white mt-0.5">Deploy-or-Pilot Verdict: READY FOR DISTRICT COURT PILOT</h3>
          <p className="text-xs text-indigo-100 mt-1 max-w-2xl">
            Recommended for immediate pilot deployment in Kanpur District Court, e-Courts Kiosks, and DLSA legal aid booths.
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs shrink-0 text-center">
          PILOT READY (VERDICT: GO)
        </div>
      </div>

    </div>
  );
};
