import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, Sparkles, Bot, X, RefreshCw } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface VoiceAIAgentProps {
  analysis: AnalysisResult;
  selectedLanguage: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  keyFact?: string;
}

const VOICE_CORE_LABELS: Record<SupportedLanguage, {
  document: string;
  autoSpeakOn: string;
  autoSpeakOff: string;
  you: string;
  greeting: string;
  operativeRuling: string;
  transcribingDetail: string;
  voiceUnavailable: string;
  transcriptionFailed: string;
  recordingUnsupported: string;
  microphoneRequired: string;
  answerFailed: string;
}> = {
  en: {
    document: 'Document:',
    autoSpeakOn: 'Automatic spoken responses are on',
    autoSpeakOff: 'Automatic spoken responses are off',
    you: 'You',
    greeting: 'Hello! I am NyayVaani Voice AI. I have read your court order. Ask me anything about it in your language.',
    operativeRuling: 'Operative ruling',
    transcribingDetail: 'Turning your voice into text...',
    voiceUnavailable: 'Voice AI is temporarily unavailable.',
    transcriptionFailed: 'The recording could not be understood. Please try again or type your question.',
    recordingUnsupported: 'Audio recording is not supported in this browser. You can type your question instead.',
    microphoneRequired: 'Microphone access is needed to ask by voice. You can type your question instead.',
    answerFailed: 'Voice AI could not answer that question right now. Please try again.',
  },
  hi: {
    document: 'दस्तावेज़:',
    autoSpeakOn: 'जवाब अपने-आप बोलकर सुनाना चालू है',
    autoSpeakOff: 'जवाब अपने-आप बोलकर सुनाना बंद है',
    you: 'आप',
    greeting: 'नमस्ते! मैं न्यायवाणी वॉइस AI हूं। मैंने आपका अदालत आदेश पढ़ लिया है। इसके बारे में अपनी भाषा में कुछ भी पूछें।',
    operativeRuling: 'मुख्य अदालती आदेश',
    transcribingDetail: 'आपकी आवाज़ को लिखित पाठ में बदला जा रहा है...',
    voiceUnavailable: 'वॉइस AI अभी उपलब्ध नहीं है।',
    transcriptionFailed: 'रिकॉर्डिंग समझी नहीं जा सकी। फिर कोशिश करें या अपना सवाल लिखें।',
    recordingUnsupported: 'इस ब्राउज़र में ऑडियो रिकॉर्डिंग उपलब्ध नहीं है। आप सवाल लिख सकते हैं।',
    microphoneRequired: 'आवाज़ से पूछने के लिए माइक्रोफ़ोन की अनुमति चाहिए। आप सवाल लिख सकते हैं।',
    answerFailed: 'वॉइस AI अभी इस सवाल का जवाब नहीं दे सका। कृपया फिर कोशिश करें।',
  },
  bn: {
    document: 'নথি:',
    autoSpeakOn: 'উত্তর স্বয়ংক্রিয়ভাবে পড়া চালু আছে',
    autoSpeakOff: 'উত্তর স্বয়ংক্রিয়ভাবে পড়া বন্ধ আছে',
    you: 'আপনি',
    greeting: 'নমস্কার! আমি ন্যায়বাণী ভয়েস AI। আপনার আদালতের আদেশটি পড়েছি। নিজের ভাষায় এ সম্পর্কে যেকোনো প্রশ্ন করুন।',
    operativeRuling: 'আদালতের মূল নির্দেশ',
    transcribingDetail: 'আপনার কণ্ঠকে লেখায় রূপান্তর করা হচ্ছে...',
    voiceUnavailable: 'ভয়েস AI এখন সাময়িকভাবে পাওয়া যাচ্ছে না।',
    transcriptionFailed: 'রেকর্ডিংটি বোঝা যায়নি। আবার চেষ্টা করুন অথবা প্রশ্নটি লিখুন।',
    recordingUnsupported: 'এই ব্রাউজারে অডিও রেকর্ডিং সমর্থিত নয়। প্রশ্নটি লিখতে পারেন।',
    microphoneRequired: 'কণ্ঠে প্রশ্ন করতে মাইক্রোফোনের অনুমতি প্রয়োজন। প্রশ্নটি লিখতেও পারেন।',
    answerFailed: 'ভয়েস AI এখন প্রশ্নটির উত্তর দিতে পারেনি। আবার চেষ্টা করুন।',
  },
  ta: {
    document: 'ஆவணம்:',
    autoSpeakOn: 'பதில்களைத் தானாகப் பேசுவது இயக்கப்பட்டுள்ளது',
    autoSpeakOff: 'பதில்களைத் தானாகப் பேசுவது நிறுத்தப்பட்டுள்ளது',
    you: 'நீங்கள்',
    greeting: 'வணக்கம்! நான் நியாயவாணி குரல் AI. உங்கள் நீதிமன்ற உத்தரவைப் படித்துள்ளேன். இதைப் பற்றி உங்கள் மொழியில் எந்தக் கேள்வியையும் கேளுங்கள்.',
    operativeRuling: 'நீதிமன்றத்தின் முக்கிய உத்தரவு',
    transcribingDetail: 'உங்கள் குரல் உரையாக மாற்றப்படுகிறது...',
    voiceUnavailable: 'குரல் AI தற்போது கிடைக்கவில்லை.',
    transcriptionFailed: 'பதிவைப் புரிந்துகொள்ள முடியவில்லை. மீண்டும் முயலுங்கள் அல்லது கேள்வியைத் தட்டச்சு செய்யுங்கள்.',
    recordingUnsupported: 'இந்த உலாவியில் ஒலிப்பதிவு வசதி இல்லை. கேள்வியைத் தட்டச்சு செய்யலாம்.',
    microphoneRequired: 'குரலில் கேட்க மைக்ரோஃபோன் அனுமதி தேவை. கேள்வியைத் தட்டச்சு செய்யலாம்.',
    answerFailed: 'குரல் AI இப்போது அந்தக் கேள்விக்குப் பதிலளிக்க முடியவில்லை. மீண்டும் முயலுங்கள்.',
  },
  te: {
    document: 'పత్రం:',
    autoSpeakOn: 'సమాధానాలను స్వయంగా వినిపించడం ఆన్‌లో ఉంది',
    autoSpeakOff: 'సమాధానాలను స్వయంగా వినిపించడం ఆఫ్‌లో ఉంది',
    you: 'మీరు',
    greeting: 'నమస్కారం! నేను న్యాయవాణి వాయిస్ AI. మీ కోర్టు ఆదేశాన్ని చదివాను. దీని గురించి మీ భాషలో ఏ ప్రశ్నైనా అడగండి.',
    operativeRuling: 'కోర్టు ముఖ్య ఆదేశం',
    transcribingDetail: 'మీ వాయిస్ పాఠ్యంగా మార్చబడుతోంది...',
    voiceUnavailable: 'వాయిస్ AI ప్రస్తుతం అందుబాటులో లేదు.',
    transcriptionFailed: 'రికార్డింగ్‌ను అర్థం చేసుకోలేకపోయింది. మళ్లీ ప్రయత్నించండి లేదా ప్రశ్నను టైప్ చేయండి.',
    recordingUnsupported: 'ఈ బ్రౌజర్‌లో ఆడియో రికార్డింగ్‌కు మద్దతు లేదు. ప్రశ్నను టైప్ చేయవచ్చు.',
    microphoneRequired: 'వాయిస్‌తో అడగడానికి మైక్రోఫోన్ అనుమతి అవసరం. ప్రశ్నను టైప్ చేయవచ్చు.',
    answerFailed: 'వాయిస్ AI ప్రస్తుతం ఆ ప్రశ్నకు సమాధానం ఇవ్వలేకపోయింది. మళ్లీ ప్రయత్నించండి.',
  },
  mr: {
    document: 'दस्तऐवज:',
    autoSpeakOn: 'उत्तरे आपोआप वाचून दाखवणे सुरू आहे',
    autoSpeakOff: 'उत्तरे आपोआप वाचून दाखवणे बंद आहे',
    you: 'तुम्ही',
    greeting: 'नमस्कार! मी न्यायवाणी व्हॉइस AI आहे. मी तुमचा न्यायालयीन आदेश वाचला आहे. त्याबद्दल तुमच्या भाषेत कोणताही प्रश्न विचारा.',
    operativeRuling: 'न्यायालयाचा मुख्य आदेश',
    transcribingDetail: 'तुमचा आवाज मजकुरात बदलला जात आहे...',
    voiceUnavailable: 'व्हॉइस AI सध्या उपलब्ध नाही.',
    transcriptionFailed: 'रेकॉर्डिंग समजले नाही. पुन्हा प्रयत्न करा किंवा प्रश्न टाइप करा.',
    recordingUnsupported: 'या ब्राउझरमध्ये ऑडिओ रेकॉर्डिंग उपलब्ध नाही. तुम्ही प्रश्न टाइप करू शकता.',
    microphoneRequired: 'आवाजाने विचारण्यासाठी मायक्रोफोनची परवानगी आवश्यक आहे. तुम्ही प्रश्न टाइप करू शकता.',
    answerFailed: 'व्हॉइस AI सध्या त्या प्रश्नाचे उत्तर देऊ शकले नाही. पुन्हा प्रयत्न करा.',
  },
  gu: {
    document: 'દસ્તાવેજ:',
    autoSpeakOn: 'જવાબ આપમેળે બોલીને સંભળાવવાનું ચાલુ છે',
    autoSpeakOff: 'જવાબ આપમેળે બોલીને સંભળાવવાનું બંધ છે',
    you: 'તમે',
    greeting: 'નમસ્તે! હું ન્યાયવાણી વોઇસ AI છું. મેં તમારો કોર્ટ આદેશ વાંચ્યો છે. તેના વિશે તમારી ભાષામાં કોઈપણ પ્રશ્ન પૂછો.',
    operativeRuling: 'કોર્ટનો મુખ્ય આદેશ',
    transcribingDetail: 'તમારા અવાજને લખાણમાં બદલવામાં આવી રહ્યો છે...',
    voiceUnavailable: 'વોઇસ AI હાલમાં ઉપલબ્ધ નથી.',
    transcriptionFailed: 'રેકોર્ડિંગ સમજી શકાયું નથી. ફરી પ્રયાસ કરો અથવા પ્રશ્ન લખો.',
    recordingUnsupported: 'આ બ્રાઉઝરમાં ઑડિયો રેકોર્ડિંગ ઉપલબ્ધ નથી. તમે પ્રશ્ન લખી શકો છો.',
    microphoneRequired: 'અવાજથી પૂછવા માટે માઇક્રોફોનની મંજૂરી જરૂરી છે. તમે પ્રશ્ન લખી શકો છો.',
    answerFailed: 'વોઇસ AI હાલમાં તે પ્રશ્નનો જવાબ આપી શક્યું નથી. ફરી પ્રયાસ કરો.',
  },
  pa: {
    document: 'ਦਸਤਾਵੇਜ਼:',
    autoSpeakOn: 'ਜਵਾਬ ਆਪਣੇ ਆਪ ਬੋਲ ਕੇ ਸੁਣਾਉਣਾ ਚਾਲੂ ਹੈ',
    autoSpeakOff: 'ਜਵਾਬ ਆਪਣੇ ਆਪ ਬੋਲ ਕੇ ਸੁਣਾਉਣਾ ਬੰਦ ਹੈ',
    you: 'ਤੁਸੀਂ',
    greeting: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਹਾਂ। ਮੈਂ ਤੁਹਾਡਾ ਅਦਾਲਤੀ ਹੁਕਮ ਪੜ੍ਹ ਲਿਆ ਹੈ। ਇਸ ਬਾਰੇ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।',
    operativeRuling: 'ਅਦਾਲਤ ਦਾ ਮੁੱਖ ਹੁਕਮ',
    transcribingDetail: 'ਤੁਹਾਡੀ ਆਵਾਜ਼ ਨੂੰ ਲਿਖਤ ਵਿੱਚ ਬਦਲਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
    voiceUnavailable: 'ਵੋਇਸ AI ਇਸ ਵੇਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।',
    transcriptionFailed: 'ਰਿਕਾਰਡਿੰਗ ਨੂੰ ਸਮਝਿਆ ਨਹੀਂ ਜਾ ਸਕਿਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ ਜਾਂ ਸਵਾਲ ਲਿਖੋ।',
    recordingUnsupported: 'ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਡੀਓ ਰਿਕਾਰਡਿੰਗ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਤੁਸੀਂ ਸਵਾਲ ਲਿਖ ਸਕਦੇ ਹੋ।',
    microphoneRequired: 'ਆਵਾਜ਼ ਨਾਲ ਪੁੱਛਣ ਲਈ ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਇਜਾਜ਼ਤ ਚਾਹੀਦੀ ਹੈ। ਤੁਸੀਂ ਸਵਾਲ ਲਿਖ ਸਕਦੇ ਹੋ।',
    answerFailed: 'ਵੋਇਸ AI ਇਸ ਵੇਲੇ ਉਸ ਸਵਾਲ ਦਾ ਜਵਾਬ ਨਹੀਂ ਦੇ ਸਕਿਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
  },
};

