import React, { useState } from 'react';
import { AudioLines, Bot, Calendar, MapPin, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { CourtDocumentCase, SupportedLanguage } from '../types';
import { VoiceAIAgent } from './VoiceAIAgent';
import { LitigantAudioPlayer } from './LitigantAudioPlayer';
import { getTranslation } from '../utils/translations';

interface DocumentResultViewProps {
  currentCase: CourtDocumentCase;
  selectedLanguage: SupportedLanguage;
}

const RESULT_LABELS = {
  en: {
    caseMetadata: 'Case Metadata',
    visionProcessed: 'Document Processed',
    caseNumber: 'Case Number',
    courtForum: 'Court Forum',
    refused: 'Refused',
    isolatedParagraph: 'Isolated Paragraph',
    visionQuoteNote: 'Extracted from the document. Please verify this quote against the original order.',
    deadline: 'Deadline:',
    forum: 'Forum:',
    noSteps: 'No future compliance steps were identified for this order.',
  },
  hi: {
    caseMetadata: 'मामले की जानकारी',
    visionProcessed: 'दस्तावेज़ संसाधित',
    caseNumber: 'मामला संख्या',
    courtForum: 'अदालत',
    refused: 'विश्लेषण रोका गया',
    isolatedParagraph: 'अलग किया गया मुख्य पैराग्राफ',
    visionQuoteNote: 'दस्तावेज़ से निकाला गया। कृपया मूल आदेश से इस उद्धरण की पुष्टि करें।',
    deadline: 'अंतिम तिथि:',
    forum: 'अदालत/स्थान:',
    noSteps: 'इस आदेश में आगे पालन करने के लिए कोई कदम नहीं मिला।',
  },
  bn: {
    caseMetadata: 'মামলার তথ্য',
    visionProcessed: 'নথি প্রক্রিয়াকৃত',
    caseNumber: 'মামলা নম্বর',
    courtForum: 'আদালত',
    refused: 'বিশ্লেষণ বন্ধ',
    isolatedParagraph: 'আলাদা করা মূল অনুচ্ছেদ',
    visionQuoteNote: 'নথি থেকে নেওয়া হয়েছে। মূল আদেশের সঙ্গে উদ্ধৃতিটি মিলিয়ে দেখুন।',
    deadline: 'সময়সীমা:',
    forum: 'আদালত/স্থান:',
    noSteps: 'এই আদেশে ভবিষ্যতে পালন করার কোনো পদক্ষেপ পাওয়া যায়নি।',
  },
  ta: {
    caseMetadata: 'வழக்கு விவரங்கள்',
    visionProcessed: 'ஆவணம் செயலாக்கப்பட்டது',
    caseNumber: 'வழக்கு எண்',
    courtForum: 'நீதிமன்றம்',
    refused: 'பகுப்பாய்வு நிறுத்தப்பட்டது',
    isolatedParagraph: 'தனியாகப் பிரித்த முக்கியப் பத்தி',
    visionQuoteNote: 'ஆவணத்திலிருந்து எடுக்கப்பட்டது. மூல உத்தரவுடன் இந்த மேற்கோளைச் சரிபார்க்கவும்.',
    deadline: 'காலக்கெடு:',
    forum: 'நீதிமன்றம்/இடம்:',
    noSteps: 'இந்த உத்தரவுக்கு எதிர்கால இணக்க நடவடிக்கைகள் எதுவும் கண்டறியப்படவில்லை.',
  },
  te: {
    caseMetadata: 'కేసు వివరాలు',
    visionProcessed: 'పత్రం ప్రాసెస్ చేయబడింది',
    caseNumber: 'కేసు సంఖ్య',
    courtForum: 'న్యాయస్థానం',
    refused: 'విశ్లేషణ నిలిపివేయబడింది',
    isolatedParagraph: 'వేరు చేసిన ముఖ్య పేరా',
    visionQuoteNote: 'పత్రం నుండి తీసుకోబడింది. ఈ ఉటంకింపును అసలు ఆదేశంతో సరిచూడండి.',
    deadline: 'గడువు:',
    forum: 'న్యాయస్థానం/స్థలం:',
    noSteps: 'ఈ ఆదేశానికి భవిష్యత్తులో పాటించాల్సిన చర్యలు ఏవీ గుర్తించబడలేదు.',
  },
  mr: {
    caseMetadata: 'प्रकरणाची माहिती',
    visionProcessed: 'दस्तऐवजावर प्रक्रिया पूर्ण',
    caseNumber: 'प्रकरण क्रमांक',
    courtForum: 'न्यायालय',
    refused: 'विश्लेषण थांबवले',
    isolatedParagraph: 'वेगळा केलेला मुख्य परिच्छेद',
    visionQuoteNote: 'दस्तऐवजातून काढलेले. कृपया मूळ आदेशाशी हा उतारा पडताळा.',
    deadline: 'अंतिम मुदत:',
    forum: 'न्यायालय/ठिकाण:',
    noSteps: 'या आदेशासाठी पुढील पालनाची कोणतीही पायरी आढळली नाही.',
  },
  gu: {
    caseMetadata: 'કેસની માહિતી',
    visionProcessed: 'દસ્તાવેજ પ્રક્રિયા પૂર્ણ',
    caseNumber: 'કેસ નંબર',
    courtForum: 'કોર્ટ',
    refused: 'વિશ્લેષણ રોકાયું',
    isolatedParagraph: 'અલગ કરેલો મુખ્ય ફકરો',
    visionQuoteNote: 'દસ્તાવેજમાંથી કાઢવામાં આવ્યું. કૃપા કરીને મૂળ આદેશ સાથે આ અવતરણ ચકાસો.',
    deadline: 'સમયમર્યાદા:',
    forum: 'કોર્ટ/સ્થળ:',
    noSteps: 'આ આદેશ માટે ભવિષ્યમાં પાલન કરવાના કોઈ પગલાં મળ્યા નથી.',
  },
  pa: {
    caseMetadata: 'ਕੇਸ ਦੀ ਜਾਣਕਾਰੀ',
    visionProcessed: 'ਦਸਤਾਵੇਜ਼ ਦੀ ਪ੍ਰਕਿਰਿਆ ਪੂਰੀ',
    caseNumber: 'ਕੇਸ ਨੰਬਰ',
    courtForum: 'ਅਦਾਲਤ',
    refused: 'ਵਿਸ਼ਲੇਸ਼ਣ ਰੋਕਿਆ ਗਿਆ',
    isolatedParagraph: 'ਅਲੱਗ ਕੀਤਾ ਮੁੱਖ ਪੈਰਾ',
    visionQuoteNote: 'ਦਸਤਾਵੇਜ਼ ਵਿੱਚੋਂ ਕੱਢਿਆ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਮੂਲ ਹੁਕਮ ਨਾਲ ਇਸ ਹਵਾਲੇ ਦੀ ਜਾਂਚ ਕਰੋ।',
    deadline: 'ਆਖਰੀ ਮਿਤੀ:',
    forum: 'ਅਦਾਲਤ/ਸਥਾਨ:',
    noSteps: 'ਇਸ ਹੁਕਮ ਲਈ ਭਵਿੱਖ ਵਿੱਚ ਪਾਲਣਾ ਕਰਨ ਵਾਲਾ ਕੋਈ ਕਦਮ ਨਹੀਂ ਮਿਲਿਆ।',
  },
};

export const DocumentResultView: React.FC<DocumentResultViewProps> = ({
  currentCase,
  selectedLanguage,
}) => {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const t = getTranslation(selectedLanguage);

  const analysis = currentCase.analysis;
  const isRefusal = currentCase.isRefusalCase || analysis.isRefusalState;
  const labels = RESULT_LABELS[selectedLanguage];

  // Selected explanation & audio script
  const plainExplanation = analysis.plainLanguageExplanations?.[selectedLanguage] || analysis.plainLanguageExplanations?.[selectedLanguage === 'hi' ? 'en' : 'hi'] || t.analysisCompleted;
  const audioScript = analysis.audioScripts?.[selectedLanguage] || analysis.audioScripts?.[selectedLanguage === 'hi' ? 'en' : 'hi'] || plainExplanation;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Header Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Document title */}
        <div className="flex items-center gap-3">
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

      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Document Thumbnail & Verbatim Operative Clause */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Document Details Metadata */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-black" />
                {labels.caseMetadata}
              </span>
              <span className="text-[11px] font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-semibold border border-slate-300">
                {labels.visionProcessed}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">{labels.caseNumber}</span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">{currentCase.caseNumber}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">{labels.courtForum}</span>
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
                {isRefusal ? labels.refused : labels.isolatedParagraph}
              </span>
            </div>

            {isRefusal ? (
              <div className="space-y-2 text-xs text-slate-900">
                <p className="font-bold">{analysis.refusalReason || t.refusalWarningSub}</p>
                <p className="text-[11px] text-slate-600">{t.refusalWarningSub}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-mono font-medium leading-relaxed bg-black/60 p-3 rounded-xl border border-slate-700/50 italic text-slate-100">
                  "{analysis.operativeDirectionVerbatim}"
                </p>
                <p className="text-[11px] text-slate-300">
                  {labels.visionQuoteNote}
                </p>
              </div>
            )}
          </div>

          {/* Quick Voice Audio Player */}
          <LitigantAudioPlayer
            audioScript={audioScript}
            selectedLanguage={selectedLanguage}
          />

        </div>

        {/* RIGHT COLUMN: Document Summary & Explanation & Action Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Summary Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            
            {/* View Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                {t.plainSummaryTitle}
              </h3>

              {/* Call Voice AI Icon */}
              <button
                onClick={() => setIsVoiceAgentOpen(true)}
                className="text-black hover:text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Bot className="h-4 w-4" />
                <span>{t.askVoiceAiButton}</span>
              </button>
            </div>

            {/* SUMMARY & NEXT STEPS */}
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
                        <div key={step.id || idx} className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {idx + 1}. {step.action}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-900 font-medium">
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                              <Calendar className="h-3.5 w-3.5 text-black" />
                              {labels.deadline} <strong className="text-black ml-1">{step.deadline}</strong>
                            </span>
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                              <MapPin className="h-3.5 w-3.5 text-black" />
                              {labels.forum} <strong className="text-black ml-1">{step.forum}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                      {labels.noSteps}
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

          </div>

        </div>

      </div>

      {/* Floating Voice AI Agent Button Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsVoiceAgentOpen(true)}
          aria-label={t.askVoiceAiButton}
          title={t.askVoiceAiButton}
          className="group relative h-16 w-16 flex items-center justify-center bg-black hover:bg-slate-800 text-white rounded-full shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 cursor-pointer border-2 border-slate-700"
        >
          <AudioLines className="h-7 w-7 text-white" />
          <span className="absolute inset-1 rounded-full border border-white/30 animate-pulse"></span>
        </button>
      </div>

      {/* Voice AI Agent Modal */}
      <VoiceAIAgent
        analysis={analysis}
        selectedLanguage={selectedLanguage}
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
      />

    </div>
  );
};
