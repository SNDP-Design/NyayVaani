import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, Sparkles, Bot, X, RefreshCw } from 'lucide-react';
import { AnalysisResult } from '../types';
import { getTranslation } from '../utils/translations';

interface VoiceAIAgentProps {
  analysis: AnalysisResult;
  selectedLanguage: string;
  onLanguageChange?: (lang: string) => void;
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
      const initialGreeting = selectedLanguage === 'hi'
        ? `नमस्ते! मैं न्यायवाणी वॉयस एआई हूं। मैंने आपका अदालती आदेश पढ़ लिया है। आप मुझसे इस आदेश के बारे में कुछ भी पूछ सकते हैं, जैसे "जज साहब ने क्या फैसला सुनाया?", "मेरी अगली तारीख कब है?", या "क्या कोर्ट ने मेरी मांग खारिज की?"।`
        : selectedLanguage === 'pa'
        ? `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਨਿਆਇਵਾਣੀ ਵੋਇਸ AI ਹਾਂ। ਮੈਂ ਤੁਹਾਡਾ ਅਦਾਲਤੀ ਹੁਕਮ ਪੜ੍ਹ ਲਿਆ ਹੈ। ਤੁਸੀਂ ਮੈਨੂੰ ਇਸ ਹੁਕਮ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ, ਜਿਵੇਂ "ਜੱਜ ਸਾਹਿਬ ਨੇ ਕੀ ਫੈਸਲਾ ਸੁਣਾਇਆ?", "ਮੇਰੀ ਅਗਲੀ ਤਾਰੀਖ ਕਦੋਂ ਹੈ?", ਜਾਂ "ਕੀ ਕੋਰਟ ਨੇ ਮੇਰੀ ਮੰਗ ਖਾਰਜ ਕੀਤੀ?"।`
        : `Hello! I am NyayVaani Voice AI. I have analyzed your court document for "${analysis.title || 'Court Order'}". Feel free to ask me any question in your language!`;

      setMessages([
        {
          id: 'msg-init',
          sender: 'agent',
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          keyFact: analysis.operativeDirectionVerbatim ? `Operative Ruling: "${analysis.operativeDirectionVerbatim.substring(0, 100)}..."` : undefined,
        },
      ]);
    }
  }, [analysis, selectedLanguage]);

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
        throw new Error(data.details || data.error || 'Sarvam voice is temporarily unavailable.');
      }

      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      spokenAudioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      await audio.play();
    } catch (error) {
      console.error('Sarvam Bulbul playback error:', error);
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
        throw new Error(data.details || data.error || 'Sarvam could not understand the recording.');
      }
      setInputText(data.transcript);
      await handleSendQuestion(data.transcript);
    } catch (error: any) {
      console.error('Sarvam Saaras transcription error:', error);
      alert(error?.message || 'Sarvam could not understand the recording. Please try again or type your question.');
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
      alert('Audio recording is not supported in this browser. You can type your question instead.');
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
      alert('Microphone access is needed to ask Sarvam by voice. You can type your question instead.');
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
        throw new Error(data.details || data.error || 'Sarvam could not answer this question.');
      }
    } catch (error: any) {
      console.error('Ask Question error:', error);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        text: error?.message || 'Sarvam could not answer that question right now. Please try again.',
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
                <h2 className="font-bold text-base tracking-tight text-white">NyayVaani Voice AI</h2>
                <span className="bg-slate-800 text-slate-100 text-[10px] px-2 py-0.5 rounded-full font-mono border border-slate-700">
                  Interactive Assistant
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate max-w-xs sm:max-w-md">
                {analysis?.title ? `Document: ${analysis.title}` : 'Ask anything about your uploaded document'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              title={autoSpeak ? 'Auto-speak responses ON' : 'Auto-speak responses OFF'}
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
                <span>Sarvam Bulbul is speaking aloud...</span>
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
              Stop Audio
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
                <span>{msg.sender === 'user' ? 'You' : 'NyayVaani AI'}</span>
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
                    <span>Listen again</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-700 p-3 bg-white rounded-2xl border border-slate-300 max-w-[70%]">
              <RefreshCw className="h-4 w-4 animate-spin text-black" />
              <span>NyayVaani is reading your document to answer...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-wider">Ask:</span>
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
              title={isListening ? 'Recording... click to stop' : 'Record a question for Sarvam Saaras'}
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
                  ? 'Sarvam Saaras is transcribing...'
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
              <Mic className="h-3.5 w-3.5" /> Recording for Sarvam Saaras — click the microphone when finished
            </p>
          )}
          {isTranscribing && (
            <p className="text-[11px] text-slate-700 font-bold mt-1.5 text-center">
              Sarvam Saaras v3 is turning your voice into text...
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
