import React, { useState } from 'react';
import { TaggedParagraph, AttributionCategory, ProvenanceStatus } from '../types';
import { Tag, ShieldCheck, AlertCircle, HelpCircle, User, CheckCircle2, XCircle, FileText, Stamp } from 'lucide-react';

interface DocumentViewerProps {
  paragraphs: TaggedParagraph[];
  selectedParagraphId?: string;
  onSelectParagraph: (para: TaggedParagraph) => void;
  documentTitle: string;
  caseNumber: string;
  courtName: string;
  orderDate: string;
  isPhotocopyQuality: boolean;
  hasSealsAndSkew: boolean;
}

const CATEGORY_STYLES: Record<AttributionCategory, {
  border: string;
  bg: string;
  badgeBg: string;
  badgeText: string;
  label: string;
  icon: React.ReactNode;
}> = {
  court_direction: {
    border: 'border-emerald-500 ring-2 ring-emerald-500/20',
    bg: 'bg-emerald-50/80 hover:bg-emerald-100/60',
    badgeBg: 'bg-emerald-600 text-white font-bold',
    badgeText: 'Court Direction / Operative Order',
    label: 'Court Direction',
    icon: <CheckCircle2 className="h-3.5 w-3.5 text-white" />
  },
  petitioner_submission: {
    border: 'border-blue-300',
    bg: 'bg-blue-50/50 hover:bg-blue-50/80',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200 font-bold',
    badgeText: 'Petitioner Claim / Submission',
    label: 'Petitioner Claim',
    icon: <User className="h-3.5 w-3.5 text-blue-700" />
  },
  respondent_submission: {
    border: 'border-orange-300',
    bg: 'bg-orange-50/50 hover:bg-orange-50/80',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200 font-bold',
    badgeText: 'Respondent Contention',
    label: 'Respondent Claim',
    icon: <User className="h-3.5 w-3.5 text-orange-700" />
  },
  recital_proceedings: {
    border: 'border-slate-200',
    bg: 'bg-white hover:bg-slate-50',
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    badgeText: 'Recital of Facts / History',
    label: 'Recital / History',
    icon: <FileText className="h-3.5 w-3.5 text-slate-500" />
  },
  rejected_claim: {
    border: 'border-rose-400 ring-2 ring-rose-400/20',
    bg: 'bg-rose-50/80 hover:bg-rose-100/60',
    badgeBg: 'bg-rose-600 text-white font-bold',
    badgeText: 'REJECTED CLAIM (Dismissed by Court)',
    label: 'Rejected Claim',
    icon: <XCircle className="h-3.5 w-3.5 text-white" />
  },
  unknown_unclear: {
    border: 'border-purple-300',
    bg: 'bg-purple-50/50 hover:bg-purple-50/80',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200 font-medium',
    badgeText: 'Unclear / Needs Review',
    label: 'Unclear',
    icon: <HelpCircle className="h-3.5 w-3.5 text-purple-700" />
  }
};

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  paragraphs,
  selectedParagraphId,
  onSelectParagraph,
  documentTitle,
  caseNumber,
  courtName,
  orderDate,
  isPhotocopyQuality,
  hasSealsAndSkew
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredParagraphs = paragraphs.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col h-full">
      
      {/* Document Header Panel */}
      <div className="border-b border-slate-200 pb-4 mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{documentTitle}</h2>
              {hasSealsAndSkew && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded flex items-center gap-1">
                  <Stamp className="h-3 w-3 text-amber-600" /> Photocopied Seal
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              {caseNumber} • {courtName}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-600 font-mono block">Order Date: {orderDate}</span>
            <span className="text-[11px] text-indigo-600 font-semibold font-mono">
              Paragraph Structure: Preserved ({paragraphs.length} Paras)
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium mr-1">Filter View:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({paragraphs.length})
          </button>
          <button
            onClick={() => setFilterCategory('court_direction')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              filterCategory === 'court_direction'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="h-3 w-3" /> Court Operative
          </button>
          <button
            onClick={() => setFilterCategory('rejected_claim')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              filterCategory === 'rejected_claim'
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <XCircle className="h-3 w-3" /> Rejected Claims
          </button>
          <button
            onClick={() => setFilterCategory('petitioner_submission')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              filterCategory === 'petitioner_submission'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Petitioner Claims
          </button>
        </div>
      </div>

      {/* Simulated Photocopied Sheet Container (Paper Background) */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar bg-[#FDFCF8] p-4 rounded-xl border border-slate-200/80 shadow-inner">
        {filteredParagraphs.map((para) => {
          const style = CATEGORY_STYLES[para.category] || CATEGORY_STYLES.recital_proceedings;
          const isSelected = selectedParagraphId === para.id;

          return (
            <div
              key={para.id}
              onClick={() => onSelectParagraph(para)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${style.bg} ${style.border} ${
                isSelected ? 'ring-2 ring-indigo-600 shadow-md scale-[1.005]' : 'shadow-xs'
              }`}
            >
              {/* Top Attribution Tag Banner */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider border flex items-center gap-1 ${style.badgeBg}`}>
                    {style.icon}
                    <span>{style.badgeText}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    Para {para.paragraphNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {para.speaker}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                    {para.confidence}% Conf.
                  </span>
                </div>
              </div>

              {/* Paragraph Verbatim Text */}
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-serif tracking-wide select-text">
                "{para.text}"
              </p>

              {/* Special Warning if it's a Rejected Claim */}
              {para.category === 'rejected_claim' && para.rejectionDetail && (
                <div className="mt-2.5 p-2.5 bg-rose-100/90 border border-rose-300 rounded-lg text-xs text-rose-900 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-rose-950 text-[11px] uppercase tracking-wide">LITIGANT PROTECTION WARNING:</span>
                    <span>{para.rejectionDetail}</span>
                  </div>
                </div>
              )}

              {/* Provenance Footer */}
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-3 w-3 text-indigo-600" />
                  <span>Provenance: {para.provenance === 'human_verified' ? 'Expert Verified' : 'AI Attribution Tagged'}</span>
                </span>
                {para.notes && (
                  <span className="italic text-slate-500 truncate max-w-[280px]">
                    Note: {para.notes}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
