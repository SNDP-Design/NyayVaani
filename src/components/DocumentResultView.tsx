import React, { useState } from 'react';
import { ArrowLeft, Bot, Volume2, Calendar, MapPin, AlertCircle, FileText, CheckCircle2, ChevronRight, ShieldCheck, Share2, Sparkles } from 'lucide-react';
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

const RESULT_LABELS = {
  en: {
    caseMetadata: 'Case Metadata',
    curatedDemo: 'Curated Demo Data',
    visionProcessed: 'Sarvam Vision Processed',
    caseNumber: 'Case Number',
    courtForum: 'Court Forum',
    refused: 'Refused',
    isolatedParagraph: 'Isolated Paragraph',
    demoQuoteNote: 'Curated sample text. This demo was not extracted from an uploaded document.',
    visionQuoteNote: 'Extracted by Sarvam Vision. Please verify this quote against the original order.',
    deadline: 'Deadline:',
    forum: 'Forum:',
    noSteps: 'No future compliance steps were identified for this order.',
  },
  hi: {
    caseMetadata: 'मामले की जानकारी',
    curatedDemo: 'चुना हुआ डेमो डेटा',
    visionProcessed: 'सर्वम विज़न द्वारा संसाधित',
    caseNumber: 'मामला संख्या',
    courtForum: 'अदालत',
    refused: 'विश्लेषण रोका गया',
    isolatedParagraph: 'अलग किया गया मुख्य पैराग्राफ',
    demoQuoteNote: 'यह तैयार किया गया नमूना है। इसे किसी अपलोड किए गए दस्तावेज़ से नहीं निकाला गया है।',
    visionQuoteNote: 'सर्वम विज़न द्वारा निकाला गया। कृपया मूल आदेश से इस उद्धरण की पुष्टि करें।',
    deadline: 'अंतिम तिथि:',
    forum: 'अदालत/स्थान:',
    noSteps: 'इस आदेश में आगे पालन करने के लिए कोई कदम नहीं मिला।',
  },
  bn: {
    caseMetadata: 'মামলার তথ্য',
    curatedDemo: 'নমুনা তথ্য',
    visionProcessed: 'সর্বম ভিশন দ্বারা প্রক্রিয়াকৃত',
    caseNumber: 'মামলা নম্বর',
    courtForum: 'আদালত',
    refused: 'বিশ্লেষণ বন্ধ',
    isolatedParagraph: 'আলাদা করা মূল অনুচ্ছেদ',
    demoQuoteNote: 'এটি প্রস্তুত করা নমুনা লেখা; কোনো আপলোড করা নথি থেকে নেওয়া নয়।',
    visionQuoteNote: 'সর্বম ভিশন দ্বারা নেওয়া হয়েছে। মূল আদেশের সঙ্গে উদ্ধৃতিটি মিলিয়ে দেখুন।',
    deadline: 'সময়সীমা:',
    forum: 'আদালত/স্থান:',
    noSteps: 'এই আদেশে ভবিষ্যতে পালন করার কোনো পদক্ষেপ পাওয়া যায়নি।',
  },
  ta: {
    caseMetadata: 'வழக்கு விவரங்கள்',
    curatedDemo: 'மாதிரித் தரவு',
    visionProcessed: 'சர்வம் விஷன் செயலாக்கியது',
    caseNumber: 'வழக்கு எண்',
    courtForum: 'நீதிமன்றம்',
    refused: 'பகுப்பாய்வு நிறுத்தப்பட்டது',
    isolatedParagraph: 'தனியாகப் பிரித்த முக்கியப் பத்தி',
    demoQuoteNote: 'இது தயாரிக்கப்பட்ட மாதிரி உரை; பதிவேற்றிய ஆவணத்திலிருந்து எடுக்கப்படவில்லை.',
    visionQuoteNote: 'சர்வம் விஷன் மூலம் எடுக்கப்பட்டது. மூல உத்தரவுடன் இந்த மேற்கோளைச் சரிபார்க்கவும்.',
    deadline: 'காலக்கெடு:',
    forum: 'நீதிமன்றம்/இடம்:',
    noSteps: 'இந்த உத்தரவுக்கு எதிர்கால இணக்க நடவடிக்கைகள் எதுவும் கண்டறியப்படவில்லை.',
  },
  te: {
    caseMetadata: 'కేసు వివరాలు',
    curatedDemo: 'నమూనా డేటా',
    visionProcessed: 'సర్వం విజన్ ద్వారా ప్రాసెస్ చేయబడింది',
    caseNumber: 'కేసు సంఖ్య',
    courtForum: 'న్యాయస్థానం',
    refused: 'విశ్లేషణ నిలిపివేయబడింది',
    isolatedParagraph: 'వేరు చేసిన ముఖ్య పేరా',
    demoQuoteNote: 'ఇది సిద్ధం చేసిన నమూనా పాఠ్యం; అప్‌లోడ్ చేసిన పత్రం నుండి తీసుకోలేదు.',
    visionQuoteNote: 'సర్వం విజన్ ద్వారా తీసుకోబడింది. ఈ ఉటంకింపును అసలు ఆదేశంతో సరిచూడండి.',
    deadline: 'గడువు:',
    forum: 'న్యాయస్థానం/స్థలం:',
    noSteps: 'ఈ ఆదేశానికి భవిష్యత్తులో పాటించాల్సిన చర్యలు ఏవీ గుర్తించబడలేదు.',
  },
  mr: {
    caseMetadata: 'प्रकरणाची माहिती',
    curatedDemo: 'नमुना माहिती',
    visionProcessed: 'सर्वम व्हिजनद्वारे प्रक्रिया केलेले',
    caseNumber: 'प्रकरण क्रमांक',
    courtForum: 'न्यायालय',
    refused: 'विश्लेषण थांबवले',
    isolatedParagraph: 'वेगळा केलेला मुख्य परिच्छेद',
    demoQuoteNote: 'हा तयार केलेला नमुना मजकूर आहे; अपलोड केलेल्या दस्तऐवजातून घेतलेला नाही.',
    visionQuoteNote: 'सर्वम व्हिजनद्वारे काढलेले. कृपया मूळ आदेशाशी हा उतारा पडताळा.',
    deadline: 'अंतिम मुदत:',
    forum: 'न्यायालय/ठिकाण:',
    noSteps: 'या आदेशासाठी पुढील पालनाची कोणतीही पायरी आढळली नाही.',
  },
  gu: {
    caseMetadata: 'કેસની માહિતી',
    curatedDemo: 'નમૂના માહિતી',
    visionProcessed: 'સર્વમ વિઝન દ્વારા પ્રક્રિયા કરેલ',
    caseNumber: 'કેસ નંબર',
    courtForum: 'કોર્ટ',
    refused: 'વિશ્લેષણ રોકાયું',
    isolatedParagraph: 'અલગ કરેલો મુખ્ય ફકરો',
    demoQuoteNote: 'આ તૈયાર કરેલું નમૂના લખાણ છે; અપલોડ કરેલા દસ્તાવેજમાંથી લેવામાં આવ્યું નથી.',
    visionQuoteNote: 'સર્વમ વિઝન દ્વારા કાઢવામાં આવ્યું. કૃપા કરીને મૂળ આદેશ સાથે આ અવતરણ ચકાસો.',
    deadline: 'સમયમર્યાદા:',
    forum: 'કોર્ટ/સ્થળ:',
    noSteps: 'આ આદેશ માટે ભવિષ્યમાં પાલન કરવાના કોઈ પગલાં મળ્યા નથી.',
  },
  pa: {
    caseMetadata: 'ਕੇਸ ਦੀ ਜਾਣਕਾਰੀ',
    curatedDemo: 'ਨਮੂਨਾ ਜਾਣਕਾਰੀ',
    visionProcessed: 'ਸਰਵਮ ਵਿਜ਼ਨ ਦੁਆਰਾ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ',
    caseNumber: 'ਕੇਸ ਨੰਬਰ',
    courtForum: 'ਅਦਾਲਤ',
    refused: 'ਵਿਸ਼ਲੇਸ਼ਣ ਰੋਕਿਆ ਗਿਆ',
    isolatedParagraph: 'ਅਲੱਗ ਕੀਤਾ ਮੁੱਖ ਪੈਰਾ',
    demoQuoteNote: 'ਇਹ ਤਿਆਰ ਕੀਤਾ ਨਮੂਨਾ ਲਿਖਤ ਹੈ; ਅੱਪਲੋਡ ਕੀਤੇ ਦਸਤਾਵੇਜ਼ ਤੋਂ ਨਹੀਂ ਲਿਆ ਗਿਆ।',
    visionQuoteNote: 'ਸਰਵਮ ਵਿਜ਼ਨ ਦੁਆਰਾ ਕੱਢਿਆ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਮੂਲ ਹੁਕਮ ਨਾਲ ਇਸ ਹਵਾਲੇ ਦੀ ਜਾਂਚ ਕਰੋ।',
    deadline: 'ਆਖਰੀ ਮਿਤੀ:',
    forum: 'ਅਦਾਲਤ/ਸਥਾਨ:',
    noSteps: 'ਇਸ ਹੁਕਮ ਲਈ ਭਵਿੱਖ ਵਿੱਚ ਪਾਲਣਾ ਕਰਨ ਵਾਲਾ ਕੋਈ ਕਦਮ ਨਹੀਂ ਮਿਲਿਆ।',
  },
};

