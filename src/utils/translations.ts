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

  // Upload Screen
  uploadHeroBadge: string;
  uploadHeading: string;
  uploadSubheading: string;
  dragDropTitle: string;
  browseFiles: string;
  takePhotoButton: string;
  uploadNote: string;
  sampleCasesTitle: string;
  sampleCasesSub: string;
  analyzingTitle: string;
  analyzingSub: string;

  // Result View & Sections
  backToUpload: string;
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

  // Filter & Search
  searchParagraphsPlaceholder: string;
  filterAll: string;
  filterCourtDirection: string;
  filterPetitioner: string;
  filterRespondent: string;
  filterRecital: string;
  filterRejected: string;

  // Attribution Badges
  catCourtDirection: string;
  catPetitioner: string;
  catRespondent: string;
  catRecital: string;
  catRejected: string;

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

    uploadHeroBadge: "Sarvam Doc AI & Voice AI Engine for Litigants",
    uploadHeading: "Understand Court Orders Instantly in Your Language",
    uploadSubheading: "Upload any Indian court order photo or scan. Sarvam Doc AI isolates judge directions, separates petitioner vs respondent arguments, and speaks in plain local language.",
    dragDropTitle: "Drag & Drop court order picture here, or",
    browseFiles: "browse files",
    takePhotoButton: "Take Photo with Phone Camera",
    uploadNote: "Supports photocopies, phone camera photos, scanned pages (JPG, PNG, WEBP)",
    sampleCasesTitle: "Or Try Benchmark Real Court Orders (Kanpur, High Courts & District Courts):",
    sampleCasesSub: "Select a sample case to see instant attribution & judge direction isolation",
    analyzingTitle: "Processing Court Order with Sarvam Doc AI...",
    analyzingSub: "Extracting legal text, tagging paragraph provenance, and isolating operative directions",

    backToUpload: "Back to Upload",
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
    listenAudioButton: "Listen in Local Language (Sarvam Voice)",
    askVoiceAiButton: "Ask NyayVaani Voice AI",
    exportReportButton: "Download Litigant 1-Pager Report",

    searchParagraphsPlaceholder: "Search document text or speaker...",
    filterAll: "All Paragraphs",
    filterCourtDirection: "Court Directions Only",
    filterPetitioner: "Petitioner Claims",
    filterRespondent: "Respondent Claims",
    filterRecital: "Proceedings / Recital",
    filterRejected: "Rejected Claims",

    catCourtDirection: "Court Direction",
    catPetitioner: "Petitioner Submission",
    catRespondent: "Respondent Submission",
    catRecital: "Recital / Proceedings",
    catRejected: "Rejected Claim",

    voiceAiModalTitle: "NyayVaani Voice AI Assistant (Sarvam Samvaad)",
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
    audioPlaying: "Playing Sarvam Samvaad Voice...",
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

    uploadHeroBadge: "सर्वम डॉक AI एवं वॉइस AI इंजन - आम नागरिकों के लिए",
    uploadHeading: "अदालत के आदेश को अपनी भाषा में तुरंत समझें",
    uploadSubheading: "किसी भी भारतीय अदालत के आदेश का फोटो या स्कैन अपलोड करें। सर्वम डॉक AI जज के आदेश को अलग करता है, याचिकाकर्ता और प्रतिवादी की बातों को छांटता है और आपकी सरल भाषा में बोलकर सुनाता है।",
    dragDropTitle: "अदालत के आदेश की फोटो यहां खींचकर लाएं, या",
    browseFiles: "फाइलें चुनें",
    takePhotoButton: "फोन कैमरे से फोटो खींचें",
    uploadNote: "फोटोकॉपी, मोबाइल फोटो और स्कैन पन्नों (JPG, PNG, WEBP) को सपोर्ट करता है",
    sampleCasesTitle: "या असली अदालती मामलों के उदाहरण आज़माएं (कानपुर जिला न्यायालय एवं उच्च न्यायालय):",
    sampleCasesSub: "तुरंत विश्लेषण देखने के लिए कोई उदाहरण चुनें",
    analyzingTitle: "सर्वम डॉक AI द्वारा आदेश का विश्लेषण हो रहा है...",
    analyzingSub: "कानूनी पाठ निष्कर्षण, पैराग्राफ वर्गीकरण और मुख्य आदेश को अलग किया जा रहा है",

    backToUpload: "वापस जाएं",
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
    listenAudioButton: "अपनी भाषा में सुनें (सर्वम वॉइस)",
    askVoiceAiButton: "न्यायवाणी वॉइस AI से पूछें",
    exportReportButton: "1-पेज रिपोर्ट डाउनलोड करें",

    searchParagraphsPlaceholder: "दस्तावेज़ या वक्ता खोजें...",
    filterAll: "सभी पैराग्राफ",
    filterCourtDirection: "केवल कोर्ट के आदेश",
    filterPetitioner: "याचिकाकर्ता के दावे",
    filterRespondent: "प्रतिवादी के दावे",
    filterRecital: "कार्यवाही विवरण",
    filterRejected: "खारिज किए गए दावे",

    catCourtDirection: "कोर्ट का आदेश",
    catPetitioner: "याचिकाकर्ता का कथन",
    catRespondent: "प्रतिवादी का कथन",
    catRecital: "कार्यवाही / संदर्भ",
    catRejected: "खारिज दावा",

    voiceAiModalTitle: "न्यायवाणी वॉइस AI सहायक (सर्वम संवाद)",
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
    audioPlaying: "सर्वम संवाद आवाज़ बज रही है...",
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

    uploadHeroBadge: "সর্বম ডক AI এবং ভয়েস AI ইঞ্জিন - বিচারপ্রার্থীদের জন্য",
    uploadHeading: "আদালতের আদেশ তাৎক্ষণিকভাবে নিজের ভাষায় বুঝুন",
    uploadSubheading: "যেকোনো ভারতীয় আদালতের আদেশের ছবি বা স্ক্যান আপলোড করুন। সর্বম ডক AI বিচারকের নির্দেশ আলাদা করে এবং সহজ বাংলায় আপনাকে শোনায়।",
    dragDropTitle: "আদালতের আদেশের ছবি এখানে ড্রপ করুন, অথবা",
    browseFiles: "ফাইল বাছুন",
    takePhotoButton: "ফোন ক্যামেরা দিয়ে ছবি তুলুন",
    uploadNote: "ফোটোকপি, মোবাইল ফটো এবং স্ক্যান করা পাতা (JPG, PNG, WEBP) সমর্থন করে",
    sampleCasesTitle: "অথবা আসল আদালতের নমুনা মামলাগুলি দেখুন:",
    sampleCasesSub: "তাৎক্ষণিক বিশ্লেষণ দেখতে একটি নমুনা নির্বাচন করুন",
    analyzingTitle: "সর্বম ডক AI দিয়ে আদেশের বিশ্লেষণ চলছে...",
    analyzingSub: "আইনি পাঠ্য বের করা এবং মূল নির্দেশ চিহ্নিত করা হচ্ছে",

    backToUpload: "ফিরে যান",
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
    listenAudioButton: "বাংলায় শুনুন (সর্বম ভয়েস)",
    askVoiceAiButton: "ন্যায়বাণী ভয়েস AI-কে জিজ্ঞাসা করুন",
    exportReportButton: "১-পৃষ্ঠার রিপোর্ট ডাউনলোড করুন",

    searchParagraphsPlaceholder: "অনুচ্ছেদ বা বক্তব্য খুঁজুন...",
    filterAll: "সব অনুচ্ছেদ",
    filterCourtDirection: "শুধু আদালতের নির্দেশ",
    filterPetitioner: "আবেদনকারীর দাবি",
    filterRespondent: "বিবাদীর দাবি",
    filterRecital: "কার্য বিবরণী",
    filterRejected: "বাতিল দাবি",

    catCourtDirection: "আদালতের নির্দেশ",
    catPetitioner: "আবেদনকারীর বক্তব্য",
    catRespondent: "বিবাদীর বক্তব্য",
    catRecital: "কার্য বিবরণী",
    catRejected: "বাতিল দাবি",

    voiceAiModalTitle: "ন্যায়বাণী ভয়েস AI সহকারী (সর্বম সংবাদ)",
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
    audioPlaying: "সর্বম সংবাদ ভয়েস চলছে...",
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

    uploadHeroBadge: "சர்வhorizontal Doc AI & குரல் AI இயந்திரம்",
    uploadHeading: "நீதிமன்ற உத்தரவுகளை உங்கள் மொழியில் உடனடியாகப் புரிந்து கொள்ளுங்கள்",
    uploadSubheading: "எந்தவொரு இந்திய நீதிமன்ற உத்தரவின் புகைப்படத்தையும் பதிவேற்றவும். சர்வhorizontal Doc AI நீதிபதியின் உத்தரவை தனிமைப்படுத்தி எளிய தமிழில் பேசுகிறது.",
    dragDropTitle: "நீதிமன்ற உத்தரவுப் படத்தை இங்கே இழுத்து விடவும், அல்லது",
    browseFiles: "கோப்புகளைத் தேர்ந்தெடுக்கவும்",
    takePhotoButton: "கேமராவைப் பயன்படுத்தி படம் எடுக்கவும்",
    uploadNote: "போட்டோகாபி, மொபைல் போட்டோ மற்றும் ஸ்கேன் செய்யப்பட்ட பக்கங்களை ஆதரிக்கிறது",
    sampleCasesTitle: "அல்லது உண்மை நீதிமன்ற மாதிரி வழக்குகளைப் பார்க்கவும்:",
    sampleCasesSub: "உடனடி பகுப்பாய்வைக் காண ஒரு மாதிரியைத் தேர்ந்தெடுக்கவும்",
    analyzingTitle: "சர்வhorizontal Doc AI மூலம் பகுப்பாய்வு செய்யப்படுகிறது...",
    analyzingSub: "சட்ட உரையைப் பிரித்தெடுத்து முக்கிய உத்தரவுகளை வகைப்படுத்துகிறது",

    backToUpload: "திரும்பிச் செல்",
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

    searchParagraphsPlaceholder: "தேடவும்...",
    filterAll: "அனைத்து பத்திகளும்",
    filterCourtDirection: "நீதிமன்ற உத்தரவுகள் மட்டும்",
    filterPetitioner: "மனுதாரர் வாதங்கள்",
    filterRespondent: "எதிர்மனுதாரர் வாதங்கள்",
    filterRecital: "நடைமுறை விவரங்கள்",
    filterRejected: "நிராகரிக்கப்பட்ட கோரிக்கைகள்",

    catCourtDirection: "நீதிமன்ற உத்தரவு",
    catPetitioner: "மனுதாரர் கூற்று",
    catRespondent: "எதிர்மனுதாரர் கூற்று",
    catRecital: "நடைமுறை",
    catRejected: "நிராகரிக்கப்பட்டது",

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

    uploadHeroBadge: "సర్వం డాక్ AI & వాయిస్ AI ఇంజిన్",
    uploadHeading: "కోర్టు ఆర్డర్లను మీ భాషలో తక్షణమే అర్థం చేసుకోండి",
    uploadSubheading: "ఏదైనా భారతీయ కోర్టు ఆర్డర్ ఫోటోను అప్‌లోడ్ చేయండి. సర్వం డాక్ AI జడ్జి గారి ఆదేశాలను వేరు చేసి, మీ మాతృభాషలో స్పష్టంగా వినిపిస్తుంది.",
    dragDropTitle: "కోర్టు ఆర్డర్ ఫోటోను ఇక్కడ వేయండి, లేదా",
    browseFiles: "ఫైళ్లను ఎంచుకోండి",
    takePhotoButton: "ఫోన్ కెమెరాతో ఫోటో తీయండి",
    uploadNote: "ఫోటోకాపీలు, మొబైల్ ఫోటోలు మరియు స్కాన్ చేసిన పేజీలకు మద్దతు ఇస్తుంది",
    sampleCasesTitle: "లేదా నిజమైన కోర్టు కేసుల ఉదాహరణలను చూడండి:",
    sampleCasesSub: "తక్షణ విశ్లేషణను చూడటానికి ఒక ఉదాహరణను ఎంచుకోండి",
    analyzingTitle: "సర్వం డాక్ AI ద్వారా విశ్లేషించబడుతోంది...",
    analyzingSub: "చట్టపరమైన పాఠాన్ని సేకరించి ముఖ్య ఆదేశాలను వేరు చేస్తోంది",

    backToUpload: "వెనుకకు వెళ్లండి",
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
    listenAudioButton: "తెలుగులో వినండి (సర్వం వాయిస్)",
    askVoiceAiButton: "న్యాయవాణి వాయిస్ AI ని అడగండి",
    exportReportButton: "రిపోర్ట్ డౌన్‌లోడ్ చేయండి",

    searchParagraphsPlaceholder: "వెతకండి...",
    filterAll: "అన్ని పేరాలు",
    filterCourtDirection: "కోర్టు ఆదేశాలు మాత్రమే",
    filterPetitioner: "పిటిషనర్ వాదనలు",
    filterRespondent: "రెప్పాండెంట్ వాదనలు",
    filterRecital: "చర్యల వివరాలు",
    filterRejected: "తిరస్కరించబడిన వాదనలు",

    catCourtDirection: "కోర్టు ఆదేశం",
    catPetitioner: "పిటిషనర్ వాదన",
    catRespondent: "రేస్పాండెంట్ వాదన",
    catRecital: "వివరాలు",
    catRejected: "తిరస్కరించబడింది",

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

    uploadHeroBadge: "सर्वम डॉक AI आणि व्हॉइस AI इंजिन - नागरिकांसाठी",
    uploadHeading: "कोर्टाचे आदेश तुमच्या भाषेत त्वरित समजून घ्या",
    uploadSubheading: "कोणत्याही भारतीय कोर्टाच्या आदेशाचा फोटो किंवा स्कॅन अपलोड करा. सर्वम डॉक AI न्यायाधीशांचे आदेश वेगळे करते आणि सोप्या मराठीत सांगते.",
    dragDropTitle: "कोर्टाच्या आदेशाचा फोटो येथे टाका, किंवा",
    browseFiles: "फायली निवडा",
    takePhotoButton: "फोन कॅमेऱ्याने फोटो काढा",
    uploadNote: "फोटोकॉपी, मोबाईल फोटो आणि स्कॅन केलेल्या पानांना सपोर्ट करते",
    sampleCasesTitle: "किंवा प्रत्यक्ष कोर्टाच्या प्रकरणांचे नमुने पहा:",
    sampleCasesSub: "त्वरित विश्लेषण पाहण्यासाठी एक नमुना निवडा",
    analyzingTitle: "सर्वम डॉक AI द्वारे विश्लेषण सुरू आहे...",
    analyzingSub: "कायदेशीर मजकूर काढून मुख्य आदेश वेगळे केले जात आहेत",

    backToUpload: "मागे जा",
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
    listenAudioButton: "मराठीत ऐका (सर्वम व्हॉइस)",
    askVoiceAiButton: "न्यायवाणी व्हॉइस AI ला विचारा",
    exportReportButton: "अहवाल डाउनलोड करा",

    searchParagraphsPlaceholder: "शोधा...",
    filterAll: "सर्व परिच्छेद",
    filterCourtDirection: "फक्त कोर्टाचे आदेश",
    filterPetitioner: "याचिकाकर्त्याचे दावे",
    filterRespondent: "प्रतिवादीचे दावे",
    filterRecital: "कामकाज तपशील",
    filterRejected: "फेटाळलेले दावे",

    catCourtDirection: "कोर्टाचा आदेश",
    catPetitioner: "याचिकाकर्त्याचे म्हणणे",
    catRespondent: "प्रतिवादीचे म्हणणे",
    catRecital: "कामकाज",
    catRejected: "फेटाळलेला दावा",

    voiceAiModalTitle: "न्यायवाणी व्हॉइस AI सहाय्यक (सर्वम संवाद)",
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
    audioPlaying: "सर्वम आवाज सुरू आहे...",
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

    uploadHeroBadge: "સર્વમ ડોક AI અને વોઇસ AI એન્જિન - નાગરિકો માટે",
    uploadHeading: "કોર્ટના ઓર્ડરને તમારી ભાષામાં તરત જ સમજો",
    uploadSubheading: "કોઈપણ ભારતીય કોર્ટના ઓર્ડરનો ફોટો သို့မဟုတ် સ્કેન અપલોડ કરો. સર્વમ ડોક AI જજ સાહેબના આદેશને અલગ કરે છે અને સરળ ગુજરાતીમાં બોલીને સંભળાવે છે.",
    dragDropTitle: "કોર્ટ ઓર્ડરનો ફોટો અહીં લાવો, અથવા",
    browseFiles: "ફાઇલો પસંદ કરો",
    takePhotoButton: "ફોન કેમેરાથી ફોટો પાડો",
    uploadNote: "ફોટોકોપી, મોબાઈલ ફોટો અને સ્કેન કરેલા પેજને સપોર્ટ કરે છે",
    sampleCasesTitle: "અથવા વાસ્તવિક કોર્ટના નમૂના કેસ જુઓ:",
    sampleCasesSub: "તરત જ વિશ્લેષણ જોવા માટે કેસ પસંદ કરો",
    analyzingTitle: "સર્વમ ડોક AI દ્વારા ઓર્ડરનું વિશ્લેષણ થઈ રહ્યું છે...",
    analyzingSub: "કાનૂની લખાણ અને મુખ્ય આદેશ અલગ કરવામાં આવી રહ્યા છે",

    backToUpload: "પાછા જાઓ",
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
    listenAudioButton: "ગુજરાતીમાં સાંભળો (સર્વમ વોઇસ)",
    askVoiceAiButton: "ન્યાયવાણી વોઇસ AI ને પૂછો",
    exportReportButton: "રિપોર્ટ ડાઉનલોડ કરો",

    searchParagraphsPlaceholder: "શોધો...",
    filterAll: "બધા ફકરા",
    filterCourtDirection: "માત્ર કોર્ટના આદેશો",
    filterPetitioner: "અરજદારના દાવા",
    filterRespondent: "સામાવાળાના દાવા",
    filterRecital: "કાર્યવાહી વિગત",
    filterRejected: "ફગાવી દીધેલા દાવા",

    catCourtDirection: "કોર્ટનો આદેશ",
    catPetitioner: "અરજદારનું કહેવું",
    catRespondent: "સામાવાળાનું કહેવું",
    catRecital: "કાર્યવાહી",
    catRejected: "ફગાવી દીધેલો દાવો",

    voiceAiModalTitle: "ન્યાયવાણી વોઇસ AI સહાયક (સર્વમ સંવાદ)",
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
    audioPlaying: "સર્વમ સંવાદ અવાજ ચાલુ છે...",
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

    uploadHeroBadge: " ਸਰਵਮ ਡੌਕ AI ਅਤੇ ਵੋਇਸ AI ਇੰਜਣ - ਨਾਗਰਿਕਾਂ ਲਈ",
    uploadHeading: "ਅਦਾਲਤ ਦੇ ਹੁਕਮ ਨੂੰ ਆਪਣੀ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਤੁਰੰਤ ਸਮਝੋ",
    uploadSubheading: "ਕਿਸੇ ਵੀ ਭਾਰਤੀ ਅਦਾਲਤ ਦੇ ਹੁਕਮ ਦੀ ਫੋਟੋ ਜਾਂ ਸਕੈਨ ਅੱਪਲੋਡ ਕਰੋ। ਸਰਵਮ ਡੌਕ AI ਜੱਜ ਸਾਹਿਬ ਦੇ ਫੈਸਲੇ ਨੂੰ ਅਲੱਗ ਕਰਕੇ ਸਰਲ ਪੰਜਾਬੀ ਵਿੱਚ ਬੋਲ ਕੇ ਸੁਣਾਉਂਦਾ ਹੈ।",
    dragDropTitle: "ਅਦਾਲਤੀ ਹੁਕਮ ਦੀ ਤਸਵੀਰ ਇੱਥੇ ਖਿੱਚੋ, ਜਾਂ",
    browseFiles: "ਫਾਈਲਾਂ ਚੁਣੋ",
    takePhotoButton: "ਫੋਨ ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਖਿੱਚੋ",
    uploadNote: "ਫੋਟੋਕਾਪੀ, ਮੋਬਾਈਲ ਫੋਟੋ ਅਤੇ ਸਕੈਨ ਕੀਤੇ ਪੰਨਿਆਂ ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ",
    sampleCasesTitle: "ਜਾਂ ਅਸਲ ਅਦਾਲਤੀ ਨਮੂਨੇ ਦੇ ਕੇਸ ਦੇਖੋ:",
    sampleCasesSub: "ਤੁਰੰਤ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇਖਣ ਲਈ ਕੇਸ ਚੁਣੋ",
    analyzingTitle: "ਸਰਵਮ ਡੌਕ AI ਦੁਆਰਾ ਹੁਕਮ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    analyzingSub: "ਕਾਨੂੰਨੀ ਲਿਖਤ ਅਤੇ ਮੁੱਖ ਆਦੇਸ਼ ਅਲੱਗ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ",

    backToUpload: "ਵਾਪਸ ਜਾਓ",
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
    listenAudioButton: "ਪੰਜਾਬੀ ਵਿੱਚ ਸੁਣੋ (ਸਰਵਮ ਵੋਇਸ)",
    askVoiceAiButton: "ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਨੂੰ ਪੁੱਛੋ",
    exportReportButton: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",

    searchParagraphsPlaceholder: "ਖੋਜੋ...",
    filterAll: "ਸਾਰੇ ਪੈਰੇ",
    filterCourtDirection: "ਕੇਵਲ ਅਦਾਲਤ ਦੇ ਹੁਕਮ",
    filterPetitioner: "ਯਾਚਕ ਦੇ ਦਾਅਵੇ",
    filterRespondent: "ਵਿਰੋਧੀ ਧਿਰ ਦੇ ਦਾਅਵੇ",
    filterRecital: "ਕਾਰਵਾਈ ਦਾ ਵੇਰਵਾ",
    filterRejected: "ਖਾਰਜ ਕੀਤੇ ਦਾਅਵੇ",

    catCourtDirection: "ਅਦਾਲਤ ਦਾ ਹੁਕਮ",
    catPetitioner: "ਯਾਚਕ ਦਾ ਪੱਖ",
    catRespondent: "ਵਿਰੋਧੀ ਧਿਰ ਦਾ ਪੱਖ",
    catRecital: "ਕਾਰਵਾਈ",
    catRejected: "ਖਾਰਜ ਕੀਤਾ ਦਾਅਵਾ",

    voiceAiModalTitle: "ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਸਹਾਇਕ (ਸਰਵਮ ਸੰਵਾਦ)",
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
    audioPlaying: "ਸਰਵਮ ਸੰਵਾਦ ਆਵਾਜ਼ ਚੱਲ ਰਹੀ ਹੈ...",
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
