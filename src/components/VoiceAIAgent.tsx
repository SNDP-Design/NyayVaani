import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, Sparkles, Bot, X, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const recognitionRef = useRef<any>(null);
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

  // Setup Web Speech API for Mic Speech-To-Text
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendQuestion(transcript);
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    } else {
      setSpeechSupported(false);
    }
  }, [selectedLanguage]);

  // Toggle Voice Recording
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your question instead.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch (err) {
        console.error('Mic start error:', err);
        setIsListening(false);
      }
    }
  };

  // Speak Text Function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.95; // Slightly calmer pace for litigants

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (error: any) {
      console.error('Ask Question error:', error);
      const fallbackMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        text: `Based on your document "${analysis.title || 'Court Order'}": ${
          analysis.plainLanguageExplanations?.[selectedLanguage] ||
          analysis.operativeDirectionVerbatim ||
          'The court order has been analyzed. Please check the summary on screen.'
        }`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl h-[85vh] max-h-[700px] shadow-2xl flex flex-col overflow-hidden text-slate-900">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-indigo-600 border-2 border-indigo-300 flex items-center justify-center shadow-md">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base tracking-tight text-white">NyayVaani Voice AI</h2>
                <span className="bg-indigo-700/80 text-indigo-100 text-[10px] px-2 py-0.5 rounded-full font-mono border border-indigo-400/30">
                  Interactive Assistant
                </span>
              </div>
              <p className="text-xs text-indigo-200 truncate max-w-xs sm:max-w-md">
                {analysis?.title ? `Document: ${analysis.title}` : 'Ask anything about your uploaded document'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              title={autoSpeak ? 'Auto-speak responses ON' : 'Auto-speak responses OFF'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                autoSpeak ? 'bg-indigo-700 text-white' : 'bg-slate-800/80 text-indigo-300 hover:text-white'
              }`}
            >
              {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Audio Speaker Bar Indicator */}
        {isSpeaking && (
          <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center justify-between text-xs text-indigo-900 font-medium">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-indigo-600 animate-pulse" />
              <span>NyayVaani is speaking aloud...</span>
              <div className="flex gap-1 items-end h-3 ml-2">
                <span className="w-1 bg-indigo-600 h-2 animate-bounce"></span>
                <span className="w-1 bg-indigo-600 h-3 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 bg-indigo-600 h-1.5 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
            <button
              onClick={stopSpeaking}
              className="text-xs text-indigo-700 font-semibold hover:underline cursor-pointer"
            >
              Stop Audio
            </button>
          </div>
        )}

        {/* Chat Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400 font-medium">
                <span>{msg.sender === 'user' ? 'You' : 'NyayVaani AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.keyFact && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-indigo-950 font-medium flex items-start gap-1.5 bg-indigo-50/70 p-2 rounded-lg">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{msg.keyFact}</span>
                  </div>
                )}

                {msg.sender === 'agent' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="mt-2 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Listen again</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 p-3 bg-white rounded-2xl border border-slate-200 max-w-[70%]">
              <RefreshCw className="h-4 w-4 animate-spin text-indigo-600" />
              <span>NyayVaani is reading your document to answer...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">Ask:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuestion(q)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer text-xs border border-slate-200"
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
              title={isListening ? 'Listening... click to stop' : 'Click to speak your question'}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-lg ring-2 ring-rose-400'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            {/* Question Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? t.voiceListening : t.typeQuestionPlaceholder}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                !inputText.trim() || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          {isListening && (
            <p className="text-[11px] text-rose-600 font-medium mt-1.5 text-center flex items-center justify-center gap-1 animate-pulse">
              <Mic className="h-3.5 w-3.5" /> Speak now into your microphone...
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
