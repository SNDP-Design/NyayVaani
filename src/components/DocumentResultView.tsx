import React, { useState } from 'react';
import { ArrowLeft, Bot, Volume2, Calendar, MapPin, AlertCircle, FileText, CheckCircle2, ChevronRight, Eye, ShieldCheck, Share2, Sparkles, X } from 'lucide-react';
import { BenchmarkCase, SupportedLanguage } from '../types';
import { VoiceAIAgent } from './VoiceAIAgent';
import { LitigantAudioPlayer } from './LitigantAudioPlayer';
import { getTranslation } from '../utils/translations';

interface DocumentResultViewProps {
  currentCase: BenchmarkCase;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onBackToUpload: () => void;
}

export const DocumentResultView: React.FC<DocumentResultViewProps> = ({
  currentCase,
  selectedLanguage,
  onLanguageChange,
  onBackToUpload,
}) => {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'paragraphs'>('summary');
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const t = getTranslation(selectedLanguage);

  const analysis = currentCase.analysis;
  const isRefusal = currentCase.isRefusalCase || analysis.isRefusalState;

  // Selected explanation & audio script
  const plainExplanation = analysis.plainLanguageExplanations?.[selectedLanguage] || analysis.plainLanguageExplanations?.[selectedLanguage === 'hi' ? 'en' : 'hi'] || 'Analysis completed.';
  const audioScript = analysis.audioScripts?.[selectedLanguage] || analysis.audioScripts?.[selectedLanguage === 'hi' ? 'en' : 'hi'] || plainExplanation;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Header Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Back Button and Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToUpload}
            className="p-2 bg-slate-100 hover:bg-slate-200 hover:text-black text-slate-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-slate-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backToUpload}</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{currentCase.title}</h2>
              {isRefusal && (
                <span className="bg-slate-200 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-400 uppercase font-mono">
                  {t.refusalWarningTitle}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono">
              {currentCase.caseNumber} • {currentCase.courtName}
            </p>
          </div>
        </div>

        {/* Right Controls: Language Selector & Voice AI Agent CTA */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-300 text-xs">
            <span className="text-slate-500 font-medium">{t.languageLabel}</span>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="hi">हिंदी (Hindi)</option>
              <option value="en">English</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
          </div>

          {/* Voice AI CTA Button */}
          <button
            onClick={() => setIsVoiceAgentOpen(true)}
            className="px-4 py-2 bg-black hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer border border-slate-900"
          >
            <div className="relative">
              <Bot className="h-4 w-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <span>{t.askVoiceAiButton}</span>
          </button>
        </div>

      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Document Thumbnail & Verbatim Operative Clause */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Document Thumbnail Preview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-black" />
                {t.docPreviewTitle}
              </span>
              <span className="text-[11px] font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-semibold border border-slate-300">
                Sarvam Doc AI Processed
              </span>
            </div>

            {/* Thumbnail Display */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group aspect-[4/3] flex items-center justify-center">
              <img
                src={
                  currentCase.photocopyStyle === 'distorted_photocopy_stamp'
                    ? 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
                    : 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800'
                }
                alt={currentCase.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <button
                onClick={() => setIsImageExpanded(true)}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{t.expandPhoto}</span>
              </button>
            </div>

            {/* Document Details Metadata */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Case Number</span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">{currentCase.caseNumber}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Court Forum</span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">{currentCase.courtName}</span>
              </div>
            </div>
          </div>

          {/* Verbatim Operative Ruling Card */}
          <div className={`p-5 rounded-2xl border shadow-xs space-y-3 ${
            isRefusal ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 text-white border-black'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isRefusal ? 'text-slate-900' : 'text-slate-300'
              }`}>
                <ShieldCheck className="h-4 w-4" />
                {isRefusal ? t.refusalWarningTitle : t.operativeDirectionTitle}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isRefusal ? 'bg-slate-300 text-slate-900' : 'bg-slate-800 text-slate-100'
              }`}>
                {isRefusal ? 'Refused' : 'Isolated Paragraph'}
              </span>
            </div>

            {isRefusal ? (
              <div className="space-y-2 text-xs text-slate-900">
                <p className="font-bold">{analysis.refusalReason || 'The uploaded document is incomplete or missing the operative ruling page.'}</p>
                <p className="text-[11px] text-slate-600">NyayVaani refuses to guess court directions when pages are truncated.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-mono font-medium leading-relaxed bg-black/60 p-3 rounded-xl border border-slate-700/50 italic text-slate-100">
                  "{analysis.operativeDirectionVerbatim}"
                </p>
                <p className="text-[11px] text-slate-300">
                  ⚡ Guaranteed exact quote from the judge's order paragraph.
                </p>
              </div>
            )}
          </div>

          {/* Quick Voice Audio Player */}
          <LitigantAudioPlayer
            audioScript={audioScript}
            selectedLanguage={selectedLanguage}
            title={currentCase.title}
          />

        </div>

        {/* RIGHT COLUMN: Document Summary & Explanation & Action Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Summary Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            
            {/* View Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'summary'
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.plainSummaryTitle}
                </button>
                <button
                  onClick={() => setActiveTab('paragraphs')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'paragraphs'
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.attributionTitle} ({analysis.paragraphs?.length || 0})
                </button>
              </div>

              {/* Call Voice AI Icon */}
              <button
                onClick={() => setIsVoiceAgentOpen(true)}
                className="text-black hover:text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Bot className="h-4 w-4" />
                <span>{t.askVoiceAiButton}</span>
              </button>
            </div>

            {/* TAB 1: SUMMARY & NEXT STEPS */}
            {activeTab === 'summary' && (
              <div className="space-y-6">
                
                {/* Plain Language Explanation Box */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {t.plainSummaryTitle} ({selectedLanguage.toUpperCase()}):
                  </span>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm leading-relaxed text-slate-800 font-sans">
                    {plainExplanation}
                  </div>
                </div>

                {/* Next Steps & Actionable Requirements */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-black" />
                    {t.nextStepsTitle}
                  </span>

                  {analysis.nextSteps && analysis.nextSteps.length > 0 ? (
                    <div className="space-y-3">
                      {analysis.nextSteps.map((step, idx) => (
                        <div key={idx} className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {idx + 1}. {step.action}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-900 font-medium">
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                              <Calendar className="h-3.5 w-3.5 text-black" />
                              Deadline: <strong className="text-black ml-1">{step.deadline}</strong>
                            </span>
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                              <MapPin className="h-3.5 w-3.5 text-black" />
                              Forum: <strong className="text-black ml-1">{step.forum}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                      No future compliance steps derived for this specific order type.
                    </p>
                  )}
                </div>

                {/* Voice AI Interactive Prompt Banner */}
                <div className="bg-black text-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-300" />
                      <h4 className="text-sm font-bold text-white">{t.voiceAiTitle}</h4>
                    </div>
                    <p className="text-xs text-slate-300">
                      {t.voiceAiSub}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsVoiceAgentOpen(true)}
                    className="px-5 py-2.5 bg-white text-black hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0 text-center flex items-center justify-center gap-2 border border-slate-300"
                  >
                    <Bot className="h-4 w-4 text-black" />
                    <span>{t.askVoiceAiButton}</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: PARAGRAPH BREAKDOWN */}
            {activeTab === 'paragraphs' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  {t.attributionTitle}:
                </p>

                <div className="space-y-3">
                  {analysis.paragraphs?.map((para) => (
                    <div
                      key={para.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        para.category === 'court_direction'
                          ? 'bg-slate-100 border-slate-400'
                          : para.category === 'rejected_claim'
                          ? 'bg-slate-200 border-slate-400'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono text-slate-900">
                          Paragraph {para.paragraphNumber} • {para.speaker}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          para.category === 'court_direction'
                            ? 'bg-black text-white'
                            : para.category === 'rejected_claim'
                            ? 'bg-slate-700 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {para.category.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-slate-800 font-mono leading-relaxed">{para.text}</p>

                      {para.notes && (
                        <p className="text-[11px] text-slate-500 font-sans italic border-t border-slate-200/60 pt-1.5">
                          Note: {para.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Floating Voice AI Agent Button Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsVoiceAgentOpen(true)}
          className="group relative flex items-center gap-3 bg-black hover:bg-slate-800 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer border-2 border-slate-700"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></span>
          </div>
          <span className="font-extrabold text-sm tracking-wide">{t.askVoiceAiButton}</span>
        </button>
      </div>

      {/* Voice AI Agent Modal */}
      <VoiceAIAgent
        analysis={analysis}
        selectedLanguage={selectedLanguage}
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
      />

      {/* Full Photo Expansion Modal */}
      {isImageExpanded && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setIsImageExpanded(false)}
              className="absolute top-4 right-4 bg-slate-800 text-white p-2 rounded-full hover:bg-slate-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={
                currentCase.photocopyStyle === 'distorted_photocopy_stamp'
                  ? 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200'
                  : 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200'
              }
              alt="Court Order"
              className="max-h-[85vh] object-contain mx-auto rounded-xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