const HINDI_DEMO_STEPS: Record<string, { action: string; deadline: string; forum: string }> = {
  'case-01-kanpur-demo:ns-1': {
    action: 'वर्ष 2021-2026 की नगर पालिका संपत्ति कर रसीदें जमा करें',
    deadline: '14 अगस्त 2026',
    forum: 'कोर्ट रूम नंबर 4, अपर जिला न्यायाधीश चतुर्थ, कानपुर नगर',
  },
  'case-01-kanpur-demo:ns-2': {
    action: 'मुद्दे तय करने की सुनवाई के लिए अदालत में उपस्थित हों',
    deadline: '14 अगस्त 2026',
    forum: 'कोर्ट रूम नंबर 4, कानपुर जिला न्यायालय',
  },
  'case-02-interim-stay:ns-1': {
    action: 'प्लॉट बी-12 पर कोई निर्माण या बदलाव न करें और यथास्थिति बनाए रखें',
    deadline: '28 अगस्त 2026 तक',
    forum: 'प्लॉट बी-12, किदवई नगर, कानपुर',
  },
  'case-02-interim-stay:ns-2': {
    action: 'केडीए का जवाब दाखिल होने के बाद अगली सुनवाई में उपस्थित हों',
    deadline: '28 अगस्त 2026',
    forum: 'सिविल जज (सीनियर डिवीजन), कानपुर नगर',
  },
  'case-03-bail-order:ns-1': {
    action: '₹50,000 का निजी मुचलका और ₹50,000-₹50,000 की दो स्थानीय जमानतें जमा करें',
    deadline: 'प्रमाणित प्रति मिलने के 10 दिनों के भीतर',
    forum: 'मुख्य महानगर मजिस्ट्रेट न्यायालय, कानपुर नगर',
  },
  'case-04-maintenance-order:ns-1': {
    action: 'पत्नी के बैंक खाते में ₹12,000 अंतरिम भरण-पोषण जमा करें',
    deadline: '1 अगस्त 2026 से हर महीने की 5 तारीख तक',
    forum: 'बैंक हस्तांतरण / परिवार न्यायालय, कानपुर',
  },
  'case-06-ambiguous-notice-refusal:ns-1': {
    action: 'प्रतिवादियों को पंजीकृत नोटिस जारी करने की प्रक्रिया पूरी करें',
    deadline: '7 दिनों के भीतर',
    forum: 'सिविल जज न्यायालय रजिस्ट्री, कानपुर',
  },
  'case-07-judgment-dismissal:ns-1': {
    action: '₹15,000 प्रतिपूरक लागत जमा करें',
    deadline: '30 दिनों के भीतर, यानी 7 अगस्त 2026 तक',
    forum: 'जिला विधिक सेवा प्राधिकरण, कानपुर नगर',
  },
  'case-08-tenancy-written-statement:ns-1': {
    action: 'अदालत में लिखित बयान दाखिल करें और उसकी प्रति मकान मालिक को दें',
    deadline: '18 सितंबर 2026 तक',
    forum: 'वरिष्ठ सिविल जज न्यायालय, कानपुर नगर',
  },
  'case-09-anticipatory-bail:ns-1': {
    action: 'बुलाए जाने पर पुलिस जांच में शामिल हों और गिरफ्तारी की कोशिश पर ₹1,00,000 का मुचलका दें',
    deadline: 'तुरंत / जब भी बुलाया जाए',
    forum: 'थाना स्वरूप नगर, कानपुर नगर',
  },
  'case-10-execution-warrant:ns-1': {
    action: 'संपत्ति कुर्की रोकने के लिए अदालत में ₹88,500 जमा करें',
    deadline: '30 सितंबर 2026 तक',
    forum: 'सब-जज प्रथम श्रेणी न्यायालय, कानपुर नगर',
  },
};

