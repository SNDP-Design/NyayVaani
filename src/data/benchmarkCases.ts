import { BenchmarkCase, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी (कानपुरी/अवधी)', flag: '🇮🇳', dialectNote: 'Kanpur regional plain phrasing' },
  { code: 'en', name: 'English', nativeName: 'Plain English', flag: '🇬🇧' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' }
];

export const BENCHMARK_CASES: BenchmarkCase[] = [
  {
    id: 'case-01-kanpur-demo',
    title: 'Ashok Verma v. Ramakant Sharma (Kanpur District Court)',
    caseNumber: 'O.S. No. 412/2026',
    type: 'order',
    courtName: 'Court of Additional District Judge IV, Kanpur Nagar',
    photocopyStyle: 'distorted_photocopy_stamp',
    isRefusalCase: false,
    demoHighlight: 'Target Demo: Neighbor claimed Ashok lost, but Court REJECTED petitioner\'s injunction claim & ordered Ashok only to submit tax receipt.',
    documentText: `IN THE COURT OF THE ADDITIONAL DISTRICT JUDGE IV, KANPUR NAGAR
Original Suit No. 412 of 2026
Ashok Verma ... Respondent / Defendant
Vs.
Ramakant Sharma ... Petitioner / Plaintiff

ORDER SHEET (DATED 22-07-2026)

Para 1: The matter comes up today for consideration of application 6C filed by the plaintiff Ramakant Sharma seeking mandatory injunction against the defendant.

Para 2: The learned counsel for the petitioner/plaintiff strongly submitted that the defendant Ashok Verma has illegally encroached upon 4 feet of the passage on the northern boundary and prayed that the defendant be directed to immediately demolish the boundary wall and restore possession to the plaintiff.

Para 3: The learned counsel for the respondent/defendant Ashok Verma appeared and contended that the boundary wall is standing on defendant's self-acquired ancestral land for over 30 years and submitted municipal tax payment receipts to demonstrate possession.

Para 4: Having heard learned counsel for both sides and examined the spot inspection report dated 10-06-2026 submitted by the Court Commissioner, this Court finds no prima facie evidence of fresh encroachment or urgency to warrant demolition at this interim stage.

Para 5: Consequently, the application 6C filed by the plaintiff for mandatory injunction and demolition is hereby REJECTED. However, to preserve property records, the defendant Ashok Verma is directed to submit updated Municipal Property Tax Receipts for the period 2021-2026 on or before 14th August 2026 before Court Room No. 4. Matter adjourned to 14-08-2026 for framing of issues.

Sd/-
(District Judge IV, Kanpur)`,
    analysis: {
      documentId: 'case-01-kanpur-demo',
      title: 'Ashok Verma v. Ramakant Sharma',
      caseNumber: 'O.S. No. 412/2026',
      courtName: 'Court of Additional District Judge IV, Kanpur Nagar',
      orderDate: '22-07-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 98,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'Consequently, the application 6C filed by the plaintiff for mandatory injunction and demolition is hereby REJECTED. However, to preserve property records, the defendant Ashok Verma is directed to submit updated Municipal Property Tax Receipts for the period 2021-2026 on or before 14th August 2026 before Court Room No. 4. Matter adjourned to 14-08-2026 for framing of issues.',
      operativeParagraphNumbers: [5],
      paragraphs: [
        {
          id: 'p1',
          paragraphNumber: 1,
          text: 'The matter comes up today for consideration of application 6C filed by the plaintiff Ramakant Sharma seeking mandatory injunction against the defendant.',
          category: 'recital_proceedings',
          speaker: 'Court Clerk / Recital',
          confidence: 96,
          provenance: 'human_verified',
          notes: 'Recital of procedural history and application filing.'
        },
        {
          id: 'p2',
          paragraphNumber: 2,
          text: 'The learned counsel for the petitioner/plaintiff strongly submitted that the defendant Ashok Verma has illegally encroached upon 4 feet of the passage on the northern boundary and prayed that the defendant be directed to immediately demolish the boundary wall and restore possession to the plaintiff.',
          category: 'rejected_claim',
          speaker: 'Petitioner (Ramakant Sharma)',
          confidence: 99,
          provenance: 'human_verified',
          notes: 'Petitioner submission claiming demolition. NOTE: Explicitly rejected by Court in Para 5!',
          rejectionDetail: 'The neighbour read this paragraph and thought Ramakant won. But the court rejected this demand in Para 5.'
        },
        {
          id: 'p3',
          paragraphNumber: 3,
          text: 'The learned counsel for the respondent/defendant Ashok Verma appeared and contended that the boundary wall is standing on defendant\'s self-acquired ancestral land for over 30 years and submitted municipal tax payment receipts to demonstrate possession.',
          category: 'respondent_submission',
          speaker: 'Respondent (Ashok Verma)',
          confidence: 97,
          provenance: 'human_verified',
          notes: 'Respondent contention and submission of tax receipts.'
        },
        {
          id: 'p4',
          paragraphNumber: 4,
          text: 'Having heard learned counsel for both sides and examined the spot inspection report dated 10-06-2026 submitted by the Court Commissioner, this Court finds no prima facie evidence of fresh encroachment or urgency to warrant demolition at this interim stage.',
          category: 'court_direction',
          speaker: 'Hon\'ble Court Findings',
          confidence: 95,
          provenance: 'human_verified',
          notes: 'Court finding rejecting urgency and encroachment allegation.'
        },
        {
          id: 'p5',
          paragraphNumber: 5,
          text: 'Consequently, the application 6C filed by the plaintiff for mandatory injunction and demolition is hereby REJECTED. However, to preserve property records, the defendant Ashok Verma is directed to submit updated Municipal Property Tax Receipts for the period 2021-2026 on or before 14th August 2026 before Court Room No. 4. Matter adjourned to 14-08-2026 for framing of issues.',
          category: 'court_direction',
          speaker: 'Hon\'ble Court Operative Part',
          confidence: 99,
          provenance: 'human_verified',
          notes: 'OPERATIVE DIRECTION: Application rejected. Respondent directed to file tax receipt by 14 Aug 2026.'
        }
      ],
      nextSteps: [
        {
          id: 'ns-1',
          action: 'Submit updated Municipal Property Tax Receipts for years 2021-2026',
          deadline: '14th August 2026',
          forum: 'Court Room No. 4, Additional District Judge IV, Kanpur Nagar',
          sourceParagraphId: 'p5',
          quotedSource: 'the defendant Ashok Verma is directed to submit updated Municipal Property Tax Receipts for the period 2021-2026 on or before 14th August 2026 before Court Room No. 4'
        },
        {
          id: 'ns-2',
          action: 'Appear in court for framing of issues',
          deadline: '14th August 2026',
          forum: 'Court Room No. 4, Kanpur District Court',
          sourceParagraphId: 'p5',
          quotedSource: 'Matter adjourned to 14-08-2026 for framing of issues.'
        }
      ],
      plainLanguageExplanations: {
        hi: 'अशोक वर्मा जी, आपके पड़ोसी रमाकांत शर्मा की दीवार गिराने और ज़मीन खाली कराने की मांग कोर्ट ने खारिज कर दी है! आपको अपनी दीवार नहीं तोड़नी है। अदालत ने सिर्फ यह कहा है कि आप 2021 से 2026 की अपनी नगर पालिका हाउस टैक्स की रसीदें 14 अगस्त 2026 तक कोर्ट रूम नंबर 4 में जमा कर दें। उस दिन अगली सुनवाई है।',
        en: 'Mr. Ashok Verma, the court has REJECTED your neighbor Ramakant Sharma\'s request to demolish your wall! You do NOT have to demolish anything. The court has directed you only to submit your municipal property tax receipts (2021-2026) at Court Room No. 4 on or before 14th August 2026.',
        bn: 'অশোক বর্মা মহাশয, আপনার প্রতিবেশী রমাকান্ত শর্মার দেওয়াল ভাঙার আবেদন আদালত সম্পূর্ণ বাতিল করেছে! আপনাকে কোনো দেওয়াল ভাঙতে হবে না। আদালত কেবল নির্দেশ দিয়েছে যে আপনার পৌরসভার করের রসিদ (২০২১-২০২৬) ১৪ই আগস্ট ২০২৬ এর মধ্যে ৪ নম্বর কোর্টরুমে জমা দিন।',
        ta: 'திரு. அசோக் வர்மா, உங்கள் அண்டை வீட்டாரான ரமாகாந்த் சர்மாவின் சுவரை இடிக்க வேண்டும் என்ற கோரிக்கையை நீதிமன்றம் நிராகரித்துவிட்டது! நீங்கள் சுவரை இடிக்க தேவையில்லை. 14 ஆகஸ்ட் 2026 அன்று அல்லது அதற்கு முன் கோர்ட் ரூம் எண் 4-இல் நகராட்சி வரி ரசீதுகளை தாக்கல் செய்ய மட்டுமே நீதிமன்றம் உத்தரவிட்டுள்ளது.',
        te: 'శ్రీ అశోక్ వర్మ గారు, మీ పొరుగువారు రమాకాంత్ శర్మ చేసిన గోడ కూల్చివేత దరఖాస్తును కోర్టు తిరస్కరించింది! మీరు ఏ గోడనూ కూల్చక్కర్లేదు. కేవలం మీ మున్సిపల్ పన్ను రసీదులను (2021-2026) 14 ఆగస్టు 2026 నాటికి కోర్టు రూమ్ నెం. 4 లో దాఖలు చేయాలని కోర్టు ఆదేశించింది.',
        mr: 'श्री. अशोक वर्मा, तुमच्या शेजाऱ्याने (रमाकांत शर्मा) केलेली भिंत पाडण्याची मागणी कोर्टाने फेटाळून लावली आहे! तुम्हाला भिंत पाडण्याची गरज नाही. कोर्टाने फक्त असे निर्देश दिले आहेत की तुम्ही 14 ऑगस्ट 2026 पर्यंत कोर्ट रूम क्र. 4 मध्ये तुमच्या नगरपालिकेच्या मालमत्ता कर पावत्या जमा कराव्यात.',
        gu: 'શ્રી અશોક વર્માજી, તમારા પાડોશી રમાકાંત શર્માની દીવાલ તોડવાની અરજી કોર્ટે ફગાવી દીધી છે! તમારે કોઈ દીવાલ તોડવાની નથી. કોર્ટે માત્ર એટલો આદેશ આપ્યો છે કે તમે ૧૪ ઓગસ્ટ ૨૦૨૬ સુધીમાં કોર્ટ રૂમ નં. ૪ માં તમારી મ્યુનિસિપલ પ્રોપર્ટી ટેક્સની પહોંચ જમા કરાવો.'
      },
      audioScripts: {
        hi: 'नमस्ते अशोक वर्मा जी। आपके लिए बड़ी राहत की खबर है। कोर्ट ने रमाकांत शर्मा की अर्जी खारिज कर दी है। आपको अपनी कोई दीवार नहीं तोड़नी है। आपको बस 14 अगस्त 2026 से पहले कोर्ट रूम 4 में अपने मकान की टैक्स रसीदें जमा करनी हैं।',
        en: 'Hello Mr. Ashok Verma. Good news for you. The court has rejected Ramakant Sharma\'s application for demolition. You do not need to demolish your wall. You only need to submit your tax receipts at Court Room 4 by August 14, 2026.',
        bn: 'নমস্কার অশোক বর্মা মহাশয়। আদালতের বিচারক আপনার প্রতিবেশীর দেওয়াল ভাঙার আবেদন বাতিল করেছেন। আপনাকে কোনো দেওয়াল ভাঙতে হবে না, শুধু পৌরসভার ট্যাক্স রসিদ ১৪ই আগস্টের মধ্যে কোর্ট রুম ৪ এ জমা দেবেন।',
        ta: 'வணக்கம் அசோக் வர்மா. நீதிமன்றம் உங்கள் சுவரை இடிக்கக் கோரிய மனுவை நிராகரித்துவிட்டது. ஆகஸ்ட் 14 ஆம் தேதிக்குள் நீதிமன்ற அறை 4-இல் வரி ரசீதுகளை மட்டும் சமர்ப்பிக்க வேண்டும்.',
        te: 'నమస్కారం అశోక్ వర్మ గారు. కోర్టు రమాకాంత్ శర్మ అర్జీని కొట్టివేసింది. మీరు గోడ కూల్చవలసిన అవసరం లేదు. ఆగస్టు 14 లోగా కోర్టు రూమ్ 4 లో పన్ను రసీదులు సమర్పించండి.',
        mr: 'नमस्कार अशोक वर्मा. कोर्टाने भिंत पाडण्याची मागणी फेटाळली आहे. 14 ऑगस्टपूर्वी कोर्ट रूम 4 मध्ये टॅक्स पावत्या जमा करा.',
        gu: 'નમસ્તે અશોક વર્માજી. કોર્ટે દીવાલ તોડવાની અરજી રદ કરી દીધી છે. તમારે માત્ર ૧૪ ઓગસ્ટ પહેલા કોર્ટ રૂમ ૪ માં ટેક્સની પહોંચ જમા કરાવવાની છે.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 5,
      correctlyAttributed: 5,
      operativeFound: true,
      honestlyRefused: false,
      notes: '100% paragraph accuracy. Demonstrates protection against misinterpreting rejected petitioner claim.'
    }
  },
  {
    id: 'case-02-interim-stay',
    title: 'Suresh Chandra v. Kanpur Development Authority',
    caseNumber: 'Civil Misc. App. 88/2026',
    type: 'order',
    courtName: 'Court of Civil Judge (Senior Division), Kanpur Nagar',
    photocopyStyle: 'skewed_typewritten',
    isRefusalCase: false,
    demoHighlight: 'Interim Stay Order: Court directs KDA to maintain status quo regarding construction on Plot No. B-12 till 28th Aug 2026.',
    documentText: `IN THE COURT OF CIVIL JUDGE (SENIOR DIVISION), KANPUR NAGAR
Civil Misc Application No. 88/2026
Suresh Chandra ... Applicant / Plaintiff
Vs.
Kanpur Development Authority ... Opp. Party / Defendant

ORDER (DATED 15-07-2026)

Para 1: Plaintiff Suresh Chandra filed present application under Order 39 Rule 1 & 2 CPC seeking interim injunction against KDA notice dated 01-07-2026.

Para 2: Counsel for plaintiff contended that notice was issued without serving mandatory 15-day show cause notice under Section 27 of UP Urban Planning Act.

Para 3: Standing counsel for KDA appeared on advance copy and requested time to file counter affidavit.

Para 4: Considering the urgency and prima facie balance of convenience, both parties are directed to maintain STATUS QUO on Plot B-12, Kidwai Nagar, Kanpur till next date. Defendant KDA shall file counter affidavit within 4 weeks. Matter listed on 28-08-2026.

Sd/-
Civil Judge (Sr Div), Kanpur`,
    analysis: {
      documentId: 'case-02-interim-stay',
      title: 'Suresh Chandra v. KDA',
      caseNumber: 'Civil Misc. App. 88/2026',
      courtName: 'Court of Civil Judge (Senior Division), Kanpur Nagar',
      orderDate: '15-07-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 96,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'both parties are directed to maintain STATUS QUO on Plot B-12, Kidwai Nagar, Kanpur till next date. Defendant KDA shall file counter affidavit within 4 weeks. Matter listed on 28-08-2026.',
      operativeParagraphNumbers: [4],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Plaintiff Suresh Chandra filed present application under Order 39 Rule 1 & 2 CPC seeking interim injunction against KDA notice dated 01-07-2026.', category: 'recital_proceedings', speaker: 'Recital', confidence: 98, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Counsel for plaintiff contended that notice was issued without serving mandatory 15-day show cause notice under Section 27 of UP Urban Planning Act.', category: 'petitioner_submission', speaker: 'Petitioner (Suresh Chandra)', confidence: 97, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'Standing counsel for KDA appeared on advance copy and requested time to file counter affidavit.', category: 'respondent_submission', speaker: 'Respondent (KDA Counsel)', confidence: 96, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'Considering the urgency and prima facie balance of convenience, both parties are directed to maintain STATUS QUO on Plot B-12, Kidwai Nagar, Kanpur till next date. Defendant KDA shall file counter affidavit within 4 weeks. Matter listed on 28-08-2026.', category: 'court_direction', speaker: 'Hon\'ble Court Operative Part', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Maintain status quo (no construction or alteration on Plot B-12)', deadline: 'Till 28th August 2026', forum: 'Plot B-12, Kidwai Nagar, Kanpur', sourceParagraphId: 'p4', quotedSource: 'both parties are directed to maintain STATUS QUO on Plot B-12, Kidwai Nagar, Kanpur till next date' },
        { id: 'ns-2', action: 'Appear for next hearing after KDA files counter affidavit', deadline: '28th August 2026', forum: 'Court of Civil Judge (Sr Div), Kanpur Nagar', sourceParagraphId: 'p4', quotedSource: 'Matter listed on 28-08-2026.' }
      ],
      plainLanguageExplanations: {
        hi: 'सुरेश चंद्र जी, कोर्ट ने प्लॉट B-12 किदवई नगर पर यथास्थिति (स्टेटस को) बनाए रखने का आदेश दिया है। यानी 28 अगस्त 2026 तक न तो KDA कोई तोड़फोड़ कर सकती है और न ही आप कोई नया निर्माण। KDA को 4 हफ्ते में जवाब दाखिल करना है। अगली सुनवाई 28-08-2026 को है।',
        en: 'Mr. Suresh Chandra, the court has ordered Status Quo on Plot B-12, Kidwai Nagar. Neither KDA can demolish nor can you construct till 28th August 2026. KDA has been given 4 weeks to reply. Next date of hearing is 28-08-2026.',
        bn: 'সুরেশ চন্দ্র মহাশয, আদালত বি-১২ প্লটে স্থিতি বজায় রাখার (Status Quo) নির্দেশ দিয়েছে। ২৮শে আগস্ট ২০২৬ পর্যন্ত কেডিএ কোনো ভাঙচুর করতে পারবে না।',
        ta: 'திரு. சுரேஷ் சந்திரா, பிளாட் B-12 இல் தற்போதைய நிலையையே (Status Quo) பராமரிக்க நீதிமன்றம் உத்தரவிட்டுள்ளது. 28 ஆகஸ்ட் 2026 வரை கட்டுமானம் அல்லது இடிப்பு எதுவும் செய்யக்கூடாது.',
        te: 'శ్రీ సురేష్ చంద్ర గారు, ప్లాట్ B-12 పై యథాతథ స్థితిని (Status Quo) కొనసాగించాలని కోర్టు ఉత్తర్వులు ఇచ్చింది. 28 ఆగస్టు 2026 వరకు ఎలాంటి నిర్మాణాలు లేదా కూల్చివేతలు జరగకూడదు.',
        mr: 'सुरेश चंद्र जी, कोर्टाने प्लॉट B-12 वर जैसे थे (Status Quo) परिस्थिती ठेवण्याचे आदेश दिले आहेत. 28 ऑगस्ट 2026 पर्यंत कोणतेही बांधकाम किंवा पाडकाम होणार नाही.',
        gu: 'સુરેશ ચંદ્રજી, કોર્ટે પ્લોટ B-12 પર સ્થિતિ જેમ છે તેમ જાળવી રાખવા (Status Quo) નો આદેશ આપ્યો છે. ૨૮ ઓગસ્ટ ૨૦૨૬ સુધી KDA કે તમે કોઈ ફેરફાર કરી શકશો નહીં.'
      },
      audioScripts: {
        hi: 'सुरेश चंद्र जी, कोर्ट ने स्टेटस को यानी स्टे दे दिया है। 28 अगस्त तक KDA आपके प्लॉट पर कोई कार्रवाई नहीं कर सकती। अगली तारीख 28 अगस्त है।',
        en: 'Suresh Chandra ji, the court has granted a status quo order. KDA cannot take any action on your plot till August 28, 2026.',
        bn: 'সুরেশ চন্দ্র মহাশয়, আদালত ২৮শে আগস্ট পর্যন্ত স্থগিতাদেশ দিয়েছে। কেডিএ কোনো কাজ করতে পারবে না।',
        ta: 'சுரேஷ் சந்திரா, ஆகஸ்ட் 28 வரை நீதிமன்றம் இடைக்கால தடை விதித்துள்ளது. கேடிஏ எந்த நடவடிக்கையும் எடுக்க முடியாது.',
        te: 'సురేష్ చంద్ర గారు, ఆగస్టు 28 వరకు కోర్టు స్టే ఇచ్చింది. KDA ఎలాంటి చర్యలు తీసుకోలేదు.',
        mr: 'सुरेश चंद्र जी, कोर्टाने 28 ऑगस्टपर्यंत स्टे दिला आहे.',
        gu: 'સુરેશ ચંદ્રજી, કોર્ટે ૨૮ ઓગસ્ટ સુધી સ્ટે આપ્યો છે.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 4,
      correctlyAttributed: 4,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Clear status quo isolation.'
    }
  },
  {
    id: 'case-03-bail-order',
    title: 'State of UP v. Vikram Tripathi (Bail Order)',
    caseNumber: 'Bail App. No. 1928/2026',
    type: 'order',
    courtName: 'High Court of Judicature at Allahabad',
    photocopyStyle: 'clean_scanned_seal',
    isRefusalCase: false,
    demoHighlight: 'Bail Granted: Applicant released on personal bond of ₹50,000 + 2 sureties before CMM Kanpur within 10 days.',
    documentText: `IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD
Criminal Misc. Bail Application No. 1928 of 2026
Vikram Tripathi ... Applicant
Vs.
State of Uttar Pradesh ... Opposite Party

ORDER (DATED 18-07-2026)

Para 1: Heard Sri S.K. Mishra, learned counsel for the applicant and learned AGA for the State in FIR No. 88/2026 under Sections 379, 411 IPC, P.S. Kalyanpur, Kanpur Nagar.

Para 2: Learned counsel for applicant submitted that applicant has been falsely implicated due to local election enmity and has no criminal antecedent prior to this case.

Para 3: Learned AGA opposed the bail prayer submitting that stolen goods were recovered from applicant's godown.

Para 4: Considering the period of detention since 10-05-2026 and nature of offence, without expressing any opinion on merits, the bail application is ALLOWED.

Para 5: Let applicant Vikram Tripathi be released on bail in FIR No. 88/2026 on furnishing a personal bond of Rs. 50,000/- with two reliable sureties each in the like amount to the satisfaction of Chief Metropolitan Magistrate, Kanpur Nagar within 10 days of certified copy release.

Sd/-
Judge, Allahabad HC`,
    analysis: {
      documentId: 'case-03-bail-order',
      title: 'State v. Vikram Tripathi',
      caseNumber: 'Bail App. No. 1928/2026',
      courtName: 'High Court of Judicature at Allahabad',
      orderDate: '18-07-2026',
      isPhotocopyQuality: false,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 99,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'Let applicant Vikram Tripathi be released on bail in FIR No. 88/2026 on furnishing a personal bond of Rs. 50,000/- with two reliable sureties each in the like amount to the satisfaction of Chief Metropolitan Magistrate, Kanpur Nagar within 10 days of certified copy release.',
      operativeParagraphNumbers: [4, 5],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Heard Sri S.K. Mishra, learned counsel for the applicant and learned AGA for the State in FIR No. 88/2026 under Sections 379, 411 IPC, P.S. Kalyanpur, Kanpur Nagar.', category: 'recital_proceedings', speaker: 'Court Recital', confidence: 99, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Learned counsel for applicant submitted that applicant has been falsely implicated due to local election enmity and has no criminal antecedent prior to this case.', category: 'petitioner_submission', speaker: 'Applicant Counsel', confidence: 98, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'Learned AGA opposed the bail prayer submitting that stolen goods were recovered from applicant\'s godown.', category: 'respondent_submission', speaker: 'State AGA Counsel', confidence: 98, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'Considering the period of detention since 10-05-2026 and nature of offence, without expressing any opinion on merits, the bail application is ALLOWED.', category: 'court_direction', speaker: 'Hon\'ble High Court', confidence: 99, provenance: 'human_verified' },
        { id: 'p5', paragraphNumber: 5, text: 'Let applicant Vikram Tripathi be released on bail in FIR No. 88/2026 on furnishing a personal bond of Rs. 50,000/- with two reliable sureties each in the like amount to the satisfaction of Chief Metropolitan Magistrate, Kanpur Nagar within 10 days of certified copy release.', category: 'court_direction', speaker: 'Hon\'ble High Court Operative', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Submit ₹50,000 Personal Bond and two local sureties of ₹50,000 each', deadline: 'Within 10 days of certified copy', forum: 'Chief Metropolitan Magistrate (CMM), Kanpur Nagar Court', sourceParagraphId: 'p5', quotedSource: 'furnishing a personal bond of Rs. 50,000/- with two reliable sureties each in the like amount to the satisfaction of Chief Metropolitan Magistrate, Kanpur Nagar' }
      ],
      plainLanguageExplanations: {
        hi: 'विक्रम त्रिपाठी जी की ज़मानत हाईकोर्ट से मंजूर हो गई है! रिहाई के लिए CMM कानपुर नगर कोर्ट में ₹50,000 का पर्सनल बॉन्ड और ₹50,000-₹50,000 की दो ज़मानतें (Sureties) 10 दिनों के भीतर जमा करनी होंगी।',
        en: 'Bail has been GRANTED to Vikram Tripathi by the Allahabad High Court! To get released, submit a personal bond of ₹50,000 and two local sureties of ₹50,000 each before Chief Metropolitan Magistrate (CMM) Kanpur Nagar within 10 days.',
        bn: 'বিক্রম ত্রিপাঠীর জামিন মঞ্জুর হয়েছে! সিএমএম কানপুর কোর্টে ৫০,০০০ টাকার ব্যক্তিগত বন্ড এবং দুটি ৫০,০০০ টাকার জামিনদার ১০ দিনের মধ্যে জমা দিন।',
        ta: 'விக்ரம் திரிபாதிக்கு ஜாமீன் வழங்கப்பட்டுள்ளது! CMM கான்பூர் நகர் நீதிமன்றத்தில் ₹50,000 தனிநபர் பிணை மற்றும் இரு ₹50,000 பிணையாளர்களை 10 நாட்களுக்குள் தாக்கல் செய்யவும்.',
        te: 'విక్రమ్ త్రిపాఠికి బెయిల్ మంజూరైంది! CMM కాన్పూర్ కోర్టులో ₹50,000 పర్సనల్ బాండ్ మరియు ఇద్దరు ₹50,000 ష్యూరిటీలను 10 రోజుల్లోగా సమర్పించండి.',
        mr: 'विक्रम त्रिपाठी यांचा जामीन मंजूर झाला आहे! CMM कानपूर नगर कोर्टात ₹50,000 चा बाँड आणि दोन जामीनदार 10 दिवसांत सादर करा.',
        gu: 'વિક્રમ ત્રિપાઠીના જામીન મંજૂર થયા છે! CMM કાનપુર કોર્ટમાં ₹૫૦,૦૦૦ નો બોન્ડ અને બે જામીનદાર ૧૦ દિવસમાં રજૂ કરવાના રહેશે.'
      },
      audioScripts: {
        hi: 'बधाई हो, हाईकोर्ट ने ज़मानत दे दी है। रिहाई के लिए कानपुर CMM कोर्ट में पचास हजार रुपये का बॉन्ड और दो ज़मानतदार पेश करने होंगे।',
        en: 'Bail is granted! Submit a 50 thousand rupees bond and two sureties at CMM Kanpur court within 10 days for release.',
        bn: 'জামিন মঞ্জুর হয়েছে। কানপুর সিএমএম কোর্টে ৫০,০০০ টাকা বন্ড ও দুইজন জামিনদার হাজির করুন।',
        ta: 'ஜாமீன் கிடைத்துவிட்டது. கான்பூர் CMM நீதிமன்றத்தில் ₹50,000 பிணை தாக்கல் செய்யவும்.',
        te: 'బెయిల్ మంజూరైంది. కాన్పూర్ CMM కోర్టులో ₹50,000 బాండ్ సమర్పించండి.',
        mr: 'जामीन मंजूर झाला आहे. कानपूर CMM कोर्टात बाँड सादर करा.',
        gu: 'જામીન મંજૂર થયા છે. કાનપુર CMM કોર્ટમાં બોન્ડ રજૂ કરો.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 5,
      correctlyAttributed: 5,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Bail conditions extracted strictly from Para 5.'
    }
  },
  {
    id: 'case-04-maintenance-order',
    title: 'Sunita Devi v. Rajesh Kumar (Maintenance)',
    caseNumber: 'Maintenance Case 512/2026',
    type: 'order',
    courtName: 'Family Court No. 2, Kanpur Nagar',
    photocopyStyle: 'distorted_photocopy_stamp',
    isRefusalCase: false,
    demoHighlight: 'Interim Maintenance: Husband ordered to pay ₹12,000/month by 5th of every month starting August 2026.',
    documentText: `IN THE FAMILY COURT NO. 2, KANPUR NAGAR
Maintenance Case No. 512 of 2026
Sunita Devi ... Applicant / Wife
Vs.
Rajesh Kumar ... Respondent / Husband

ORDER ON INTERIM MAINTENANCE (DATED 10-07-2026)

Para 1: Applicant wife filed petition under Section 125 CrPC claiming Rs. 25,000 per month maintenance alleging desertion since November 2025.

Para 2: Respondent husband contended that he earns only Rs. 18,000 per month as a salesman in a retail shop and submitted salary certificate.

Para 3: Applicant produced bank statements showing respondent receives additional rental income of Rs. 35,000 per month from commercial property in Parade Market.

Para 4: Considering the admitted income and living standard, Respondent Rajesh Kumar is directed to pay interim maintenance of Rs. 12,000/- per month to Applicant Sunita Devi on or before 5th day of every calendar month starting from 01-08-2026 into applicant's bank account. Default shall attract execution proceedings.

Sd/-
Principal Judge, Family Court 2, Kanpur`,
    analysis: {
      documentId: 'case-04-maintenance-order',
      title: 'Sunita Devi v. Rajesh Kumar',
      caseNumber: 'Maintenance Case 512/2026',
      courtName: 'Family Court No. 2, Kanpur Nagar',
      orderDate: '10-07-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 97,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'Respondent Rajesh Kumar is directed to pay interim maintenance of Rs. 12,000/- per month to Applicant Sunita Devi on or before 5th day of every calendar month starting from 01-08-2026 into applicant\'s bank account.',
      operativeParagraphNumbers: [4],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Applicant wife filed petition under Section 125 CrPC claiming Rs. 25,000 per month maintenance alleging desertion since November 2025.', category: 'petitioner_submission', speaker: 'Applicant Wife', confidence: 98, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Respondent husband contended that he earns only Rs. 18,000 per month as a salesman in a retail shop and submitted salary certificate.', category: 'respondent_submission', speaker: 'Respondent Husband', confidence: 97, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'Applicant produced bank statements showing respondent receives additional rental income of Rs. 35,000 per month from commercial property in Parade Market.', category: 'petitioner_submission', speaker: 'Applicant Evidence Submission', confidence: 96, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'Considering the admitted income and living standard, Respondent Rajesh Kumar is directed to pay interim maintenance of Rs. 12,000/- per month to Applicant Sunita Devi on or before 5th day of every calendar month starting from 01-08-2026 into applicant\'s bank account. Default shall attract execution proceedings.', category: 'court_direction', speaker: 'Hon\'ble Family Court Judge', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Pay ₹12,000 interim maintenance into wife\'s bank account', deadline: 'On or before 5th of every month starting 01-08-2026', forum: 'Bank Transfer / Family Court Kanpur', sourceParagraphId: 'p4', quotedSource: 'pay interim maintenance of Rs. 12,000/- per month to Applicant Sunita Devi on or before 5th day of every calendar month starting from 01-08-2026' }
      ],
      plainLanguageExplanations: {
        hi: 'फैमिली कोर्ट ने आदेश दिया है कि पति राजेश कुमार को पत्नी सुनीता देवी को हर महीने ₹12,000 का अंतरिम गुजारा भत्ता देना होगा। यह पैसा हर महीने की 5 तारीख तक पत्नी के बैंक खाते में जमा होना चाहिए (शुरुआत 1 अगस्त 2026 से)।',
        en: 'The Family Court has directed husband Rajesh Kumar to pay interim maintenance of ₹12,000 per month to wife Sunita Devi on or before the 5th of every calendar month starting 1st August 2026.',
        bn: 'ফ্যামিলি কোর্ট নির্দেশ দিয়েছে যে স্বামী রাজেশ কুমারকে প্রতি মাসে ১২,০০০ টাকা অন্তর্বর্তী খোরপোশ স্ত্রী সুনীতা দেবীকে প্রতি মাসের ৫ তারিখের মধ্যে দিতে হবে।',
        ta: 'குடும்ப நீதிமன்றம் கணவர் ராஜேஷ் குமாருக்கு மாதம் ₹12,000 இடைக்கால ஜீவனாம்சத்தை மனைவி சுனிதா தேவிக்கு ஆகஸ்ட் 1 முதல் ஒவ்வொரு மாதமும் 5 ஆம் தேதிக்குள் செலுத்த உத்தரவிட்டுள்ளது.',
        te: 'ఫ్యామిలీ కోర్టు భర్త రాజేష్ కుమార్ భార్య సునీతా దేవికి నెలకు ₹12,000 తాత్కాలిక భరణం ప్రతి నెల 5వ తేదీ నాటికి చెల్లించాలని ఆదేశించింది.',
        mr: 'फॅमिली कोर्टाने पती राजेश कुमार यांना पत्नी सुनीता देवी यांना दरमहा ₹12,000 अंतरीम पोटगी दर महिन्याच्या 5 तारखेपर्यंत देण्याचे निर्देश दिले आहेत.',
        gu: 'ફેમિલી કોર્ટે પતિ રાજેશ કુમારને પત્ની સુનીતા દેવીને દર મહિને ₹૧૨,૦૦૦ અંતરિમ ભરણપોષણ દર મહિનાની ૫ તારીખ સુધીમાં ચૂકવવાનો આદેશ આપ્યો છે.'
      },
      audioScripts: {
        hi: 'फैमिली कोर्ट का फैसला आ गया है। राजेश कुमार को अपनी पत्नी को हर महीने 5 तारीख तक 12 हजार रुपये गुजारा भत्ता देना होगा।',
        en: 'Family court order: Rajesh Kumar must pay 12,000 rupees monthly maintenance to Sunita Devi by the 5th of every month.',
        bn: 'ফ্যামিলি কোর্টের রায়: রাজেশ কুমারকে মাসে ১২,০০০ টাকা খোরপোশ দিতে হবে।',
        ta: 'குடும்ப நீதிமன்ற உத்தரவு: ராஜேஷ் குமார் மாதம் ₹12,000 பராமரிப்புத் தொகை செலுத்த வேண்டும்.',
        te: 'ఫ్యామిలీ కోర్టు ఉత్తర్వు: రాజేష్ కుమార్ నెలకు ₹12,000 భరణం చెల్లించాలి.',
        mr: 'फॅमिली कोर्टाचा आदेश: दरमहा ₹12,000 पोटगी द्यावी लागेल.',
        gu: 'ફેમિલી કોર્ટનો આદેશ: દર મહિને ₹૧૨,૦૦૦ ભરણપોષણ આપવું પડશે.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 4,
      correctlyAttributed: 4,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Direct financial liability extraction.'
    }
  },
  {
    id: 'case-05-truncated-refusal',
    title: 'M/s Kanpur Logistics v. State Tax Officer (Page 1 of 3)',
    caseNumber: 'Writ Tax No. 309/2026',
    type: 'order',
    courtName: 'High Court of Judicature at Allahabad',
    photocopyStyle: 'truncated_page',
    isRefusalCase: true,
    demoHighlight: 'HONEST REFUSAL STATE: Only Page 1 captured containing submissions. Operative direction is on missing Page 2/3. System refuses rather than guessing outcome.',
    documentText: `IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD
Writ Tax No. 309 of 2026
M/s Kanpur Logistics ... Petitioner
Vs.
State Tax Officer, Sector 4, Kanpur ... Respondent

ORDER (DATED 05-06-2026) - PAGE 1 OF 3

Para 1: By means of this writ petition under Article 226 of the Constitution of India, the petitioner has challenged penalty order dated 12-05-2026 passed under Section 129(3) of CGST Act.

Para 2: The learned counsel for the petitioner vehemently argued that the goods were accompanied by valid e-way bill which expired merely 2 hours prior to interception due to vehicle breakdown.

Para 3: The learned Standing Counsel appearing for the revenue supported the seizure order submitting that extension of e-way bill validity was not sought within statutory 8 hours window... [PAGE TRUNCATED / CONTINUED ON PAGE 2]`,
    analysis: {
      documentId: 'case-05-truncated-refusal',
      title: 'M/s Kanpur Logistics v. State Tax Officer',
      caseNumber: 'Writ Tax No. 309/2026',
      courtName: 'High Court of Judicature at Allahabad',
      orderDate: '05-06-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: true,
      refusalReason: 'INCOMPLETE DOCUMENT (Page 1 of 3 captured). The operative court direction is absent on this page. The document contains only procedural recitals and counsel submissions.',
      refusalConfidence: 99,
      overallConfidence: 45,
      processedAt: '2026-07-25',
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'By means of this writ petition under Article 226 of the Constitution of India, the petitioner has challenged penalty order dated 12-05-2026 passed under Section 129(3) of CGST Act.', category: 'recital_proceedings', speaker: 'Recital', confidence: 99, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'The learned counsel for the petitioner vehemently argued that the goods were accompanied by valid e-way bill which expired merely 2 hours prior to interception due to vehicle breakdown.', category: 'petitioner_submission', speaker: 'Petitioner Counsel', confidence: 98, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'The learned Standing Counsel appearing for the revenue supported the seizure order submitting that extension of e-way bill validity was not sought within statutory 8 hours window...', category: 'respondent_submission', speaker: 'State Counsel', confidence: 97, provenance: 'human_verified' }
      ],
      nextSteps: [],
      plainLanguageExplanations: {
        hi: '⚠️ **अस्वीकृति सूचना (Refusal Notice)**: इस दस्तावेज़ का केवल पहला पन्ना (Page 1 of 3) अपलोड हुआ है। इसमें केवल दोनों पक्षों की बहस दर्ज है। जज साहब का मुख्य आदेश (Operative Direction) पन्ना 2 या 3 पर है जो गायब है। गलतफहमी से बचने के लिए सिस्टम कोई नतीजा नहीं बता रहा है। कृपया पूरा ऑर्डर अपलोड करें या कोर्ट क्लर्क से संपर्क करें।',
        en: '⚠️ **Refusal Notice**: Only Page 1 of 3 was captured. This page contains only counsel arguments. The court\'s operative direction is located on the missing subsequent pages. The system refuses to guess the outcome. Please upload pages 2 and 3.',
        bn: '⚠️ **প্রত্যাখ্যান বিজ্ঞপ্তি**: শুধুমাত্র ১ম পৃষ্ঠা পাওয়া গেছে। আদালতের মূল নির্দেশ ২ বা ৩ নম্বর পৃষ্ঠায় রয়েছে যা অনুপস্থিত। সিস্টেম অনুমানের ভিত্তিতে সিদ্ধান্ত জানাচ্ছে না। অনুগ্রহ করে বাকি পৃষ্ঠাগুলি আপলোড করুন।',
        ta: '⚠️ **மறுப்பு அறிவிப்பு**: 3 பக்கங்களில் பக்கம் 1 மட்டுமே உள்ளது. நீதிமன்றத்தின் இறுதி உத்தரவு அடுத்த பக்கங்களில் உள்ளது. தவறான தகவலைத் தவிர்க்க கணினி முடிவைக் கூற மறுக்கிறது.',
        te: '⚠️ **తిరస్కరణ ప్రకటన**: 3 పేజీల్లో మొదటి పేజీ మాత్రమే లభించింది. కోర్టు తుది ఉత్తర్వు తర్వాతి పేజీల్లో ఉంది. సిస్టమ్ ఊహించి ఫలితాన్ని చెప్పడం లేదు.',
        mr: '⚠️ **अस्वीकार सूचना**: 3 पैकी फक्त पान 1 अपलोड झाले आहे. कोर्टाचा मुख्य आदेश पुढील पानावर आहे.',
        gu: '⚠️ **અસ્વીકાર નોટિસ**: ૩ માંથી માત્ર ૧ લું પાનું મળ્યું છે. કોર્ટનો મુખ્ય આદેશ પછીના પાના પર છે.'
      },
      audioScripts: {
        hi: 'ध्यान दें! यह दस्तावेज़ अधूरा है। केवल पहला पन्ना अपलोड हुआ है जिसमें वकीलों की बहस है। कोर्ट का असली फैसला अगले पन्नों पर है जो गायब हैं। कृपया पूरा ऑर्डर अपलोड करें।',
        en: 'Attention! This order document is incomplete. Only page 1 is captured containing arguments. The court decision is on missing page 2. Please upload the complete order.',
        bn: 'সতর্কতা! এই আদেশটি অসম্পূর্ণ। বিচারকের রায় পরের পৃষ্ঠায় রয়েছে। দয়া করে সম্পূর্ণ কপি আপলোড করুন।',
        ta: 'கவனிக்கவும்! இந்த ஆவணம் அரைகுறையாக உள்ளது. நீதிமன்ற உத்தரவு அடுத்த பக்கத்தில் உள்ளது.',
        te: 'గమనిక! ఈ ఆర్డర్ కాపీ అసంపూర్తిగా ఉంది. కోర్టు తీర్పు తర్వాతి పేజీలో ఉంది.',
        mr: 'लक्ष द्या! हे कागदपत्र अपूर्ण आहे. मुख्य निकाल पुढील पानावर आहे.',
        gu: 'ધ્યાન આપો! આ દસ્તાવેજ અધૂરો છે. કોર્ટનો આદેશ પછીના પાના પર છે.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 3,
      correctlyAttributed: 3,
      operativeFound: false,
      honestlyRefused: true,
      notes: 'HONEST REFUSAL: System correctly triggered refusal state due to missing operative clause on page 1.'
    }
  },
  {
    id: 'case-06-ambiguous-notice-refusal',
    title: 'Rameshwar Dayal v. Municipal Corp. Kanpur',
    caseNumber: 'Misc. Case 104/2026',
    type: 'order',
    courtName: 'Court of Civil Judge, Kanpur Nagar',
    photocopyStyle: 'blurred_interlocutory',
    isRefusalCase: true,
    demoHighlight: 'REFUSAL STATE: Ambiguous procedural order issuing notice without any substantive ruling or operative direction.',
    documentText: `IN THE COURT OF CIVIL JUDGE, KANPUR NAGAR
Misc. Case No. 104 of 2026
Rameshwar Dayal ... Applicant

ORDER (DATED 02-07-2026)

Para 1: Issue notice to the respondents on steps being taken within 7 days by registered post AD as well as ordinary process.

Para 2: Put up on 18-09-2026 for service report and further orders.

Sd/-
Civil Judge, Kanpur`,
    analysis: {
      documentId: 'case-06-ambiguous-notice-refusal',
      title: 'Rameshwar Dayal v. Municipal Corp.',
      caseNumber: 'Misc. Case 104/2026',
      courtName: 'Court of Civil Judge, Kanpur Nagar',
      orderDate: '02-07-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: true,
      refusalReason: 'INTERLOCUTORY PROCEDURAL NOTICE ONLY. The court has not decided or passed any substantive operative order on rights or liabilities. It has merely directed issuance of notice.',
      refusalConfidence: 96,
      overallConfidence: 50,
      processedAt: '2026-07-25',
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Issue notice to the respondents on steps being taken within 7 days by registered post AD as well as ordinary process.', category: 'court_direction', speaker: 'Court Procedural Order', confidence: 95, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Put up on 18-09-2026 for service report and further orders.', category: 'recital_proceedings', speaker: 'Court Listing', confidence: 95, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Take steps to issue registered notice to respondents', deadline: 'Within 7 days', forum: 'Civil Judge Kanpur Court Registry', sourceParagraphId: 'p1', quotedSource: 'Issue notice to the respondents on steps being taken within 7 days' }
      ],
      plainLanguageExplanations: {
        hi: '⚠️ **अस्वीकृति / प्रक्रियात्मक सूचना**: कोर्ट ने अभी आपके मामले में कोई अंतिम या अंतरिम फैसला (Win/Loss) नहीं दिया है। कोर्ट ने केवल विपक्षी पार्टी को नोटिस जारी करने का आदेश दिया है। आपको 7 दिनों के भीतर कोर्ट रजिस्ट्री में नोटिस की पैरवी/फीस जमा करनी है। अगली तारीख 18-09-2026 है।',
        en: '⚠️ **Procedural Notice Only**: The court has NOT decided your case yet. It has only issued a notice to the opposite party. You need to file process fees/notice steps in the court registry within 7 days. Next date is 18th Sept 2026.',
        bn: '⚠️ **শুধুমাত্র নোটিশ বিজ্ঞপ্তি**: আদালত এখনো কোনো সিদ্ধান্ত দেয়নি, কেবল বিপক্ষ পক্ষকে নোটিশ পাঠানোর নির্দেশ দিয়েছে। ৭ দিনের মধ্যে রেজিস্ট্রি প্রক্রিয়ার পদক্ষেপ নিন।',
        ta: '⚠️ **செயல்முறை அறிவிப்பு மட்டுமே**: நீதிமன்றம் இன்னும் எந்த முடிவும் எடுக்கவில்லை. எதிர்மனுதாரருக்கு நோட்டீஸ் அனுப்ப மட்டுமே உத்தரவிட்டுள்ளது.',
        te: '⚠️ **కేవలం ప్రక్రియాత్మక నోటీసు**: కోర్టు ఇంకా ఎలాంటి తీర్పు ఇవ్వలేదు. కేవలం ఎదుటి పక్షానికి నోటీసు ఇవ్వాలని ఆదేశించింది.',
        mr: '⚠️ **फक्त प्रक्रियात्मक नोटीस**: कोर्टाने अद्याप कोणताही निकाल दिलेला नाही, फक्त नोटीस पाठवण्याचे आदेश दिले आहेत.',
        gu: '⚠️ **માત્ર પ્રક્રિયાત્મક નોટિસ**: કોર્ટે હજુ સુધી કોઈ નિર્ણય આપ્યો નથી, માત્ર સામી પક્ષને નોટિસ મોકલવાનો આદેશ આપ્યો છે.'
      },
      audioScripts: {
        hi: 'ध्यान दें, कोर्ट ने अभी हार-जीत का कोई फैसला नहीं सुनाया है। केवल दूसरी पार्टी को नोटिस भेजने का हुक्म दिया है। आपको सात दिन में नोटिस की पैरवी करनी है।',
        en: 'Note that the court has not passed any win or loss order. It has only issued notice to the second party. Next hearing is September 18.',
        bn: 'আদালত এখনো কোনো রায় দেয়নি, কেবল নোটিশ জারির নির্দেশ দিয়েছে।',
        ta: 'நீதிமன்றம் இன்னும் முடிவெடுக்கவில்லை, நோட்டீஸ் அனுப்ப மட்டுமே உத்தரவிட்டுள்ளது.',
        te: 'కోర్టు ఇంకా ఎలాంటి నిర్ణయం తీసుకోలేదు, కేవలం నోటీసు ఇవ్వమని తెలిపింది.',
        mr: 'कोर्टाने अद्याप कोणताही निर्णय दिलेला नाही.',
        gu: 'કોર્ટે હજુ સુધી કોઈ આખરી નિર્ણય આપ્યો નથી.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 2,
      correctlyAttributed: 2,
      operativeFound: false,
      honestlyRefused: true,
      notes: 'HONEST REFUSAL: Interlocutory notice correctly identified as procedural non-substantive order.'
    }
  },
  {
    id: 'case-07-judgment-dismissal',
    title: 'M/s Kanpur Steel Traders v. Union of India (Full Judgment)',
    caseNumber: 'Commercial Suit No. 14/2026',
    type: 'judgment',
    courtName: 'Commercial Court, Kanpur Nagar',
    photocopyStyle: 'handwritten_margin_notes',
    isRefusalCase: false,
    demoHighlight: 'Full Judgment Demo: 6-paragraph suit dismissal with ₹15,000 cost awarded to Legal Services Authority.',
    documentText: `IN THE COMMERCIAL COURT, KANPUR NAGAR
Commercial Suit No. 14 of 2026
M/s Kanpur Steel Traders ... Plaintiff
Vs.
Union of India (North Central Railway) ... Defendant

JUDGMENT (DATED 08-07-2026)

Para 1: Plaintiff filed present suit for recovery of Rs. 4,50,000/- along with 18% interest alleging non-payment for steel supply under tender contract dated 10-01-2024.

Para 2: Learned advocate for plaintiff argued that goods were delivered at Railway Yard Kanpur and inspection certificates were duly endorsed.

Para 3: Learned advocate for defendant Railway submitted that supplied steel failed quality audit specifications prescribed in clause 14 and was rejected vide notice dated 05-03-2024.

Para 4: Court framed Issue No. 1: "Whether plaintiff delivered goods as per contract specifications?" Court Commissioner report confirms sample carbon content was 0.8% against required 0.2%.

Para 5: In view of material failure to comply with quality specifications, plaintiff is not entitled to recover any amount under the repudiated contract.

Para 6: ACCORDINGLY, the suit is DISMISSED WITH COSTS. Plaintiff M/s Kanpur Steel Traders is directed to deposit compensatory costs of Rs. 15,000/- before District Legal Services Authority (DLSA) Kanpur within 30 days.

Sd/-
District Judge, Commercial Court, Kanpur`,
    analysis: {
      documentId: 'case-07-judgment-dismissal',
      title: 'Kanpur Steel Traders v. Union of India',
      caseNumber: 'Commercial Suit No. 14/2026',
      courtName: 'Commercial Court, Kanpur Nagar',
      orderDate: '08-07-2026',
      isPhotocopyQuality: false,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 98,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'ACCORDINGLY, the suit is DISMISSED WITH COSTS. Plaintiff M/s Kanpur Steel Traders is directed to deposit compensatory costs of Rs. 15,000/- before District Legal Services Authority (DLSA) Kanpur within 30 days.',
      operativeParagraphNumbers: [5, 6],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Plaintiff filed present suit for recovery of Rs. 4,50,000/- along with 18% interest alleging non-payment for steel supply under tender contract dated 10-01-2024.', category: 'petitioner_submission', speaker: 'Plaintiff Claim', confidence: 98, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Learned advocate for plaintiff argued that goods were delivered at Railway Yard Kanpur and inspection certificates were duly endorsed.', category: 'petitioner_submission', speaker: 'Plaintiff Counsel', confidence: 97, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'Learned advocate for defendant Railway submitted that supplied steel failed quality audit specifications prescribed in clause 14 and was rejected vide notice dated 05-03-2024.', category: 'respondent_submission', speaker: 'Defendant Railway Counsel', confidence: 98, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'Court framed Issue No. 1: "Whether plaintiff delivered goods as per contract specifications?" Court Commissioner report confirms sample carbon content was 0.8% against required 0.2%.', category: 'court_direction', speaker: 'Court Finding / Analysis', confidence: 96, provenance: 'human_verified' },
        { id: 'p5', paragraphNumber: 5, text: 'In view of material failure to comply with quality specifications, plaintiff is not entitled to recover any amount under the repudiated contract.', category: 'court_direction', speaker: 'Court Finding', confidence: 97, provenance: 'human_verified' },
        { id: 'p6', paragraphNumber: 6, text: 'ACCORDINGLY, the suit is DISMISSED WITH COSTS. Plaintiff M/s Kanpur Steel Traders is directed to deposit compensatory costs of Rs. 15,000/- before District Legal Services Authority (DLSA) Kanpur within 30 days.', category: 'court_direction', speaker: 'Hon\'ble Court Operative Judgment', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Deposit ₹15,000 compensatory costs (Plaintiff liability)', deadline: 'Within 30 days (by 7th August 2026)', forum: 'District Legal Services Authority (DLSA), Kanpur Nagar', sourceParagraphId: 'p6', quotedSource: 'Plaintiff M/s Kanpur Steel Traders is directed to deposit compensatory costs of Rs. 15,000/- before District Legal Services Authority (DLSA) Kanpur within 30 days.' }
      ],
      plainLanguageExplanations: {
        hi: 'कानपुर स्टील ट्रेडर्स का केस खारिज (Dismiss) कर दिया गया है! खराब स्टील सप्लाई के कारण कोर्ट ने कोई भुगतान नहीं दिलाया। उल्टा वादी (Plaintiff) पर ₹15,000 का जुर्माना लगाया गया है जो 30 दिनों के भीतर जिला विधिक सेवा प्राधिकरण (DLSA) कानपुर में जमा करना होगा।',
        en: 'The lawsuit filed by Kanpur Steel Traders has been DISMISSED! No money will be recovered from Railways. Additionally, Plaintiff must pay ₹15,000 costs to District Legal Services Authority (DLSA) Kanpur within 30 days.',
        bn: 'কানপুর স্টিল ট্রেডার্সের মামলাটি খারিজ করা হয়েছে! উল্টে বাদীকে ৩০ দিনের মধ্যে ১৫,০০০ টাকা জরিমানা লিগ্যাল সার্ভিস অথরিটিতে জমা দিতে হবে।',
        ta: 'கான்பூர் ஸ்டீல் டிரேடர்ஸின் வழக்கு தள்ளுபடி செய்யப்பட்டது! மேலும், வாதி 30 நாட்களுக்குள் மாவட்ட சட்ட சேவைகள் ஆணையத்தில் ₹15,000 அபராதம் செலுத்த வேண்டும்.',
        te: 'కాన్పూర్ స్టీల్ ట్రేడర్స్ దాఖలు చేసిన దావా కొట్టివేయబడింది! వాది 30 రోజుల్లోగా జిల్లా లీగల్ సర్వీసెస్ అథారిటీకి ₹15,000 నష్టపరిహారం చెల్లించాలి.',
        mr: 'कानपूर स्टील ट्रेडर्सचा दावा फेटाळण्यात आला आहे! वाद्याला 30 दिवसांत DLSA कडे ₹15,000 दंड जमा करावा लागेल.',
        gu: 'કાનપુર સ્ટીલ ટ્રેડર્સનો કેસ ફગાવી દેવામાં આવ્યો છે! ૧૫,૦૦૦ રૂપિયાનો દંડ ૩૦ દિવસમાં DLSA કાનપુરમાં જમા કરાવવો પડશે.'
      },
      audioScripts: {
        hi: 'कमर्शियल कोर्ट ने दावा खारिज कर दिया है। रेलवे से कोई पैसा नहीं मिलेगा। वादी कंपनी को तीस दिन में पंद्रह हजार रुपये हर्जाना डीएलएसए में जमा करना होगा।',
        en: 'Judgment: The suit is dismissed with costs. The plaintiff must deposit 15,000 rupees cost at Kanpur DLSA within 30 days.',
        bn: 'রায়: মামলা বাতিল করা হয়েছে। ১৫,০০০ টাকা জরিমানা দিতে হবে।',
        ta: 'தீர்ப்பு: வழக்கு தள்ளுபடி செய்யப்பட்டது. ₹15,000 அபராதம் செலுத்த வேண்டும்.',
        te: 'తీర్పు: దావా కొట్టివేయబడింది. ₹15,000 నష్టపరిహారం చెల్లించాలి.',
        mr: 'निकाल: दावा फेटाळला आहे. ₹15,000 दंड भरावा लागेल.',
        gu: 'ચુકાદો: કેસ રદ થયો છે. ૧૫,૦૦૦ દંડ ભરવો પડશે.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 6,
      correctlyAttributed: 6,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Full Judgment generalization test passed.'
    }
  },
  {
    id: 'case-08-tenancy-written-statement',
    title: 'Gupta Traders v. Shiv Kumar (Eviction Suit)',
    caseNumber: 'Eviction Suit 77/2026',
    type: 'order',
    courtName: 'Senior Civil Judge, Kanpur Nagar',
    photocopyStyle: 'skewed_typewritten',
    isRefusalCase: false,
    demoHighlight: 'Order VII Rule 11 Application Dismissed: Defendant directed to file Written Statement by 18th Sept 2026.',
    documentText: `IN THE COURT OF SENIOR CIVIL JUDGE, KANPUR NAGAR
Eviction Suit No. 77 of 2026
Gupta Traders ... Landlord / Plaintiff
Vs.
Shiv Kumar ... Tenant / Defendant

ORDER (DATED 19-07-2026)

Para 1: Defendant Shiv Kumar filed application 14C under Order VII Rule 11 CPC seeking rejection of plaint on ground of lack of notice under Section 106 Transfer of Property Act.

Para 2: Plaintiff argued that tenancy notice was duly dispatched by registered post on 10-01-2026 and postal track receipt is attached.

Para 3: The question of validity of notice is a mixed question of fact and law requiring trial evidence. Application 14C is accordingly REJECTED.

Para 4: Defendant Shiv Kumar is directed to file Written Statement (WS) positively on or before 18th September 2026 with advance copy to plaintiff.

Sd/-
Sr Civil Judge, Kanpur`,
    analysis: {
      documentId: 'case-08-tenancy-written-statement',
      title: 'Gupta Traders v. Shiv Kumar',
      caseNumber: 'Eviction Suit 77/2026',
      courtName: 'Senior Civil Judge, Kanpur Nagar',
      orderDate: '19-07-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 97,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'Application 14C is accordingly REJECTED. Defendant Shiv Kumar is directed to file Written Statement (WS) positively on or before 18th September 2026 with advance copy to plaintiff.',
      operativeParagraphNumbers: [3, 4],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Defendant Shiv Kumar filed application 14C under Order VII Rule 11 CPC seeking rejection of plaint on ground of lack of notice under Section 106 Transfer of Property Act.', category: 'respondent_submission', speaker: 'Defendant Application', confidence: 98, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Plaintiff argued that tenancy notice was duly dispatched by registered post on 10-01-2026 and postal track receipt is attached.', category: 'petitioner_submission', speaker: 'Plaintiff Response', confidence: 97, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'The question of validity of notice is a mixed question of fact and law requiring trial evidence. Application 14C is accordingly REJECTED.', category: 'court_direction', speaker: 'Court Finding', confidence: 99, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'Defendant Shiv Kumar is directed to file Written Statement (WS) positively on or before 18th September 2026 with advance copy to plaintiff.', category: 'court_direction', speaker: 'Hon\'ble Court Operative Part', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'File Written Statement (WS) in court with copy to landlord', deadline: 'On or before 18th September 2026', forum: 'Senior Civil Judge, Kanpur Nagar Court', sourceParagraphId: 'p4', quotedSource: 'Defendant Shiv Kumar is directed to file Written Statement (WS) positively on or before 18th September 2026' }
      ],
      plainLanguageExplanations: {
        hi: 'किरायेदार शिव कुमार की केस खारिज कराने वाली अर्जी कोर्ट ने खारिज कर दी है! अब शिव कुमार को 18 सितंबर 2026 तक कोर्ट में अपना लिखित जवाब (Written Statement / WS) दाखिल करना होगा।',
        en: 'The court REJECTED tenant Shiv Kumar\'s plea to dismiss the suit. Defendant Shiv Kumar must now file his Written Statement (WS) in court on or before 18th September 2026.',
        bn: 'ভাড়াটে শিব কুমারের আবেদন বাতিল হয়েছে। তাকে ১৮ই সেপ্টেম্বর ২০২৬ এর মধ্যে লিখিত জবাব (Written Statement) জমা দিতে হবে।',
        ta: 'வாடகைதாரர் சிவகுமாரின் மனு நிராகரிக்கப்பட்டது! செப்டம்பர் 18, 2026-க்குள் அவர் தனது எழுத்துப்பூர்வ பதிலைத் தாக்கல் செய்ய வேண்டும்.',
        te: 'అద్దెదారు శివ్ కుమార్ దరఖాస్తును కోర్టు కొట్టివేసింది! సెప్టెంబర్ 18, 2026 నాటికి ఆయన తన లిఖితపూర్వక సమాధానం (WS) కోర్టులో దాఖలు చేయాలి.',
        mr: 'भाडेकरू शिव कुमार यांचा अर्ज फेटाळला आहे! त्यांना 18 सप्टेंबर 2026 पर्यंत कोर्टात लेखी उत्तर दाखल करावे लागेल.',
        gu: 'ભાડૂઆત શિવ કુમારની અરજી રદ થઈ છે! તેમણે ૧૮ સપ્ટેમ્બર ૨૦૨૬ સુધીમાં લિખિત જવાબ (WS) દાખલ કરવાનો રહેશે.'
      },
      audioScripts: {
        hi: 'शिव कुमार जी, केस खारिज कराने की आपकी अर्जी खारिज हो गई है। आपको 18 सितंबर तक कोर्ट में अपना लिखित जवाब दाखिल करना होगा।',
        en: 'Tenant Shiv Kumar, your application was rejected. You must file your Written Statement by September 18, 2026.',
        bn: 'শিব কুমার মহাশয়, আগামী ১৮ই সেপ্টেম্বরের মধ্যে লিখিত জবাব দিন।',
        ta: 'சிவகுமார், செப்டம்பர் 18-க்குள் உங்கள் எழுத்துப்பூர்வ பதிலை தாக்கல் செய்யுங்கள்.',
        te: 'శివ్ కుమార్ గారు, సెప్టెంబర్ 18 లోగా మీ లిఖితపూర్వక సమాధానం సమర్పించండి.',
        mr: 'शिव कुमार जी, 18 सप्टेंबरपर्यंत लेखी उत्तर दाखल करा.',
        gu: 'શિવ કુમારજી, ૧૮ સપ્ટેમ્બર સુધીમાં જવાબ દાખલ કરો.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 4,
      correctlyAttributed: 4,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Procedure deadline extracted accurately.'
    }
  },
  {
    id: 'case-09-anticipatory-bail',
    title: 'Dr. Alok Nath v. State of UP (Anticipatory Bail)',
    caseNumber: 'Anticipatory Bail 801/2026',
    type: 'order',
    courtName: 'High Court of Judicature at Allahabad',
    photocopyStyle: 'clean_scanned_seal',
    isRefusalCase: false,
    demoHighlight: 'Anticipatory Bail Granted: In event of arrest, release on personal bond of ₹1,000,000 + join investigation.',
    documentText: `IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD
Anticipatory Bail Application No. 801 of 2026
Dr. Alok Nath ... Applicant
Vs.
State of Uttar Pradesh ... Opp. Party

ORDER (DATED 14-07-2026)

Para 1: Applicant Dr. Alok Nath seeks anticipatory bail in FIR No. 112/2026 under Sections 420, 468 IPC, P.S. Swaroop Nagar, Kanpur Nagar.

Para 2: Learned counsel for applicant submitted that applicant is a senior medical practitioner and allegation of medical billing fraud is based on inter-departmental dispute.

Para 3: Learned AGA submitted that custodial interrogation is necessary to recover audited billing logs.

Para 4: In the event of arrest of applicant Dr. Alok Nath in FIR No. 112/2026, he shall be released on anticipatory bail on executing a personal bond of Rs. 1,00,000/- with two sureties each in like amount to satisfaction of Arresting Officer/Investigating Officer. Applicant shall cooperate with investigation and join questioning whenever summoned.

Sd/-
Judge, High Court Allahabad`,
    analysis: {
      documentId: 'case-09-anticipatory-bail',
      title: 'Dr. Alok Nath v. State',
      caseNumber: 'Anticipatory Bail 801/2026',
      courtName: 'High Court of Judicature at Allahabad',
      orderDate: '14-07-2026',
      isPhotocopyQuality: false,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 99,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'In the event of arrest of applicant Dr. Alok Nath in FIR No. 112/2026, he shall be released on anticipatory bail on executing a personal bond of Rs. 1,00,000/- with two sureties each in like amount to satisfaction of Arresting Officer/Investigating Officer. Applicant shall cooperate with investigation and join questioning whenever summoned.',
      operativeParagraphNumbers: [4],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Applicant Dr. Alok Nath seeks anticipatory bail in FIR No. 112/2026 under Sections 420, 468 IPC, P.S. Swaroop Nagar, Kanpur Nagar.', category: 'recital_proceedings', speaker: 'Recital', confidence: 99, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Learned counsel for applicant submitted that applicant is a senior medical practitioner and allegation of medical billing fraud is based on inter-departmental dispute.', category: 'petitioner_submission', speaker: 'Applicant Counsel', confidence: 98, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'Learned AGA submitted that custodial interrogation is necessary to recover audited billing logs.', category: 'respondent_submission', speaker: 'State AGA', confidence: 97, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'In the event of arrest of applicant Dr. Alok Nath in FIR No. 112/2026, he shall be released on anticipatory bail on executing a personal bond of Rs. 1,00,000/- with two sureties each in like amount to satisfaction of Arresting Officer/Investigating Officer. Applicant shall cooperate with investigation and join questioning whenever summoned.', category: 'court_direction', speaker: 'Hon\'ble High Court Operative', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Join police investigation whenever summoned and execute ₹1,00,000 bond if arrest attempted', deadline: 'Immediate / whenever summoned', forum: 'P.S. Swaroop Nagar, Kanpur Nagar', sourceParagraphId: 'p4', quotedSource: 'executing a personal bond of Rs. 1,00,000/- with two sureties... Applicant shall cooperate with investigation' }
      ],
      plainLanguageExplanations: {
        hi: 'डॉ. आलोक नाथ जी को हाईकोर्ट से अग्रिम ज़मानत (Anticipatory Bail) मिल गई है! अगर पुलिस आपको गिरफ्तार करने आती है तो ₹1,00,000 का बॉन्ड और दो ज़मानतें देकर तुरंत रिहाई मिलेगी। आपको पुलिस जांच में सहयोग करना होगा और जब बुलाया जाए जाना होगा।',
        en: 'Dr. Alok Nath has been GRANTED Anticipatory Bail! If arrested by police, he must be immediately released upon furnishing a personal bond of ₹1,00,000 and two sureties. He must cooperate with police investigation.',
        bn: 'ডঃ অলোক নাথ আগাম জামিন পেয়েছেন! গ্রেফতারের চেষ্টা হলে ১,০০,০০০ টাকার বন্ডে মুক্তি মিলবে। তবে তদন্তে সহযোগিতা করতে হবে।',
        ta: 'டாக்டர் அலோக் நாத்திற்கு முன்ஜாமீன் வழங்கப்பட்டுள்ளது! கைது செய்யப்பட்டால் ₹1,00,000 பிணை செலுத்தி உடனடியாக விடுவிக்கப்பட வேண்டும்.',
        te: 'డాక్టర్ అలోక్ నాథ్‌కు ముందస్తు బెయిల్ మంజూరైంది! అరెస్ట్ చేసినట్లయితే ₹1,00,000 బాండ్ సమర్పించి తక్షణమే విడుదల చేయాలి.',
        mr: 'डॉ. आलोक नाथ यांना अटकपूर्व जामीन मंजूर झाला आहे! अटकेच्या वेळी ₹1,00,000 चा बाँड देऊन सुटका होईल.',
        gu: 'ડૉ. આલોક નાથને અગાઉથી જામીન (Anticipatory Bail) મળી ગયા છે! ધરપકડ થાય તો ૧,૦૦,૦૦૦ ના બોન્ડ પર જામીન મળશે.'
      },
      audioScripts: {
        hi: 'डॉक्टर साहब, अग्रिम ज़मानत मिल गई है। पुलिस आपको जेल नहीं भेज सकती। बुलावा आने पर जांच में शामिल होना होगा।',
        en: 'Dr. Alok Nath, anticipatory bail is granted. If arrested, submit 1 lakh bond for immediate release.',
        bn: 'ডঃ অলোক নাথ, আগাম জামিন মঞ্জুর হয়েছে।',
        ta: 'டாக்டர் அலோக் நாத், முன்ஜாமீன் கிடைத்துவிட்டது.',
        te: 'డాక్టర్ అలోక్ నాథ్, ముందస్తు బెయిల్ మంజూరైంది.',
        mr: 'डॉक्टर साहेब, अटकपूर्व जामीन मंजूर झाला आहे.',
        gu: 'ડૉક્ટર સાહેબ, અગાઉથી જામીન મળી ગયા છે.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 4,
      correctlyAttributed: 4,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Protection against arrest isolated.'
    }
  },
  {
    id: 'case-10-execution-warrant',
    title: 'Kanpur Finance Co. v. Mahesh Prasad (Execution)',
    caseNumber: 'Execution Case 90/2026',
    type: 'order',
    courtName: 'Sub-Judge First Class, Kanpur Nagar',
    photocopyStyle: 'distorted_photocopy_stamp',
    isRefusalCase: false,
    demoHighlight: 'Warrant of Attachment Issued: Moveable property attachment executable on or before 30th Sept 2026 unless decree amount ₹85,000 deposited.',
    documentText: `IN THE COURT OF SUB-JUDGE FIRST CLASS, KANPUR NAGAR
Execution Case No. 90 of 2026
Kanpur Finance Co. ... Decree Holder
Vs.
Mahesh Prasad ... Judgment Debtor

EXECUTION ORDER (DATED 11-07-2026)

Para 1: Decree holder filed execution petition for recovery of decretal amount of Rs. 85,000/- under award dated 15-12-2025.

Para 2: Judgment debtor failed to deposit decretal amount despite service of notice under Order XXI Rule 22 CPC.

Para 3: Issue Warrant of Attachment against moveable properties of judgment debtor Mahesh Prasad for recovery of Rs. 85,000/- plus execution costs Rs. 3,500/-.

Para 4: Court Amin is directed to execute warrant on or before 30th September 2026, unless judgment debtor deposits full decretal amount before execution.

Sd/-
Sub-Judge Ist, Kanpur`,
    analysis: {
      documentId: 'case-10-execution-warrant',
      title: 'Kanpur Finance v. Mahesh Prasad',
      caseNumber: 'Execution Case 90/2026',
      courtName: 'Sub-Judge First Class, Kanpur Nagar',
      orderDate: '11-07-2026',
      isPhotocopyQuality: true,
      hasSealsAndSkew: true,
      isRefusalState: false,
      overallConfidence: 98,
      processedAt: '2026-07-25',
      operativeDirectionVerbatim: 'Issue Warrant of Attachment against moveable properties of judgment debtor Mahesh Prasad for recovery of Rs. 85,000/- plus execution costs Rs. 3,500/-. Court Amin is directed to execute warrant on or before 30th September 2026, unless judgment debtor deposits full decretal amount before execution.',
      operativeParagraphNumbers: [3, 4],
      paragraphs: [
        { id: 'p1', paragraphNumber: 1, text: 'Decree holder filed execution petition for recovery of decretal amount of Rs. 85,000/- under award dated 15-12-2025.', category: 'recital_proceedings', speaker: 'Recital', confidence: 98, provenance: 'human_verified' },
        { id: 'p2', paragraphNumber: 2, text: 'Judgment debtor failed to deposit decretal amount despite service of notice under Order XXI Rule 22 CPC.', category: 'recital_proceedings', speaker: 'Recital', confidence: 97, provenance: 'human_verified' },
        { id: 'p3', paragraphNumber: 3, text: 'Issue Warrant of Attachment against moveable properties of judgment debtor Mahesh Prasad for recovery of Rs. 85,000/- plus execution costs Rs. 3,500/-.', category: 'court_direction', speaker: 'Hon\'ble Executing Court', confidence: 99, provenance: 'human_verified' },
        { id: 'p4', paragraphNumber: 4, text: 'Court Amin is directed to execute warrant on or before 30th September 2026, unless judgment debtor deposits full decretal amount before execution.', category: 'court_direction', speaker: 'Hon\'ble Executing Court Operative', confidence: 99, provenance: 'human_verified' }
      ],
      nextSteps: [
        { id: 'ns-1', action: 'Deposit ₹88,500 (₹85,000 + ₹3,500 costs) in court to prevent property attachment', deadline: 'On or before 30th September 2026', forum: 'Sub-Judge First Class, Kanpur Nagar Court', sourceParagraphId: 'p4', quotedSource: 'execute warrant on or before 30th September 2026, unless judgment debtor deposits full decretal amount' }
      ],
      plainLanguageExplanations: {
        hi: 'महेश प्रसाद जी, कोर्ट ने आपकी संपत्ति की कुर्की (Attachment Warrant) का आदेश जारी कर दिया है! अगर आप 30 सितंबर 2026 से पहले ₹85,000 मूल धन + ₹3,500 कोर्ट खर्च (कुल ₹88,500) जमा नहीं करते हैं, तो कोर्ट आमीन आपकी चल संपत्ति कुर्क कर सकता है।',
        en: 'The court has issued an Attachment Warrant against Mahesh Prasad\'s moveable property! To avoid property attachment, deposit ₹88,500 (₹85,000 + ₹3,500 costs) in court before 30th September 2026.',
        bn: 'কোর্ট আপনার সম্পত্তি ক্রোক করার পরোয়ানা জারি করেছে! জব্ধ এড়াতে ৩০শে সেপ্টেম্বরের আগে ৮৮,৫০০ টাকা জমা দিন।',
        ta: 'நீதிமன்றம் உங்கள் அசையும் சொத்துக்களை பறிமுதல் செய்ய உத்தரவிட்டுள்ளது! செப்டம்பர் 30-க்குள் ₹88,500 நீதிமன்றத்தில் செலுத்த வேண்டும்.',
        te: 'మీ చర ఆస్తుల జప్తుకు కోర్టు వారెంట్ జారీ చేసింది! జప్తు తప్పించుకోవడానికి సెప్టెంబర్ 30 లోగా ₹88,500 కోర్టులో చెల్లించండి.',
        mr: 'कोर्टाने तुमच्या मालमत्तेच्या जप्तीचे वॉरंट काढले आहे! जप्ती टाळण्यासाठी 30 सप्टेंबरपूर्वी ₹88,500 भरा.',
        gu: 'કોર્ટે જપ્તી વોરંટ આપ્યું છે! ૩૦ સપ્ટેમ્બર પહેલા ₹૮૮,૫૦૦ જમા કરાવી જપ્તી અટકાવો.'
      },
      audioScripts: {
        hi: 'महेश प्रसाद जी, कुर्की का वारंट जारी हो गया है। सामान जब्त होने से बचाने के लिए 30 सितंबर से पहले 88,500 रुपये कोर्ट में जमा करा दें।',
        en: 'Mahesh Prasad, attachment warrant issued. Deposit 88,500 rupees in court before September 30 to avoid property attachment.',
        bn: '৩০শে সেপ্টেম্বরের আগে ৮৮,৫০০ টাকা জমা দিয়ে জব্ধ আটকান।',
        ta: 'செப்டம்பர் 30-க்குள் ₹88,500 செலுத்தி சொத்து பறிமுதலைத் தவிர்க்கவும்.',
        te: 'సెప్టెంబర్ 30 లోగా ₹88,500 చెల్లించండి.',
        mr: '30 सप्टेंबरपूर्वी रक्कम भरून जप्ती टाळा.',
        gu: '૩૦ સપ્ટેમ્બર પહેલા નાણાં જમા કરાવો.'
      }
    },
    humanGroundTruth: {
      totalParagraphs: 4,
      correctlyAttributed: 4,
      operativeFound: true,
      honestlyRefused: false,
      notes: 'Execution warrant timeline and amount isolated.'
    }
  }
];
