import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  // Brand & Header
  appTitle: string;
  pwaReady: string;
  appSubtitle: string;
  languageLabel: string;
  installApp: string;
  uploadNew: string;
  voiceAi: string;
  chatbotTitle: string;

  // Upload Screen
  uploadHeroBadge: string;
  uploadHeading: string;
  uploadSubheading: string;
  dragDropTitle: string;
  browseFiles: string;
  uploadNote: string;
  analyzingTitle: string;
  analyzingSub: string;
  selectLanguageAria: string;
  fileSelected: string;
  filesSelected: string;
  pdfPagesSelected: string;
  multiPageReady: string;
  addMoreFiles: string;
  clearAll: string;
  removePage: string;
  pageLabel: string;
  uploadTip: string;
  pastePrompt: string;
  expand: string;
  collapse: string;
  pastePlaceholder: string;
  optimizingPages: string;
  readUploadedPages: string;
  readUploadedDocument: string;
  readCourtDocument: string;
  uploadUnsupportedError: string;
  uploadPageLimitError: string;
  uploadPdfMixError: string;
  uploadSizeError: string;
  uploadReadError: string;
  uploadRequiredError: string;
  recentDocumentsTitle: string;
  recentDocumentsSub: string;
  openRecentDocument: string;
  deleteRecentDocument: string;
  pauseAudio: string;
  analysisCompleted: string;
  analysisFailedError: string;
  connectionError: string;

  // Result View & Sections
  operativeDirectionTitle: string;
  operativeDirectionSub: string;
  plainSummaryTitle: string;
  plainSummarySub: string;
  nextStepsTitle: string;
  nextStepsSub: string;
  attributionTitle: string;
  attributionSub: string;
  refusalWarningTitle: string;
  refusalWarningSub: string;
  listenAudioButton: string;
  askVoiceAiButton: string;
  exportReportButton: string;

  // Voice AI Agent Modal
  voiceAiModalTitle: string;
  voiceAiModalSub: string;
  voiceAiListening: string;
  voiceAiClickToSpeak: string;
  voiceAiStopListening: string;
  voiceAiSendInput: string;
  voiceAiInputPlaceholder: string;
  suggestedQuestionsTitle: string;
  suggestedQ1: string;
  suggestedQ2: string;
  suggestedQ3: string;
  suggestedQ4: string;

  // Audio Player
  audioPlayerTitle: string;
  audioPlaying: string;
  audioPaused: string;
  audioSpeed: string;

  // New missing keys for full language reactivity
  docPreviewTitle: string;
  expandPhoto: string;
  voiceAiTitle: string;
  voiceAiSub: string;
  listenTitle: string;
  listenSub: string;
  playAudioButton: string;
  voiceListening: string;
  typeQuestionPlaceholder: string;

  // Footer
  footerLitigantNote: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appTitle: "NyayVaani",
    pwaReady: "PWA Ready",
    appSubtitle: "Court Order Document Intelligence & Voice AI Assistant",
    languageLabel: "Language:",
    installApp: "Install App",
    uploadNew: "Upload New",
    voiceAi: "Voice AI",
    chatbotTitle: "Chatbot",

    uploadHeroBadge: "Document & Voice AI for Litigants",
    uploadHeading: "Understand Court Orders Instantly in Your Language",
    uploadSubheading: "Upload an Indian court order photo or scan. NyayVaani digitizes it, separates the court's directions from party claims, and speaks the result in plain language.",
    dragDropTitle: "Drag & drop court order photos or PDF document here, or",
    browseFiles: "browse files",
    uploadNote: "Upload one PDF (up to 50 pages) or up to 10 JPG/PNG court-order images",
    analyzingTitle: "Reading and analyzing your court document...",
    analyzingSub: "Extracting legal text, tagging paragraph provenance, and isolating operative directions",
    selectLanguageAria: "Select language",
    fileSelected: "page / file selected",
    filesSelected: "pages / files selected",
    pdfPagesSelected: "{count}-page PDF selected",
    multiPageReady: "Multi-page ready",
    addMoreFiles: "Add more images",
    clearAll: "Clear all",
    removePage: "Remove this page",
    pageLabel: "Page",
    uploadTip: "PDFs up to 50 pages are automatically processed in ordered batches. You can also select up to 10 page images.",
    pastePrompt: "Need to paste plain text instead?",
    expand: "Expand",
    collapse: "Collapse",
    pastePlaceholder: "Paste court-order text here...",
    optimizingPages: "Optimizing court pages for fast AI analysis...",
    readUploadedPages: "Read {count} uploaded court pages",
    readUploadedDocument: "Read uploaded court document",
    readCourtDocument: "Read court document",
    uploadUnsupportedError: "Please upload only PDF, JPG, JPEG, or PNG court documents.",
    uploadPageLimitError: "Upload one PDF up to 50 pages, or up to 10 page images.",
    uploadPdfMixError: "Upload one PDF by itself, or upload multiple JPG/PNG page images together.",
    uploadSizeError: "Keep the PDF or combined page images under 3 MB.",
    uploadReadError: "One of the selected files could not be read. Please choose it again.",
    uploadRequiredError: "Please upload a court-order PDF or image, or paste the court-order text.",
    recentDocumentsTitle: "Recent court documents",
    recentDocumentsSub: "Open a processed document without uploading it again",
    openRecentDocument: "Open saved document",
    deleteRecentDocument: "Delete saved document",
    pauseAudio: "Pause",
    analysisCompleted: "Analysis completed.",
    analysisFailedError: "NyayVaani could not analyze this court document. Please try again.",
    connectionError: "NyayVaani could not connect to the AI service. Check your connection and try again.",

    operativeDirectionTitle: "Isolated Operative Court Direction",
    operativeDirectionSub: "Verbatim judge order extracted directly from the court document",
    plainSummaryTitle: "Plain Language Summary",
    plainSummarySub: "Simplified legal explanation in your selected language",
    nextStepsTitle: "Mandatory Next Steps & Deadlines",
    nextStepsSub: "Actionable tasks identified for the litigant",
    attributionTitle: "Paragraph-by-Paragraph Attribution Tagging",
    attributionSub: "Clear separation of Court Directions, Petitioner claims, and Respondent claims",
    refusalWarningTitle: "Refusal & Caution State Triggered",
    refusalWarningSub: "Document is too degraded, truncated, or lacks clear operative court directions",
    listenAudioButton: "Listen in Your Language",
    askVoiceAiButton: "Ask NyayVaani Voice AI",
    exportReportButton: "Download Litigant 1-Pager Report",

    voiceAiModalTitle: "NyayVaani Voice AI Assistant",
    voiceAiModalSub: "Ask any question about this court order in your spoken language",
    voiceAiListening: "Listening... Speak now",
    voiceAiClickToSpeak: "Tap to Speak",
    voiceAiStopListening: "Stop",
    voiceAiSendInput: "Send",
    voiceAiInputPlaceholder: "Type or speak your question...",
    suggestedQuestionsTitle: "Suggested Questions:",
    suggestedQ1: "What did the judge specifically order for me?",
    suggestedQ2: "What is my deadline to act?",
    suggestedQ3: "Was my application accepted or rejected?",
    suggestedQ4: "What should I tell my lawyer next?",

    audioPlayerTitle: "Litigant Audio Voice Summary",
    audioPlaying: "Playing voice summary...",
    audioPaused: "Paused",
    audioSpeed: "Speed",

    docPreviewTitle: "Document Thumbnail",
    expandPhoto: "Expand Photo",
    voiceAiTitle: "Have questions about this document?",
    voiceAiSub: "Click below to talk with NyayVaani Voice AI in real-time!",
    listenTitle: "Voice Read Aloud Engine",
    listenSub: "Listen to the order in your native spoken tongue",
    playAudioButton: "Listen Aloud",
    voiceListening: "Listening to your voice...",
    typeQuestionPlaceholder: "Ask a question about this document...",

    footerLitigantNote: "Litigant Assistance & Literacy Tool • Not legal representation"
  },

  hi: {
    appTitle: "न्यायवाणी",
    pwaReady: "PWA तैयार",
    appSubtitle: "अदालत आदेश दस्तावेज़ बुद्धिमत्ता एवं वॉइस AI सहायक",
    languageLabel: "भाषा:",
    installApp: "ऐप इंस्टॉल करें",
    uploadNew: "नया अपलोड करें",
    voiceAi: "वॉइस AI",
    chatbotTitle: "चैटबॉट",

    uploadHeroBadge: "आम नागरिकों के लिए दस्तावेज़ एवं वॉइस AI",
    uploadHeading: "अदालत के आदेश को अपनी भाषा में तुरंत समझें",
    uploadSubheading: "किसी भी भारतीय अदालत के आदेश का फोटो या स्कैन अपलोड करें। न्यायवाणी जज के आदेश को अलग करता है, पक्षों की बातों को छांटता है और आपकी सरल भाषा में बोलकर सुनाता है।",
    dragDropTitle: "अदालत के आदेश की फोटो यहां खींचकर लाएं, या",
    browseFiles: "फाइलें चुनें",
    uploadNote: "एक PDF (अधिकतम 50 पेज) या अदालत के आदेश की अधिकतम 10 JPG/PNG तस्वीरें अपलोड करें",
    analyzingTitle: "आपके अदालत के आदेश को पढ़कर विश्लेषण किया जा रहा है...",
    analyzingSub: "कानूनी पाठ निष्कर्षण, पैराग्राफ वर्गीकरण और मुख्य आदेश को अलग किया जा रहा है",
    selectLanguageAria: "भाषा चुनें",
    fileSelected: "पेज / फाइल चुनी गई",
    filesSelected: "पेज / फाइलें चुनी गईं",
    pdfPagesSelected: "{count} पेज की PDF चुनी गई",
    multiPageReady: "कई पेज तैयार",
    addMoreFiles: "और तस्वीरें जोड़ें",
    clearAll: "सभी हटाएं",
    removePage: "यह पेज हटाएं",
    pageLabel: "पेज",
    uploadTip: "50 पेज तक की PDF अपने-आप सही क्रम में हिस्सों में प्रोसेस होती है। आप अधिकतम 10 पेज की तस्वीरें भी चुन सकते हैं।",
    pastePrompt: "क्या आप सादा पाठ पेस्ट करना चाहते हैं?",
    expand: "खोलें",
    collapse: "बंद करें",
    pastePlaceholder: "अदालत के आदेश का पाठ यहां पेस्ट करें...",
    optimizingPages: "तेज़ AI विश्लेषण के लिए पेज तैयार किए जा रहे हैं...",
    readUploadedPages: "अपलोड किए गए {count} पेज पढ़ें",
    readUploadedDocument: "अपलोड किया गया अदालत आदेश पढ़ें",
    readCourtDocument: "अदालत आदेश पढ़ें",
    uploadUnsupportedError: "केवल PDF, JPG, JPEG या PNG अदालत दस्तावेज़ अपलोड करें।",
    uploadPageLimitError: "एक PDF में अधिकतम 50 पेज या अधिकतम 10 पेज की तस्वीरें अपलोड करें।",
    uploadPdfMixError: "एक PDF अकेले अपलोड करें, या कई JPG/PNG पेज तस्वीरें एक साथ अपलोड करें।",
    uploadSizeError: "PDF या सभी पेज की तस्वीरों का कुल आकार 3 MB से कम रखें।",
    uploadReadError: "चुनी गई फाइलों में से एक पढ़ी नहीं जा सकी। कृपया उसे फिर चुनें।",
    uploadRequiredError: "अदालत आदेश की PDF या तस्वीर अपलोड करें, या उसका पाठ पेस्ट करें।",
    recentDocumentsTitle: "हाल के अदालत दस्तावेज़",
    recentDocumentsSub: "प्रोसेस किया गया दस्तावेज़ दोबारा अपलोड किए बिना खोलें",
    openRecentDocument: "सहेजा दस्तावेज़ खोलें",
    deleteRecentDocument: "सहेजा दस्तावेज़ हटाएँ",
    pauseAudio: "रोकें",
    analysisCompleted: "विश्लेषण पूरा हुआ।",
    analysisFailedError: "न्यायवाणी इस अदालत दस्तावेज़ का विश्लेषण नहीं कर सकी। कृपया फिर कोशिश करें।",
    connectionError: "न्यायवाणी AI सेवा से जुड़ नहीं सकी। अपना इंटरनेट जांचकर फिर कोशिश करें।",

    operativeDirectionTitle: "अदालत का मुख्य आदेश (ऑपरेटिव डायरेक्शन)",
    operativeDirectionSub: "कोर्ट के फैसले से सीधे निकाला गया शब्दशः न्यायाधीश का आदेश",
    plainSummaryTitle: "सरल भाषा में सारांश",
    plainSummarySub: "आपकी चुनी हुई भाषा में आसान कानूनी व्याख्या",
    nextStepsTitle: "ज़रूरी अगले कदम और समय-सीमा",
    nextStepsSub: "नागरिक के लिए ध्यान देने योग्य आवश्यक कार्य",
    attributionTitle: "पैराग्राफ-दर-पैराग्राफ वर्गीकरण",
    attributionSub: "कोर्ट के फैसले, याचिकाकर्ता और प्रतिवादी के तर्कों का स्पष्ट विभाजन",
    refusalWarningTitle: "अस्वीकृति एवं सावधानी स्थिति",
    refusalWarningSub: "दस्तावेज़ अत्यधिक धुंधला है, कटा हुआ है, या इसमें स्पष्ट अदालती आदेश नहीं है",
    listenAudioButton: "अपनी भाषा में सुनें",
    askVoiceAiButton: "न्यायवाणी वॉइस AI से पूछें",
    exportReportButton: "1-पेज रिपोर्ट डाउनलोड करें",

    voiceAiModalTitle: "न्यायवाणी वॉइस AI सहायक",
    voiceAiModalSub: "इस अदालती आदेश के बारे में अपनी भाषा में कोई भी सवाल पूछें",
    voiceAiListening: "सुन रहा हूँ... अब बोलें",
    voiceAiClickToSpeak: "बोलने के लिए दबाएं",
    voiceAiStopListening: "रोकें",
    voiceAiSendInput: "भेजें",
    voiceAiInputPlaceholder: "अपना सवाल टाइप करें या बोलें...",
    suggestedQuestionsTitle: "सुझाए गए प्रश्न:",
    suggestedQ1: "जज साहब ने मेरे लिए क्या आदेश दिया है?",
    suggestedQ2: "मेरे लिए कार्रवाई की अंतिम तिथि (डेडलाइन) क्या है?",
    suggestedQ3: "क्या मेरी अर्जी स्वीकार हुई या खारिज?",
    suggestedQ4: "मुझे अपने वकील साहब से आगे क्या कहना चाहिए?",

    audioPlayerTitle: "आवाज़ में कानूनी सारांश",
    audioPlaying: "आवाज़ में सारांश चल रहा है...",
    audioPaused: "रुका हुआ",
    audioSpeed: "गति",

    docPreviewTitle: "दस्तावेज़ का फोटो नमुना",
    expandPhoto: "फोटो बड़ी करें",
    voiceAiTitle: "क्या इस दस्तावेज़ के बारे में कोई प्रश्न है?",
    voiceAiSub: "न्यायवाणी वॉइस AI से सीधे अपनी भाषा में बात करने के लिए नीचे क्लिक करें!",
    listenTitle: "आवाज़ में पढ़कर सुनाने वाला इंजन",
    listenSub: "अपने अदालत के आदेश को अपनी मातृभाषा में सुनें",
    playAudioButton: "बोलकर सुनें",
    voiceListening: "आपकी आवाज़ सुनी जा रही है...",
    typeQuestionPlaceholder: "इस दस्तावेज़ के बारे में अपना प्रश्न पूछें...",

    footerLitigantNote: "नागरिक सहायता एवं विधिक साक्षरता उपकरण • कानूनी प्रतिनिधित्व नहीं"
  },

  bn: {
    appTitle: "ন্যায়বাণী",
    pwaReady: "PWA তৈরি",
    appSubtitle: "আদালতের আদেশ নথি তথ্য ও ভয়েস AI সহকারী",
    languageLabel: "ভাষা:",
    installApp: "অ্যাপ ইনস্টল করুন",
    uploadNew: "নতুন আপলোড",
    voiceAi: "ভয়েস AI",
    chatbotTitle: "চ্যাটবট",

    uploadHeroBadge: "বিচারপ্রার্থীদের জন্য নথি ও ভয়েস AI",
    uploadHeading: "আদালতের আদেশ তাৎক্ষণিকভাবে নিজের ভাষায় বুঝুন",
    uploadSubheading: "যেকোনো ভারতীয় আদালতের আদেশের ছবি বা স্ক্যান আপলোড করুন। ন্যায়বাণী বিচারকের নির্দেশ আলাদা করে এবং সহজ বাংলায় আপনাকে শোনায়।",
    dragDropTitle: "আদালতের আদেশের ছবি এখানে ড্রপ করুন, অথবা",
    browseFiles: "ফাইল বাছুন",
    uploadNote: "একটি PDF (সর্বোচ্চ ৫০ পৃষ্ঠা) অথবা আদালতের আদেশের সর্বোচ্চ ১০টি JPG/PNG ছবি আপলোড করুন",
    analyzingTitle: "আপনার আদালতের আদেশ পড়ে বিশ্লেষণ করা হচ্ছে...",
    analyzingSub: "আইনি পাঠ্য বের করা এবং মূল নির্দেশ চিহ্নিত করা হচ্ছে",
    selectLanguageAria: "ভাষা নির্বাচন করুন",
    fileSelected: "পৃষ্ঠা / ফাইল নির্বাচিত",
    filesSelected: "পৃষ্ঠা / ফাইল নির্বাচিত",
    pdfPagesSelected: "{count} পৃষ্ঠার PDF নির্বাচিত",
    multiPageReady: "একাধিক পৃষ্ঠা প্রস্তুত",
    addMoreFiles: "আরও ছবি যোগ করুন",
    clearAll: "সব মুছুন",
    removePage: "এই পৃষ্ঠা সরান",
    pageLabel: "পৃষ্ঠা",
    uploadTip: "৫০ পৃষ্ঠা পর্যন্ত PDF স্বয়ংক্রিয়ভাবে সঠিক ক্রমে ভাগ করে প্রক্রিয়া করা হয়। সর্বোচ্চ ১০টি পৃষ্ঠার ছবিও নির্বাচন করতে পারেন।",
    pastePrompt: "পরিবর্তে সাধারণ লেখা পেস্ট করতে চান?",
    expand: "খুলুন",
    collapse: "বন্ধ করুন",
    pastePlaceholder: "আদালতের আদেশের লেখা এখানে পেস্ট করুন...",
    optimizingPages: "দ্রুত AI বিশ্লেষণের জন্য পৃষ্ঠাগুলো প্রস্তুত করা হচ্ছে...",
    readUploadedPages: "আপলোড করা {count}টি আদালতের পৃষ্ঠা পড়ুন",
    readUploadedDocument: "আপলোড করা আদালতের আদেশ পড়ুন",
    readCourtDocument: "আদালতের আদেশ পড়ুন",
    uploadUnsupportedError: "শুধু PDF, JPG, JPEG বা PNG আদালতের নথি আপলোড করুন।",
    uploadPageLimitError: "একটি PDF-এ সর্বোচ্চ ৫০ পৃষ্ঠা অথবা সর্বোচ্চ ১০টি পৃষ্ঠার ছবি আপলোড করুন।",
    uploadPdfMixError: "একটি PDF আলাদাভাবে অথবা একাধিক JPG/PNG পৃষ্ঠার ছবি একসঙ্গে আপলোড করুন।",
    uploadSizeError: "PDF বা সব পৃষ্ঠার ছবির মোট আকার ৩ MB-এর মধ্যে রাখুন।",
    uploadReadError: "নির্বাচিত ফাইলগুলোর একটি পড়া যায়নি। আবার নির্বাচন করুন।",
    uploadRequiredError: "আদালতের আদেশের PDF বা ছবি আপলোড করুন, অথবা লেখাটি পেস্ট করুন।",
    recentDocumentsTitle: "সাম্প্রতিক আদালতের নথি",
    recentDocumentsSub: "আবার আপলোড না করে প্রক্রিয়াকৃত নথি খুলুন",
    openRecentDocument: "সংরক্ষিত নথি খুলুন",
    deleteRecentDocument: "সংরক্ষিত নথি মুছুন",
    pauseAudio: "বিরতি",
    analysisCompleted: "বিশ্লেষণ সম্পন্ন হয়েছে।",
    analysisFailedError: "ন্যায়বাণী এই আদালতের নথি বিশ্লেষণ করতে পারেনি। আবার চেষ্টা করুন।",
    connectionError: "ন্যায়বাণী AI পরিষেবার সঙ্গে সংযোগ করতে পারেনি। ইন্টারনেট পরীক্ষা করে আবার চেষ্টা করুন।",

    operativeDirectionTitle: "আদালতের প্রধান নির্দেশ (অপারেটিভ ডিরেকশন)",
    operativeDirectionSub: "আদালতের নথি থেকে সরাসরি নেওয়া বিচারকের মূল রায়",
    plainSummaryTitle: "সহজ ভাষায় সারসংক্ষেপ",
    plainSummarySub: "আপনার নির্বাচিত ভাষায় সহজ আইনি ব্যাখ্যা",
    nextStepsTitle: "জরুরি পরবর্তী পদক্ষেপ ও সময়সীমা",
    nextStepsSub: "বিচারপ্রার্থীর জন্য প্রয়োজনীয় কাজসমূহ",
    attributionTitle: "অনুচ্ছেদ ভিত্তিক শ্রেণীবিভাগ",
    attributionSub: "আদালতের নির্দেশ, আবেদনকারী ও বিবাদীর দাবির স্পষ্ট পৃথকীকরণ",
    refusalWarningTitle: "সতর্কতা ও প্রত্যাখ্যান অবস্থা",
    refusalWarningSub: "নথিটি অতিরিক্ত অস্পষ্ট, অসম্পূর্ণ বা স্পষ্ট নির্দেশের অভাব রয়েছে",
    listenAudioButton: "বাংলায় শুনুন",
    askVoiceAiButton: "ন্যায়বাণী ভয়েস AI-কে জিজ্ঞাসা করুন",
    exportReportButton: "১-পৃষ্ঠার রিপোর্ট ডাউনলোড করুন",

    voiceAiModalTitle: "ন্যায়বাণী ভয়েস AI সহকারী",
    voiceAiModalSub: "এই আদালতের আদেশ নিয়ে নিজের ভাষায় যেকোনো প্রশ্ন করুন",
    voiceAiListening: "শুনছি... এখন বলুন",
    voiceAiClickToSpeak: "বলতে ট্যাপ করুন",
    voiceAiStopListening: "থামান",
    voiceAiSendInput: "পাঠান",
    voiceAiInputPlaceholder: "আপনার প্রশ্ন লিখুন বা বলুন...",
    suggestedQuestionsTitle: "প্রস্তাবিত প্রশ্নাবলী:",
    suggestedQ1: "বিচারক আমার জন্য ঠিক কী নির্দেশ দিয়েছেন?",
    suggestedQ2: "আমার পরবর্তী পদক্ষেপের সময়সীমা কতদিন?",
    suggestedQ3: "আমার আবেদন কি মঞ্জুর হয়েছে নাকি খারিজ হয়েছে?",
    suggestedQ4: "আমার আইনজীবীকে এখন কী বলতে হবে?",

    audioPlayerTitle: "ভয়েস আইনি সারসংক্ষেপ",
    audioPlaying: "কণ্ঠে সারসংক্ষেপ চলছে...",
    audioPaused: "থামানো হয়েছে",
    audioSpeed: "গতি",

    docPreviewTitle: "নথির থাম্বনেইল",
    expandPhoto: "ছবি বড় করুন",
    voiceAiTitle: "এই নথি নিয়ে কোনো প্রশ্ন আছে?",
    voiceAiSub: "ন্যায়বাণী ভয়েস AI-এর সাথে সরাসরি কথা বলতে নিচে ক্লিক করুন!",
    listenTitle: "ভয়েস পাঠ সহায়ক ইঞ্জিন",
    listenSub: "আপনার নিজের ভাষায় আদালতের নির্দেশ শুনুন",
    playAudioButton: "ভয়েসে শুনুন",
    voiceListening: "আপনার কথা শোনা হচ্ছে...",
    typeQuestionPlaceholder: "এই নথি নিয়ে আপনার প্রশ্ন লিখুন...",

    footerLitigantNote: "বিচারপ্রার্থী সহায়তা ও আইনি সচেতনতা সরঞ্জাম • এটি আইনি পরামর্শ নয়"
  },

  ta: {
    appTitle: "நியாயவாணி",
    pwaReady: "PWA தயார்",
    appSubtitle: "நீதிமன்ற உத்தரவு ஆவண AI & குரல் AI உதவியாளர்",
    languageLabel: "மொழி:",
    installApp: "செயலியை நிறுவுக",
    uploadNew: "புதிய பதிவேற்றம்",
    voiceAi: "வாய்ஸ் AI",
    chatbotTitle: "உரையாடல் உதவியாளர்",

    uploadHeroBadge: "மக்களுக்கான ஆவண மற்றும் குரல் AI",
    uploadHeading: "நீதிமன்ற உத்தரவுகளை உங்கள் மொழியில் உடனடியாகப் புரிந்து கொள்ளுங்கள்",
    uploadSubheading: "எந்தவொரு இந்திய நீதிமன்ற உத்தரவின் புகைப்படம் அல்லது ஸ்கேனைப் பதிவேற்றவும். நியாயவாணி நீதிபதியின் உத்தரவைத் தனியாகப் பிரித்து எளிய தமிழில் விளக்குகிறது.",
    dragDropTitle: "நீதிமன்ற உத்தரவுப் படத்தை இங்கே இழுத்து விடவும், அல்லது",
    browseFiles: "கோப்புகளைத் தேர்ந்தெடுக்கவும்",
    uploadNote: "ஒரு PDF (அதிகபட்சம் 50 பக்கங்கள்) அல்லது நீதிமன்ற உத்தரவின் அதிகபட்சம் 10 JPG/PNG படங்களைப் பதிவேற்றவும்",
    analyzingTitle: "உங்கள் நீதிமன்ற உத்தரவு படித்து பகுப்பாய்வு செய்யப்படுகிறது...",
    analyzingSub: "சட்ட உரையைப் பிரித்தெடுத்து முக்கிய உத்தரவுகளை வகைப்படுத்துகிறது",
    selectLanguageAria: "மொழியைத் தேர்ந்தெடுக்கவும்",
    fileSelected: "பக்கம் / கோப்பு தேர்ந்தெடுக்கப்பட்டது",
    filesSelected: "பக்கங்கள் / கோப்புகள் தேர்ந்தெடுக்கப்பட்டன",
    pdfPagesSelected: "{count} பக்க PDF தேர்ந்தெடுக்கப்பட்டது",
    multiPageReady: "பல பக்கங்கள் தயார்",
    addMoreFiles: "மேலும் படங்களைச் சேர்க்கவும்",
    clearAll: "அனைத்தையும் அழிக்கவும்",
    removePage: "இந்தப் பக்கத்தை அகற்றவும்",
    pageLabel: "பக்கம்",
    uploadTip: "50 பக்கங்கள் வரையிலான PDF சரியான வரிசையில் தானாகப் பிரித்துச் செயலாக்கப்படும். அதிகபட்சம் 10 பக்கப் படங்களையும் தேர்ந்தெடுக்கலாம்.",
    pastePrompt: "அதற்குப் பதிலாக சாதாரண உரையை ஒட்ட வேண்டுமா?",
    expand: "விரிக்கவும்",
    collapse: "சுருக்கவும்",
    pastePlaceholder: "நீதிமன்ற உத்தரவின் உரையை இங்கே ஒட்டவும்...",
    optimizingPages: "விரைவான AI பகுப்பாய்வுக்காகப் பக்கங்கள் தயாராக்கப்படுகின்றன...",
    readUploadedPages: "பதிவேற்றிய {count} நீதிமன்றப் பக்கங்களைப் படிக்கவும்",
    readUploadedDocument: "பதிவேற்றிய நீதிமன்ற உத்தரவைப் படிக்கவும்",
    readCourtDocument: "நீதிமன்ற உத்தரவைப் படிக்கவும்",
    uploadUnsupportedError: "PDF, JPG, JPEG அல்லது PNG நீதிமன்ற ஆவணங்களை மட்டும் பதிவேற்றவும்.",
    uploadPageLimitError: "ஒரு PDF-இல் அதிகபட்சம் 50 பக்கங்கள் அல்லது அதிகபட்சம் 10 பக்கப் படங்களைப் பதிவேற்றவும்.",
    uploadPdfMixError: "ஒரு PDF-ஐ தனியாக அல்லது பல JPG/PNG பக்கப் படங்களை ஒன்றாகப் பதிவேற்றவும்.",
    uploadSizeError: "PDF அல்லது அனைத்துப் பக்கப் படங்களின் மொத்த அளவை 3 MB-க்கு கீழ் வைத்திருக்கவும்.",
    uploadReadError: "தேர்ந்தெடுத்த கோப்புகளில் ஒன்றைப் படிக்க முடியவில்லை. மீண்டும் தேர்ந்தெடுக்கவும்.",
    uploadRequiredError: "நீதிமன்ற உத்தரவின் PDF அல்லது படத்தைப் பதிவேற்றவும், அல்லது அதன் உரையை ஒட்டவும்.",
    recentDocumentsTitle: "சமீபத்திய நீதிமன்ற ஆவணங்கள்",
    recentDocumentsSub: "மீண்டும் பதிவேற்றாமல் செயலாக்கப்பட்ட ஆவணத்தைத் திறக்கவும்",
    openRecentDocument: "சேமித்த ஆவணத்தைத் திறக்கவும்",
    deleteRecentDocument: "சேமித்த ஆவணத்தை நீக்கவும்",
    pauseAudio: "இடைநிறுத்து",
    analysisCompleted: "பகுப்பாய்வு முடிந்தது.",
    analysisFailedError: "நியாயவாணியால் இந்த நீதிமன்ற ஆவணத்தைப் பகுப்பாய்வு செய்ய முடியவில்லை. மீண்டும் முயலுங்கள்.",
    connectionError: "நியாயவாணியால் AI சேவையை அணுக முடியவில்லை. இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயலுங்கள்.",

    operativeDirectionTitle: "நீதிமன்றத்தின் முக்கிய உத்தரவு",
    operativeDirectionSub: "நீதிமன்ற ஆவணத்திலிருந்து நேரடியாக எடுக்கப்பட்ட நீதிபதியின் தீர்ப்பு",
    plainSummaryTitle: "எளிய மொழிச் சுருக்கம்",
    plainSummarySub: "உங்கள் மொழியில் எளிமையான சட்ட விளக்கம்",
    nextStepsTitle: "அத்தியாவசிய அடுத்த கட்ட நடவடிக்கைகள் & காலக்கெடு",
    nextStepsSub: "மனுதாரருக்கான முக்கிய நடவடிக்கைகள்",
    attributionTitle: "பத்தி வாரியான வகைப்பாடு",
    attributionSub: "நீதிமன்ற உத்தரவுகள் மற்றும் வாதங்களின் தெளிவான பிரிப்பு",
    refusalWarningTitle: "எச்சரிக்கை நிலை",
    refusalWarningSub: "ஆவணம் தெளிவாக இல்லை அல்லது உத்தரவு முழுமையடையவில்லை",
    listenAudioButton: "தமிழில் கேட்கவும் (சர்வhorizontal வாய்ஸ்)",
    askVoiceAiButton: "நியாயவாணி குரல் AI-யிடம் கேட்கவும்",
    exportReportButton: "அறிக்கையைப் பதிவிறக்கவும்",

    voiceAiModalTitle: "நியாயவாணி குரல் AI உதவியாளர்",
    voiceAiModalSub: "இந்த நீதிமன்ற உத்தரவைப் பற்றி உங்கள் மொழியில் கேளுங்கள்",
    voiceAiListening: "கேட்கிறது... இப்போது பேசுங்கள்",
    voiceAiClickToSpeak: "பேச தட்டவும்",
    voiceAiStopListening: "நிறுத்து",
    voiceAiSendInput: "அனுப்பு",
    voiceAiInputPlaceholder: "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும் அல்லது பேசவும்...",
    suggestedQuestionsTitle: "பரிந்துரைக்கப்பட்ட கேள்விகள்:",
    suggestedQ1: "நீதிபதி எனக்கு என்ன உத்தரவிட்டுள்ளார்?",
    suggestedQ2: "எனக்கான காலக்கெடு என்ன?",
    suggestedQ3: "என் மனு ஏற்கப்பட்டதா அல்லது நிராகரிக்கப்பட்டதா?",
    suggestedQ4: "என் வழக்கறிஞரிடம் அடுத்து என்ன சொல்ல வேண்டும்?",

    audioPlayerTitle: "குரல் சட்டச் சுருக்கம்",
    audioPlaying: "குரல் ஒலிக்கிறது...",
    audioPaused: "நிறுத்தப்பட்டது",
    audioSpeed: "வேகம்",

    docPreviewTitle: "ஆவணப் படம்",
    expandPhoto: "படத்தைப் பெரிதாக்குக",
    voiceAiTitle: "இந்த ஆவணம் குறித்து கேள்விகள் உள்ளதா?",
    voiceAiSub: "நியாயவாணி குரல் AI-யிடம் பேச கீழே கிளிக் செய்யவும்!",
    listenTitle: "குரல் வாசிப்பு இயந்திரம்",
    listenSub: "நீதிமன்ற உத்தரவை உங்கள் சொந்த மொழியில் கேளுங்கள்",
    playAudioButton: "ஒலியில் கேட்கவும்",
    voiceListening: "உங்கள் குரல் கேட்கப்படுகிறது...",
    typeQuestionPlaceholder: "கேள்வியைக் கேளுங்கள்...",

    footerLitigantNote: "சட்ட விழிப்புணர்வு கருவி • இது சட்ட ஆலோசனை அல்ல"
  },

  te: {
    appTitle: "న్యాయవాణి",
    pwaReady: "PWA సిద్ధంగా ఉంది",
    appSubtitle: "కోర్టు ఆర్డర్ డాక్యుమెంట్ ఇంటెలిజెన్స్ & వాయిస్ AI సహాయకుడు",
    languageLabel: "భాష:",
    installApp: "యాప్‌ను ఇన్‌స్టాల్ చేయండి",
    uploadNew: "కొత్తది అప్‌లోడ్",
    voiceAi: "వాయిస్ AI",
    chatbotTitle: "చాట్‌బాట్",

    uploadHeroBadge: "ప్రజల కోసం పత్రం మరియు వాయిస్ AI",
    uploadHeading: "కోర్టు ఆర్డర్లను మీ భాషలో తక్షణమే అర్థం చేసుకోండి",
    uploadSubheading: "ఏదైనా భారతీయ కోర్టు ఆర్డర్ ఫోటోను అప్‌లోడ్ చేయండి. న్యాయవాణి జడ్జి గారి ఆదేశాలను వేరు చేసి, మీ మాతృభాషలో స్పష్టంగా వినిపిస్తుంది.",
    dragDropTitle: "కోర్టు ఆర్డర్ ఫోటోను ఇక్కడ వేయండి, లేదా",
    browseFiles: "ఫైళ్లను ఎంచుకోండి",
    uploadNote: "ఒక PDF (గరిష్ఠంగా 50 పేజీలు) లేదా కోర్టు ఆదేశానికి సంబంధించిన గరిష్ఠంగా 10 JPG/PNG చిత్రాలను అప్‌లోడ్ చేయండి",
    analyzingTitle: "మీ కోర్టు ఆర్డర్ చదివి విశ్లేషించబడుతోంది...",
    analyzingSub: "చట్టపరమైన పాఠాన్ని సేకరించి ముఖ్య ఆదేశాలను వేరు చేస్తోంది",
    selectLanguageAria: "భాషను ఎంచుకోండి",
    fileSelected: "పేజీ / ఫైల్ ఎంచుకోబడింది",
    filesSelected: "పేజీలు / ఫైళ్లు ఎంచుకోబడ్డాయి",
    pdfPagesSelected: "{count} పేజీల PDF ఎంచుకోబడింది",
    multiPageReady: "బహుళ పేజీలు సిద్ధం",
    addMoreFiles: "మరిన్ని చిత్రాలు జోడించండి",
    clearAll: "అన్నీ తొలగించండి",
    removePage: "ఈ పేజీని తొలగించండి",
    pageLabel: "పేజీ",
    uploadTip: "50 పేజీల వరకు ఉన్న PDF సరైన క్రమంలో స్వయంచాలకంగా భాగాలుగా ప్రాసెస్ అవుతుంది. గరిష్ఠంగా 10 పేజీ చిత్రాలను కూడా ఎంచుకోవచ్చు.",
    pastePrompt: "బదులుగా సాధారణ పాఠ్యాన్ని అతికించాలా?",
    expand: "విస్తరించండి",
    collapse: "మూసివేయండి",
    pastePlaceholder: "కోర్టు ఆదేశం పాఠ్యాన్ని ఇక్కడ అతికించండి...",
    optimizingPages: "వేగవంతమైన AI విశ్లేషణ కోసం పేజీలు సిద్ధం అవుతున్నాయి...",
    readUploadedPages: "అప్‌లోడ్ చేసిన {count} కోర్టు పేజీలను చదవండి",
    readUploadedDocument: "అప్‌లోడ్ చేసిన కోర్టు ఆదేశాన్ని చదవండి",
    readCourtDocument: "కోర్టు ఆదేశాన్ని చదవండి",
    uploadUnsupportedError: "PDF, JPG, JPEG లేదా PNG కోర్టు పత్రాలను మాత్రమే అప్‌లోడ్ చేయండి.",
    uploadPageLimitError: "ఒక PDFలో గరిష్ఠంగా 50 పేజీలు లేదా గరిష్ఠంగా 10 పేజీ చిత్రాలను అప్‌లోడ్ చేయండి.",
    uploadPdfMixError: "ఒక PDFను విడిగా లేదా అనేక JPG/PNG పేజీ చిత్రాలను కలిపి అప్‌లోడ్ చేయండి.",
    uploadSizeError: "PDF లేదా అన్ని పేజీ చిత్రాల మొత్తం పరిమాణాన్ని 3 MB లోపు ఉంచండి.",
    uploadReadError: "ఎంచుకున్న ఫైళ్లలో ఒకదాన్ని చదవలేకపోయాం. దయచేసి మళ్లీ ఎంచుకోండి.",
    uploadRequiredError: "కోర్టు ఆదేశం PDF లేదా చిత్రాన్ని అప్‌లోడ్ చేయండి, లేదా దాని పాఠ్యాన్ని అతికించండి.",
    recentDocumentsTitle: "ఇటీవలి కోర్టు పత్రాలు",
    recentDocumentsSub: "మళ్లీ అప్‌లోడ్ చేయకుండా ప్రాసెస్ చేసిన పత్రాన్ని తెరవండి",
    openRecentDocument: "సేవ్ చేసిన పత్రాన్ని తెరవండి",
    deleteRecentDocument: "సేవ్ చేసిన పత్రాన్ని తొలగించండి",
    pauseAudio: "పాజ్",
    analysisCompleted: "విశ్లేషణ పూర్తయింది.",
    analysisFailedError: "న్యాయవాణి ఈ కోర్టు పత్రాన్ని విశ్లేషించలేకపోయింది. మళ్లీ ప్రయత్నించండి.",
    connectionError: "న్యాయవాణి AI సేవను చేరుకోలేకపోయింది. ఇంటర్నెట్‌ను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",

    operativeDirectionTitle: "కోర్టు ముఖ్య ఆదేశం",
    operativeDirectionSub: "కోర్టు పత్రం నుండి నేరుగా తీసుకోబడిన తీర్పు",
    plainSummaryTitle: "సులభమైన భాషలో సారాంశం",
    plainSummarySub: "మీ భాషలో సులభమైన చట్టపరమైన వివరణ",
    nextStepsTitle: "తప్పనిసరి తదుపరి చర్యలు & గడువు",
    nextStepsSub: "పిటిషనర్ చేయవలసిన ముఖ్యమైన పనులు",
    attributionTitle: "పారాగ్రాఫ్ వారీగా వర్గీకరణ",
    attributionSub: "కోర్టు ఆదేశాలు మరియు వాదనల స్పష్టమైన విభజన",
    refusalWarningTitle: "హెచ్చరిక స్థితి",
    refusalWarningSub: "డాక్యుమెంట్ స్పష్టంగా లేదు లేదా ఆర్డర్ అసంపూర్ణంగా ఉంది",
    listenAudioButton: "తెలుగులో వినండి",
    askVoiceAiButton: "న్యాయవాణి వాయిస్ AI ని అడగండి",
    exportReportButton: "రిపోర్ట్ డౌన్‌లోడ్ చేయండి",

    voiceAiModalTitle: "న్యాయవాణి వాయిస్ AI సహాయకుడు",
    voiceAiModalSub: "ఈ కోర్టు ఆర్డర్ గురించి మీ భాషలో ఏ ప్రశ్నైనా అడగండి",
    voiceAiListening: "వింటోంది... ఇప్పుడు మాట్లాడండి",
    voiceAiClickToSpeak: "మాట్లాడటానికి నొక్కండి",
    voiceAiStopListening: "ఆపు",
    voiceAiSendInput: "పంపు",
    voiceAiInputPlaceholder: "మీ ప్రశ్నను టైప్ చేయండి లేదా మాట్లాడండి...",
    suggestedQuestionsTitle: "సూచించబడిన ప్రశ్నలు:",
    suggestedQ1: "జడ్జి గారు నాకు ఖచ్చితంగా ఏం ఆదేశించారు?",
    suggestedQ2: "నాకు చివరి గడువు ఎప్పుడు?",
    suggestedQ3: "నా దరఖాస్తు ఆమోదించబడిందా లేదా తిరస్కరించబడిందా?",
    suggestedQ4: "నేను నా లాయర్ గారికి తర్వాత ఏం చెప్పాలి?",

    audioPlayerTitle: "వాయిస్ చట్టపరమైన సారాంశం",
    audioPlaying: "వాయిస్ ప్లే అవుతోంది...",
    audioPaused: "ఆపబడింది",
    audioSpeed: "వేగం",

    docPreviewTitle: "డాక్యుమెంట్ థంబ్‌నెయిల్",
    expandPhoto: "ఫోటోను పెద్దది చేయండి",
    voiceAiTitle: "ఈ పత్రం గురించి ప్రశ్నలు ఉన్నాయా?",
    voiceAiSub: "న్యాయవాణి వాయిస్ AI తో మాట్లాడటానికి క్లిక్ చేయండి!",
    listenTitle: "వాయిస్ చదివి వినిపించే ఇంజిన్",
    listenSub: "మీ మాతృభాషలో ఆర్డర్‌ను వినండి",
    playAudioButton: "వినిపించు",
    voiceListening: "మీ వాయిస్ వినబడుతోంది...",
    typeQuestionPlaceholder: "ప్రశ్నను అడగండి...",

    footerLitigantNote: "న్యాయ అవగాహన సాధనం • ఇది చట్టపరమైన సలహా కాదు"
  },

  mr: {
    appTitle: "न्यायवाणी",
    pwaReady: "PWA तयार",
    appSubtitle: "कोर्ट ऑर्डर दस्तऐवज बुद्धिमत्ता आणि व्हॉइस AI सहाय्यक",
    languageLabel: "भाषा:",
    installApp: "अ‍ॅप इंस्टॉल करा",
    uploadNew: "नवीन अपलोड",
    voiceAi: "व्हॉइस AI",
    chatbotTitle: "चॅटबॉट",

    uploadHeroBadge: "नागरिकांसाठी दस्तऐवज आणि व्हॉइस AI",
    uploadHeading: "कोर्टाचे आदेश तुमच्या भाषेत त्वरित समजून घ्या",
    uploadSubheading: "कोणत्याही भारतीय कोर्टाच्या आदेशाचा फोटो किंवा स्कॅन अपलोड करा. न्यायवाणी न्यायाधीशांचे आदेश वेगळे करते आणि सोप्या मराठीत सांगते.",
    dragDropTitle: "कोर्टाच्या आदेशाचा फोटो येथे टाका, किंवा",
    browseFiles: "फायली निवडा",
    uploadNote: "एक PDF (जास्तीत जास्त 50 पाने) किंवा न्यायालयीन आदेशाच्या जास्तीत जास्त 10 JPG/PNG प्रतिमा अपलोड करा",
    analyzingTitle: "तुमचा न्यायालयीन आदेश वाचून विश्लेषण केले जात आहे...",
    analyzingSub: "कायदेशीर मजकूर काढून मुख्य आदेश वेगळे केले जात आहेत",
    selectLanguageAria: "भाषा निवडा",
    fileSelected: "पान / फाइल निवडली",
    filesSelected: "पाने / फाइल्स निवडल्या",
    pdfPagesSelected: "{count} पानांची PDF निवडली",
    multiPageReady: "अनेक पाने तयार",
    addMoreFiles: "आणखी प्रतिमा जोडा",
    clearAll: "सर्व काढा",
    removePage: "हे पान काढा",
    pageLabel: "पान",
    uploadTip: "50 पानांपर्यंतची PDF योग्य क्रमाने आपोआप भागांमध्ये प्रक्रिया केली जाते. जास्तीत जास्त 10 पानांच्या प्रतिमाही निवडू शकता.",
    pastePrompt: "त्याऐवजी साधा मजकूर पेस्ट करायचा आहे?",
    expand: "उघडा",
    collapse: "बंद करा",
    pastePlaceholder: "न्यायालयीन आदेशाचा मजकूर येथे पेस्ट करा...",
    optimizingPages: "जलद AI विश्लेषणासाठी पाने तयार केली जात आहेत...",
    readUploadedPages: "अपलोड केलेली {count} न्यायालयीन पाने वाचा",
    readUploadedDocument: "अपलोड केलेला न्यायालयीन आदेश वाचा",
    readCourtDocument: "न्यायालयीन आदेश वाचा",
    uploadUnsupportedError: "फक्त PDF, JPG, JPEG किंवा PNG न्यायालयीन कागदपत्रे अपलोड करा.",
    uploadPageLimitError: "एका PDFमध्ये जास्तीत जास्त 50 पाने किंवा जास्तीत जास्त 10 पानांच्या प्रतिमा अपलोड करा.",
    uploadPdfMixError: "एक PDF स्वतंत्रपणे किंवा अनेक JPG/PNG पानांच्या प्रतिमा एकत्र अपलोड करा.",
    uploadSizeError: "PDF किंवा सर्व पानांच्या प्रतिमांचा एकूण आकार 3 MB पेक्षा कमी ठेवा.",
    uploadReadError: "निवडलेल्या फाइल्सपैकी एक वाचता आली नाही. कृपया ती पुन्हा निवडा.",
    uploadRequiredError: "न्यायालयीन आदेशाची PDF किंवा प्रतिमा अपलोड करा, किंवा त्याचा मजकूर पेस्ट करा.",
    recentDocumentsTitle: "अलीकडील न्यायालयीन दस्तऐवज",
    recentDocumentsSub: "पुन्हा अपलोड न करता प्रक्रिया केलेला दस्तऐवज उघडा",
    openRecentDocument: "जतन केलेला दस्तऐवज उघडा",
    deleteRecentDocument: "जतन केलेला दस्तऐवज हटवा",
    pauseAudio: "थांबवा",
    analysisCompleted: "विश्लेषण पूर्ण झाले.",
    analysisFailedError: "न्यायवाणीला या न्यायालयीन दस्तऐवजाचे विश्लेषण करता आले नाही. पुन्हा प्रयत्न करा.",
    connectionError: "न्यायवाणी AI सेवेशी जोडू शकली नाही. इंटरनेट तपासून पुन्हा प्रयत्न करा.",

    operativeDirectionTitle: "कोर्टाचा मुख्य आदेश (ऑपरेटिव्ह डायरेक्शन)",
    operativeDirectionSub: "कोर्टाच्या निकालातून थेट काढलेला न्यायाधीशांचा आदेश",
    plainSummaryTitle: "सोप्या भाषेतील सारांश",
    plainSummarySub: "तुमच्या भाषेत सोपे कायदेशीर स्पष्टीकरण",
    nextStepsTitle: "महत्त्वाच्या पुढील पायऱ्या आणि मुदत",
    nextStepsSub: "नागरिकांसाठी आवश्यक कृती",
    attributionTitle: "परिच्छेदानुसार वर्गीकरण",
    attributionSub: "कोर्टाचे आदेश आणि दोन्ही बाजूंच्या युक्तिवादांचे स्पष्ट वर्गीकरण",
    refusalWarningTitle: "सावधानता आणि नकार स्थिती",
    refusalWarningSub: "दस्तऐवज अतिशय अस्पष्ट आहे किंवा आदेश अपूर्ण आहे",
    listenAudioButton: "मराठीत ऐका",
    askVoiceAiButton: "न्यायवाणी व्हॉइस AI ला विचारा",
    exportReportButton: "अहवाल डाउनलोड करा",

    voiceAiModalTitle: "न्यायवाणी व्हॉइस AI सहाय्यक",
    voiceAiModalSub: "या आदेशाबद्दल तुमच्या भाषेत कोणताही प्रश्न विचारा",
    voiceAiListening: "ऐकत आहे... आता बोला",
    voiceAiClickToSpeak: "बोलण्यासाठी दाबा",
    voiceAiStopListening: "थांबा",
    voiceAiSendInput: "पाठवा",
    voiceAiInputPlaceholder: "तुमचा प्रश्न टाईप करा किंवा बोला...",
    suggestedQuestionsTitle: "सुचवलेले प्रश्न:",
    suggestedQ1: "न्यायाधीशांनी माझ्यासाठी नक्की काय आदेश दिला आहे?",
    suggestedQ2: "माझ्यासाठी अंतिम मुदत काय आहे?",
    suggestedQ3: "माझा अर्ज मंजूर झाला की फेटाळला गेला?",
    suggestedQ4: "मी माझ्या वकिलांना पुढे काय सांगितले पाहिजे?",

    audioPlayerTitle: "कायदेशीर व्हॉइस सारांश",
    audioPlaying: "आवाजातील सारांश सुरू आहे...",
    audioPaused: "थांबवले",
    audioSpeed: "वेग",

    docPreviewTitle: "दस्तऐवजाची छोटी प्रत",
    expandPhoto: "फोटो मोठा करा",
    voiceAiTitle: "या दस्तऐवजाबद्दल प्रश्न आहेत का?",
    voiceAiSub: "न्यायवाणी व्हॉइस AI सोबत थेट बोलण्यासाठी खाली क्लिक करा!",
    listenTitle: "वाचून दाखवणारे व्हॉइस इंजिन",
    listenSub: "तुमच्या मातृभाषेत कोर्टाचा आदेश ऐका",
    playAudioButton: "ऐका",
    voiceListening: "तुमचा आवाज ऐकला जात आहे...",
    typeQuestionPlaceholder: "प्रश्न विचारा...",

    footerLitigantNote: "कायदेशीर साक्षरता साधन • कायदेशीर सल्ला नाही"
  },

  gu: {
    appTitle: "ન્યાયવાણી",
    pwaReady: "PWA તૈયાર",
    appSubtitle: "કોર્ટ ઓર્ડર ડોક્યુમેન્ટ ઇન્ટેલિજન્સ અને વોઇસ AI સહાયક",
    languageLabel: "ભાષા:",
    installApp: "એપ ઇન્સ્ટોલ કરો",
    uploadNew: "નવું અપલોડ",
    voiceAi: "વોઇસ AI",
    chatbotTitle: "ચેટબોટ",

    uploadHeroBadge: "નાગરિકો માટે દસ્તાવેજ અને વોઇસ AI",
    uploadHeading: "કોર્ટના ઓર્ડરને તમારી ભાષામાં તરત જ સમજો",
    uploadSubheading: "કોઈપણ ભારતીય કોર્ટના ઓર્ડરનો ફોટો અથવા સ્કેન અપલોડ કરો. ન્યાયવાણી જજ સાહેબના આદેશને અલગ કરે છે અને સરળ ગુજરાતીમાં બોલીને સંભળાવે છે.",
    dragDropTitle: "કોર્ટ ઓર્ડરનો ફોટો અહીં લાવો, અથવા",
    browseFiles: "ફાઇલો પસંદ કરો",
    uploadNote: "એક PDF (વધુમાં વધુ 50 પાનાં) અથવા કોર્ટના આદેશની વધુમાં વધુ 10 JPG/PNG છબીઓ અપલોડ કરો",
    analyzingTitle: "તમારા કોર્ટના ઓર્ડરને વાંચીને વિશ્લેષણ કરવામાં આવી રહ્યું છે...",
    analyzingSub: "કાનૂની લખાણ અને મુખ્ય આદેશ અલગ કરવામાં આવી રહ્યા છે",
    selectLanguageAria: "ભાષા પસંદ કરો",
    fileSelected: "પાનું / ફાઇલ પસંદ થઈ",
    filesSelected: "પાનાં / ફાઇલો પસંદ થઈ",
    pdfPagesSelected: "{count} પાનાંની PDF પસંદ થઈ",
    multiPageReady: "બહુવિધ પાનાં તૈયાર",
    addMoreFiles: "વધુ છબીઓ ઉમેરો",
    clearAll: "બધું દૂર કરો",
    removePage: "આ પાનું દૂર કરો",
    pageLabel: "પાનું",
    uploadTip: "50 પાનાં સુધીની PDF યોગ્ય ક્રમમાં આપમેળે ભાગોમાં પ્રોસેસ થાય છે. વધુમાં વધુ 10 પાનાંની છબીઓ પણ પસંદ કરી શકો છો.",
    pastePrompt: "તેના બદલે સાદું લખાણ પેસ્ટ કરવું છે?",
    expand: "ખોલો",
    collapse: "બંધ કરો",
    pastePlaceholder: "કોર્ટના આદેશનું લખાણ અહીં પેસ્ટ કરો...",
    optimizingPages: "ઝડપી AI વિશ્લેષણ માટે પાનાં તૈયાર થઈ રહ્યાં છે...",
    readUploadedPages: "અપલોડ કરેલા {count} કોર્ટ પાનાં વાંચો",
    readUploadedDocument: "અપલોડ કરેલો કોર્ટ આદેશ વાંચો",
    readCourtDocument: "કોર્ટ આદેશ વાંચો",
    uploadUnsupportedError: "ફક્ત PDF, JPG, JPEG અથવા PNG કોર્ટ દસ્તાવેજો અપલોડ કરો.",
    uploadPageLimitError: "એક PDFમાં વધુમાં વધુ 50 પાનાં અથવા વધુમાં વધુ 10 પાનાંની છબીઓ અપલોડ કરો.",
    uploadPdfMixError: "એક PDF અલગથી અથવા અનેક JPG/PNG પાનાંની છબીઓ એકસાથે અપલોડ કરો.",
    uploadSizeError: "PDF અથવા તમામ પાનાંની છબીઓનું કુલ કદ 3 MBથી ઓછું રાખો.",
    uploadReadError: "પસંદ કરેલી ફાઇલોમાંથી એક વાંચી શકાઈ નથી. કૃપા કરીને ફરી પસંદ કરો.",
    uploadRequiredError: "કોર્ટના આદેશની PDF અથવા છબી અપલોડ કરો, અથવા તેનું લખાણ પેસ્ટ કરો.",
    recentDocumentsTitle: "તાજેતરના કોર્ટ દસ્તાવેજો",
    recentDocumentsSub: "ફરી અપલોડ કર્યા વિના પ્રોસેસ કરેલો દસ્તાવેજ ખોલો",
    openRecentDocument: "સાચવેલો દસ્તાવેજ ખોલો",
    deleteRecentDocument: "સાચવેલો દસ્તાવેજ કાઢી નાખો",
    pauseAudio: "થોભાવો",
    analysisCompleted: "વિશ્લેષણ પૂર્ણ થયું.",
    analysisFailedError: "ન્યાયવાણી આ કોર્ટ દસ્તાવેજનું વિશ્લેષણ કરી શક્યું નથી. ફરી પ્રયાસ કરો.",
    connectionError: "ન્યાયવાણી AI સેવા સુધી પહોંચી શકી નથી. ઇન્ટરનેટ તપાસીને ફરી પ્રયાસ કરો.",

    operativeDirectionTitle: "કોર્ટનો મુખ્ય આદેશ (ઓપરેટિવ ડાયરેક્શન)",
    operativeDirectionSub: "કોર્ટના ચુકાદામાંથી સીધો કાઢવામાં આવેલો જજ સાહેબનો ઓર્ડર",
    plainSummaryTitle: "સરળ ભાષામાં સારાંશ",
    plainSummarySub: "તમારી પસંદ કરેલી ભાષામાં સરળ કાનૂની સમજૂતી",
    nextStepsTitle: "જરૂરી આગામી પગલાં અને સમયમર્યાદા",
    nextStepsSub: "નાગરિક માટે મહત્વપૂર્ણ કાર્યો",
    attributionTitle: "પેરા-બાય-પેરા વર્ગીકરણ",
    attributionSub: "કોર્ટના આદેશો અને બંને પક્ષોની દલીલોનું સ્પષ્ટ વિભાજન",
    refusalWarningTitle: "સાવચેતી અને અસ્વીકાર સ્થિતિ",
    refusalWarningSub: "દસ્તાવેજ ખૂબ ઝાંખો છે અથવા ઓર્ડર અધૂરો છે",
    listenAudioButton: "ગુજરાતીમાં સાંભળો",
    askVoiceAiButton: "ન્યાયવાણી વોઇસ AI ને પૂછો",
    exportReportButton: "રિપોર્ટ ડાઉનલોડ કરો",

    voiceAiModalTitle: "ન્યાયવાણી વોઇસ AI સહાયક",
    voiceAiModalSub: "આ કોર્ટ ઓર્ડર વિશે તમારી ભાષામાં પ્રશ્ન પૂછો",
    voiceAiListening: "સાંભળી રહ્યું છે... હવે બોલો",
    voiceAiClickToSpeak: "બોલવા માટે ટેપ કરો",
    voiceAiStopListening: "અટકાવો",
    voiceAiSendInput: "મોકલો",
    voiceAiInputPlaceholder: "તમારો પ્રશ્ન લખો અથવા બોલો...",
    suggestedQuestionsTitle: "સુચવેલા પ્રશ્નો:",
    suggestedQ1: "જજ સાહેબે મારા માટે શું આદેશ આપ્યો છે?",
    suggestedQ2: "મારા માટે છેલ્લી તારીખ (ડેડલાઇન) શું છે?",
    suggestedQ3: "મારી અરજી મંજૂર થઈ કે ના મંજૂર?",
    suggestedQ4: "મારે મારા વકીલ સાહેબને આગળ શું કહેવું જોઈએ?",

    audioPlayerTitle: "વોઇસ કાનૂની સારાંશ",
    audioPlaying: "અવાજમાં સારાંશ ચાલુ છે...",
    audioPaused: "અટકાવેલું",
    audioSpeed: "ઝડપ",

    docPreviewTitle: "દસ્તાવેજની નાની છબી",
    expandPhoto: "ફોટો મોટો કરો",
    voiceAiTitle: "આ દસ્તાવેજ વિશે પ્રશ્નો છે?",
    voiceAiSub: "ન્યાયવાણી વોઇસ AI સાથે વાત કરવા ક્લિક કરો!",
    listenTitle: "અવાજમાં વાંચી સંભળાવતું એન્જિન",
    listenSub: "તમારી માતૃભાષામાં ઓર્ડર સાંભળો",
    playAudioButton: "સાંભળો",
    voiceListening: "તમારો અવાજ સંભળાઈ રહ્યો છે...",
    typeQuestionPlaceholder: "પ્રશ્ન પૂછો...",

    footerLitigantNote: "નાગરિક સહાયતા અને કાનૂની જાગૃતિ સાધન • કાનૂની સલાહ નથી"
  },

  pa: {
    appTitle: "ਨਿਆਇਵਾਣੀ",
    pwaReady: "PWA ਤਿਆਰ",
    appSubtitle: "ਅਦਾਲਤੀ ਹੁਕਮ ਦਸਤਾਵੇਜ਼ ਬੁੱਧੀ ਅਤੇ ਆਵਾਜ਼ AI ਸਹਾਇਕ",
    languageLabel: "ਭਾਸ਼ਾ:",
    installApp: "ਐਪ ਇੰਸਟਾਲ ਕਰੋ",
    uploadNew: "ਨਵਾਂ ਅੱਪਲੋਡ",
    voiceAi: "ਵੋਇਸ AI",
    chatbotTitle: "ਚੈਟਬੋਟ",

    uploadHeroBadge: "ਨਾਗਰਿਕਾਂ ਲਈ ਦਸਤਾਵੇਜ਼ ਅਤੇ ਵੋਇਸ AI",
    uploadHeading: "ਅਦਾਲਤ ਦੇ ਹੁਕਮ ਨੂੰ ਆਪਣੀ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਤੁਰੰਤ ਸਮਝੋ",
    uploadSubheading: "ਕਿਸੇ ਵੀ ਭਾਰਤੀ ਅਦਾਲਤ ਦੇ ਹੁਕਮ ਦੀ ਫੋਟੋ ਜਾਂ ਸਕੈਨ ਅੱਪਲੋਡ ਕਰੋ। ਨਿਆਇਵਾਣੀ ਜੱਜ ਸਾਹਿਬ ਦੇ ਫੈਸਲੇ ਨੂੰ ਅਲੱਗ ਕਰਕੇ ਸਰਲ ਪੰਜਾਬੀ ਵਿੱਚ ਬੋਲ ਕੇ ਸੁਣਾਉਂਦੀ ਹੈ।",
    dragDropTitle: "ਅਦਾਲਤੀ ਹੁਕਮ ਦੀ ਤਸਵੀਰ ਇੱਥੇ ਖਿੱਚੋ, ਜਾਂ",
    browseFiles: "ਫਾਈਲਾਂ ਚੁਣੋ",
    uploadNote: "ਇੱਕ PDF (ਵੱਧ ਤੋਂ ਵੱਧ 50 ਪੰਨੇ) ਜਾਂ ਅਦਾਲਤੀ ਹੁਕਮ ਦੀਆਂ ਵੱਧ ਤੋਂ ਵੱਧ 10 JPG/PNG ਤਸਵੀਰਾਂ ਅੱਪਲੋਡ ਕਰੋ",
    analyzingTitle: "ਤੁਹਾਡੇ ਅਦਾਲਤੀ ਹੁਕਮ ਨੂੰ ਪੜ੍ਹ ਕੇ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    analyzingSub: "ਕਾਨੂੰਨੀ ਲਿਖਤ ਅਤੇ ਮੁੱਖ ਆਦੇਸ਼ ਅਲੱਗ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ",
    selectLanguageAria: "ਭਾਸ਼ਾ ਚੁਣੋ",
    fileSelected: "ਪੰਨਾ / ਫਾਈਲ ਚੁਣੀ ਗਈ",
    filesSelected: "ਪੰਨੇ / ਫਾਈਲਾਂ ਚੁਣੀਆਂ ਗਈਆਂ",
    pdfPagesSelected: "{count} ਪੰਨਿਆਂ ਦੀ PDF ਚੁਣੀ ਗਈ",
    multiPageReady: "ਕਈ ਪੰਨੇ ਤਿਆਰ",
    addMoreFiles: "ਹੋਰ ਤਸਵੀਰਾਂ ਜੋੜੋ",
    clearAll: "ਸਭ ਹਟਾਓ",
    removePage: "ਇਹ ਪੰਨਾ ਹਟਾਓ",
    pageLabel: "ਪੰਨਾ",
    uploadTip: "50 ਪੰਨਿਆਂ ਤੱਕ ਦੀ PDF ਸਹੀ ਕ੍ਰਮ ਵਿੱਚ ਆਪਣੇ ਆਪ ਹਿੱਸਿਆਂ ਵਿੱਚ ਪ੍ਰੋਸੈਸ ਹੁੰਦੀ ਹੈ। ਵੱਧ ਤੋਂ ਵੱਧ 10 ਪੰਨਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਵੀ ਚੁਣ ਸਕਦੇ ਹੋ।",
    pastePrompt: "ਇਸ ਦੀ ਥਾਂ ਸਧਾਰਨ ਲਿਖਤ ਪੇਸਟ ਕਰਨੀ ਹੈ?",
    expand: "ਖੋਲ੍ਹੋ",
    collapse: "ਬੰਦ ਕਰੋ",
    pastePlaceholder: "ਅਦਾਲਤੀ ਹੁਕਮ ਦੀ ਲਿਖਤ ਇੱਥੇ ਪੇਸਟ ਕਰੋ...",
    optimizingPages: "ਤੇਜ਼ AI ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਪੰਨੇ ਤਿਆਰ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ...",
    readUploadedPages: "ਅੱਪਲੋਡ ਕੀਤੇ {count} ਅਦਾਲਤੀ ਪੰਨੇ ਪੜ੍ਹੋ",
    readUploadedDocument: "ਅੱਪਲੋਡ ਕੀਤਾ ਅਦਾਲਤੀ ਹੁਕਮ ਪੜ੍ਹੋ",
    readCourtDocument: "ਅਦਾਲਤੀ ਹੁਕਮ ਪੜ੍ਹੋ",
    uploadUnsupportedError: "ਸਿਰਫ਼ PDF, JPG, JPEG ਜਾਂ PNG ਅਦਾਲਤੀ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ।",
    uploadPageLimitError: "ਇੱਕ PDF ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ 50 ਪੰਨੇ ਜਾਂ ਵੱਧ ਤੋਂ ਵੱਧ 10 ਪੰਨਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅੱਪਲੋਡ ਕਰੋ।",
    uploadPdfMixError: "ਇੱਕ PDF ਅਲੱਗ ਜਾਂ ਕਈ JPG/PNG ਪੰਨਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਇਕੱਠੀਆਂ ਅੱਪਲੋਡ ਕਰੋ।",
    uploadSizeError: "PDF ਜਾਂ ਸਾਰੇ ਪੰਨਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਦਾ ਕੁੱਲ ਆਕਾਰ 3 MB ਤੋਂ ਘੱਟ ਰੱਖੋ।",
    uploadReadError: "ਚੁਣੀਆਂ ਫਾਈਲਾਂ ਵਿੱਚੋਂ ਇੱਕ ਪੜ੍ਹੀ ਨਹੀਂ ਜਾ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਮੁੜ ਚੁਣੋ।",
    uploadRequiredError: "ਅਦਾਲਤੀ ਹੁਕਮ ਦੀ PDF ਜਾਂ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ, ਜਾਂ ਉਸ ਦੀ ਲਿਖਤ ਪੇਸਟ ਕਰੋ।",
    recentDocumentsTitle: "ਹਾਲੀਆ ਅਦਾਲਤੀ ਦਸਤਾਵੇਜ਼",
    recentDocumentsSub: "ਮੁੜ ਅੱਪਲੋਡ ਕੀਤੇ ਬਿਨਾਂ ਪ੍ਰੋਸੈਸ ਕੀਤਾ ਦਸਤਾਵੇਜ਼ ਖੋਲ੍ਹੋ",
    openRecentDocument: "ਸੰਭਾਲਿਆ ਦਸਤਾਵੇਜ਼ ਖੋਲ੍ਹੋ",
    deleteRecentDocument: "ਸੰਭਾਲਿਆ ਦਸਤਾਵੇਜ਼ ਮਿਟਾਓ",
    pauseAudio: "ਰੋਕੋ",
    analysisCompleted: "ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ ਹੋਇਆ।",
    analysisFailedError: "ਨਿਆਇਵਾਣੀ ਇਸ ਅਦਾਲਤੀ ਦਸਤਾਵੇਜ਼ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਨਹੀਂ ਕਰ ਸਕੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    connectionError: "ਨਿਆਇਵਾਣੀ AI ਸੇਵਾ ਨਾਲ ਜੁੜ ਨਹੀਂ ਸਕੀ। ਇੰਟਰਨੈੱਟ ਜਾਂਚ ਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

    operativeDirectionTitle: "ਅਦਾਲਤ ਦਾ ਮੁੱਖ ਹੁਕਮ (ਓਪਰੇਟਿਵ ਡਾਇਰੈਕਸ਼ਨ)",
    operativeDirectionSub: "ਅਦਾਲਤ ਦੇ ਫੈਸਲੇ ਤੋਂ ਸਿੱਧਾ ਕੱਢਿਆ ਗਿਆ ਜੱਜ ਸਾਹਿਬ ਦਾ ਹੁਕਮ",
    plainSummaryTitle: "ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਾਰਾਂਸ਼",
    plainSummarySub: "ਤੁਹਾਡੀ ਚੁਣੀ ਹੋਈ ਭਾਸ਼ਾ ਵਿੱਚ ਸਰਲ ਕਾਨੂੰਨੀ ਵਿਆਖਿਆ",
    nextStepsTitle: "ਜ਼ਰੂਰੀ ਅਗਲੇ ਕਦਮ ਅਤੇ ਸਮਾਂ ਸੀਮਾ",
    nextStepsSub: "ਨਾਗਰਿਕ ਲਈ ਮਹੱਤਵਪੂਰਨ ਕੰਮ",
    attributionTitle: "ਪੈਰਾ-ਬਾਈ-ਪੈਰਾ ਵਰਗੀਕਰਨ",
    attributionSub: "ਅਦਾਲਤ ਦੇ ਹੁਕਮਾਂ ਅਤੇ ਦੋਵਾਂ ਧਿਰਾਂ ਦੀਆਂ ਦਲੀਲਾਂ ਦਾ ਸਪੱਸ਼ਟ ਵਰਗੀਕਰਨ",
    refusalWarningTitle: "ਸਾਵਧਾਨੀ ਅਤੇ ਅਸਵੀਕਾਰ ਸਥਿਤੀ",
    refusalWarningSub: "ਦਸਤਾਵੇਜ਼ ਬਹੁਤ ਧੁੰਦਲਾ ਹੈ ਜਾਂ ਹੁਕਮ ਅਧੂਰਾ ਹੈ",
    listenAudioButton: "ਪੰਜਾਬੀ ਵਿੱਚ ਸੁਣੋ",
    askVoiceAiButton: "ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਨੂੰ ਪੁੱਛੋ",
    exportReportButton: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",

    voiceAiModalTitle: "ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਸਹਾਇਕ",
    voiceAiModalSub: "ਇਸ ਅਦਾਲਤੀ ਹੁਕਮ ਬਾਰੇ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪ੍ਰਸ਼ਨ ਪੁੱਛੋ",
    voiceAiListening: "ਸੁਣ ਰਿਹਾ ਹੈ... ਹੁਣ ਬੋਲੋ",
    voiceAiClickToSpeak: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ",
    voiceAiStopListening: "ਰੋਕੋ",
    voiceAiSendInput: "ਭੇਜੋ",
    voiceAiInputPlaceholder: "ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ ਜਾਂ ਬੋਲੋ...",
    suggestedQuestionsTitle: "ਸੁਝਾਏ ਗਏ ਪ੍ਰਸ਼ਨ:",
    suggestedQ1: "ਜੱਜ ਸਾਹਿਬ ਨੇ ਮੇਰੇ ਲਈ ਕੀ ਹੁਕਮ ਦਿੱਤਾ ਹੈ?",
    suggestedQ2: "ਮੇਰੇ ਲਈ ਅਗਲੀ ਤਾਰੀਖ (ਡੇਡਲਾਈਨ) ਕੀ ਹੈ?",
    suggestedQ3: "ਮੇਰੀ ਅਰਜ਼ੀ ਮਨਜ਼ੂਰ ਹੋਈ ਜਾਂ ਨਾਮਨਜ਼ੂਰ?",
    suggestedQ4: "ਮੈਨੂੰ ਆਪਣੇ ਵਕੀਲ ਸਾਹਿਬ ਨਾਲ ਅੱਗੇ ਕੀ ਗੱਲ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ?",

    audioPlayerTitle: "ਵੋਇਸ ਕਾਨੂੰਨੀ ਸਾਰਾਂਸ਼",
    audioPlaying: "ਆਵਾਜ਼ ਵਿੱਚ ਸਾਰ ਚੱਲ ਰਿਹਾ ਹੈ...",
    audioPaused: "ਰੁਕਿਆ ਹੋਇਆ",
    audioSpeed: "ਗਤੀ",

    docPreviewTitle: "ਦਸਤਾਵੇਜ਼ ਦੀ ਫੋਟੋ",
    expandPhoto: "ਫੋਟੋ ਵੱਡੀ ਕਰੋ",
    voiceAiTitle: "ਕੀ ਇਸ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਕੋਈ ਪ੍ਰਸ਼ਨ ਹੈ?",
    voiceAiSub: "ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਨਾਲ ਸਿੱਧਾ ਗੱਲ ਕਰਨ ਲਈ ਹੇਠਾਂ ਕਲਿੱਕ ਕਰੋ!",
    listenTitle: "ਆਵਾਜ਼ ਵਿੱਚ ਪੜ੍ਹ ਕੇ ਸੁਣਾਉਣ ਵਾਲਾ ਇੰਜਣ",
    listenSub: "ਆਪਣੇ ਅਦਾਲਤੀ ਹੁਕਮ ਨੂੰ ਆਪਣੀ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਸੁਣੋ",
    playAudioButton: "ਸੁਣੋ",
    voiceListening: "ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸੁਣੀ ਜਾ ਰਹੀ ਹੈ...",
    typeQuestionPlaceholder: "ਪ੍ਰਸ਼ਨ ਪੁੱਛੋ...",

    footerLitigantNote: "ਨਾਗਰਿਕ ਸਹਾਇਤਾ ਅਤੇ ਕਾਨੂੰਨੀ ਸਾਖਰਤਾ ਟੂਲ • ਇਹ ਕਾਨੂੰਨੀ ਸਲਾਹ ਨਹੀਂ ਹੈ"
  }
};

export function getTranslation(lang: string | SupportedLanguage): TranslationDictionary {
  return TRANSLATIONS[lang as SupportedLanguage] || TRANSLATIONS.hi;
}