export const VoiceAIAgent: React.FC<VoiceAIAgentProps> = ({
  analysis,
  selectedLanguage,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimeoutRef = useRef<number | null>(null);
  const spokenAudioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = getTranslation(selectedLanguage);
  const coreLabels = VOICE_CORE_LABELS[selectedLanguage];
  const voiceLabels = {
    assistant: t.voiceAi,
    document: coreLabels.document,
    askAnything: t.voiceAiModalSub,
    autoSpeakOn: coreLabels.autoSpeakOn,
    autoSpeakOff: coreLabels.autoSpeakOff,
    speaking: t.audioPlaying,
    stopAudio: t.voiceAiStopListening,
    you: coreLabels.you,
    listenAgain: t.playAudioButton,
    reading: t.analyzingTitle,
    ask: t.suggestedQuestionsTitle,
    recording: t.voiceAiListening,
    recordQuestion: t.voiceAiClickToSpeak,
    transcribing: t.voiceListening,
    recordingHelp: t.voiceAiListening,
  };

  // Suggested questions from translations
  const sampleQuestions = [
    t.suggestedQ1,
    t.suggestedQ2,
    t.suggestedQ3,
    t.suggestedQ4,
  ];

  // Initialize or update introductory greeting when language or case changes
  useEffect(() => {
    if (analysis) {
      const initialGreeting = coreLabels.greeting;

      setMessages([
        {
          id: 'msg-init',
          sender: 'agent',
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          keyFact: analysis.operativeDirectionVerbatim ? `${coreLabels.operativeRuling}: "${analysis.operativeDirectionVerbatim.substring(0, 100)}..."` : undefined,
        },
      ]);
    }
  }, [analysis, selectedLanguage, coreLabels.greeting, coreLabels.operativeRuling]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if (recordingTimeoutRef.current) {
        window.clearTimeout(recordingTimeoutRef.current);
      }
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      spokenAudioRef.current?.pause();
    };
  }, []);

  const blobToDataUrl = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  };

  const speakText = async (text: string) => {
    stopSpeaking();
    setIsSpeaking(true);
    try {
      const response = await fetch('/api/generate-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          language: selectedLanguage,
          speaker: 'shubh',
          pace: 0.95,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.audioBase64) {
        throw new Error(coreLabels.voiceUnavailable);
      }

      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      spokenAudioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      await audio.play();
    } catch (error) {
      console.error('Voice playback error:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (spokenAudioRef.current) {
      spokenAudioRef.current.pause();
      spokenAudioRef.current.currentTime = 0;
      spokenAudioRef.current = null;
    }
    setIsSpeaking(false);
  };

  const transcribeRecording = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const audioBase64 = await blobToDataUrl(audioBlob);
      const response = await fetch('/api/transcribe-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          mimeType: audioBlob.type || 'audio/webm',
          language: selectedLanguage,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.transcript) {
        throw new Error(coreLabels.transcriptionFailed);
      }
      setInputText(data.transcript);
      await handleSendQuestion(data.transcript);
    } catch (error: any) {
      console.error('Voice transcription error:', error);
      alert(error?.message || coreLabels.transcriptionFailed);
    } finally {
      setIsTranscribing(false);
    }
  };

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
      window.clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      stopRecording();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      alert(coreLabels.recordingUnsupported);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const preferredMimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus']
        .find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(
        stream,
        preferredMimeType ? { mimeType: preferredMimeType } : undefined,
      );
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        setIsListening(false);
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        if (audioBlob.size > 0) {
          void transcribeRecording(audioBlob);
        }
      };
      recorder.onerror = () => {
        setIsListening(false);
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsListening(true);
      recordingTimeoutRef.current = window.setTimeout(stopRecording, 28000);
    } catch (error) {
      console.error('Microphone recording error:', error);
      setIsListening(false);
      alert(coreLabels.microphoneRequired);
    }
  };

  // Handle Question Submit
  const handleSendQuestion = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentAnalysis: analysis,
          question: textToSend,
          history: messages.slice(-6),
          language: selectedLanguage,
        }),
      });

      const data = await res.json();

      if (data.success && data.answer) {
        const agentMsg: Message = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: data.answer,
          keyFact: data.keyFact,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, agentMsg]);

        if (autoSpeak) {
          speakText(data.answer);
        }
      } else {
        throw new Error(coreLabels.answerFailed);
      }
    } catch (error: any) {
      console.error('Ask Question error:', error);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        text: error?.message || coreLabels.answerFailed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (recordingTimeoutRef.current) {
        window.clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      spokenAudioRef.current?.pause();
      spokenAudioRef.current = null;
      setIsListening(false);
      setIsSpeaking(false);
      setIsTranscribing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl h-[85vh] max-h-[700px] shadow-2xl flex flex-col overflow-hidden text-slate-900">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-black text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-md">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base tracking-tight text-white">{t.voiceAiModalTitle}</h2>
                <span className="bg-slate-800 text-slate-100 text-[10px] px-2 py-0.5 rounded-full font-mono border border-slate-700">
                  {voiceLabels.assistant}
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate max-w-xs sm:max-w-md">
                {analysis?.title ? `${voiceLabels.document} ${analysis.title}` : voiceLabels.askAnything}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              title={autoSpeak ? voiceLabels.autoSpeakOn : voiceLabels.autoSpeakOff}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                autoSpeak ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Audio Speaker Bar Indicator */}
        {isSpeaking && (
          <div className="bg-slate-100 border-b border-slate-300 px-4 py-2 flex items-center justify-between text-xs text-slate-900 font-medium">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-black animate-pulse" />
                <span>{voiceLabels.speaking}</span>
              <div className="flex gap-1 items-end h-3 ml-2">
                <span className="w-1 bg-black h-2 animate-bounce"></span>
                <span className="w-1 bg-black h-3 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 bg-black h-1.5 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
            <button
              onClick={stopSpeaking}
              className="text-xs text-black font-semibold hover:underline cursor-pointer"
            >
              {voiceLabels.stopAudio}
            </button>
          </div>
        )}

        {/* Chat Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-500 font-medium">
                <span>{msg.sender === 'user' ? voiceLabels.you : 'NyayVaani AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-black text-white rounded-br-none border border-slate-900'
                    : 'bg-white border border-slate-300 text-slate-900 rounded-bl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.keyFact && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-slate-900 font-medium flex items-start gap-1.5 bg-slate-100 p-2 rounded-lg border border-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-black shrink-0 mt-0.5" />
                    <span>{msg.keyFact}</span>
                  </div>
                )}

                {msg.sender === 'agent' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="mt-2 text-[11px] font-semibold text-black hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{voiceLabels.listenAgain}</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-700 p-3 bg-white rounded-2xl border border-slate-300 max-w-[70%]">
              <RefreshCw className="h-4 w-4 animate-spin text-black" />
              <span>{voiceLabels.reading}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-wider">{voiceLabels.ask}</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuestion(q)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-black hover:text-white text-slate-800 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs border border-slate-300"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Controls */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
            className="flex items-center gap-2"
          >
            {/* Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              disabled={isTranscribing}
              title={isListening ? voiceLabels.recording : voiceLabels.recordQuestion}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-slate-900 text-white animate-pulse shadow-lg ring-2 ring-slate-400'
                  : isTranscribing
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              {isTranscribing ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>

            {/* Question Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isTranscribing
                  ? voiceLabels.transcribing
                  : isListening
                  ? t.voiceListening
                  : t.typeQuestionPlaceholder
              }
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-black focus:bg-white"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                !inputText.trim() || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-black hover:bg-slate-800 text-white shadow-xs'
              }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          {isListening && (
            <p className="text-[11px] text-slate-900 font-bold mt-1.5 text-center flex items-center justify-center gap-1 animate-pulse">
              <Mic className="h-3.5 w-3.5" /> {voiceLabels.recordingHelp}
            </p>
          )}
          {isTranscribing && (
            <p className="text-[11px] text-slate-700 font-bold mt-1.5 text-center">
              {coreLabels.transcribingDetail}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