export const DocumentResultView: React.FC<DocumentResultViewProps> = ({
  currentCase,
  selectedLanguage,
  onLanguageChange,
  onBackToUpload,
}) => {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const t = getTranslation(selectedLanguage);

  const analysis = currentCase.analysis;
  const isRefusal = currentCase.isRefusalCase || analysis.isRefusalState;
  const isCuratedDemo = !currentCase.id.startsWith('custom-');
  const labels = RESULT_LABELS[selectedLanguage];

  // Selected explanation & audio script
  const plainExplanation = analysis.plainLanguageExplanations?.[selectedLanguage] || analysis.plainLanguageExplanations?.[selectedLanguage === 'hi' ? 'en' : 'hi'] || t.analysisCompleted;
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
                {isCuratedDemo ? labels.curatedDemo : labels.visionProcessed}
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
                  {isCuratedDemo ? labels.demoQuoteNote : labels.visionQuoteNote}
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
                      {analysis.nextSteps.map((step, idx) => {
                        const localizedStep =
                          selectedLanguage === 'hi' && isCuratedDemo
                            ? HINDI_DEMO_STEPS[`${currentCase.id}:${step.id}`] || step
                            : step;
                        return (
                        <div key={step.id || idx} className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {idx + 1}. {localizedStep.action}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-900 font-medium">
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                              <Calendar className="h-3.5 w-3.5 text-black" />
                              {labels.deadline} <strong className="text-black ml-1">{localizedStep.deadline}</strong>
                            </span>
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                              <MapPin className="h-3.5 w-3.5 text-black" />
                              {labels.forum} <strong className="text-black ml-1">{localizedStep.forum}</strong>
                            </span>
                          </div>
                        </div>
                      )})}
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

    </div>
  );
};
