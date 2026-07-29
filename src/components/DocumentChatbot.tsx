import React, { useEffect, useRef, useState } from 'react';
import { Bot, RefreshCw, Send, Sparkles } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface DocumentChatbotProps {
  analysis: AnalysisResult;
  selectedLanguage: SupportedLanguage;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  keyFact?: string;
}

export const DocumentChatbot: React.FC<DocumentChatbotProps> = ({
  analysis,
  selectedLanguage,
}) => {
  const t = getTranslation(selectedLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    t.suggestedQ1,
    t.suggestedQ2,
    t.suggestedQ3,
    t.suggestedQ4,
  ];

  useEffect(() => {
    setMessages([
      {
        id: `greeting-${analysis.documentId}-${selectedLanguage}`,
        sender: 'agent',
        text: t.voiceAiModalSub,
      },
    ]);
    setInputText('');
  }, [analysis.documentId, selectedLanguage, t.voiceAiModalSub]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendQuestion = async (question?: string) => {
    const text = (question || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };
    const history = [...messages, userMessage];
    setMessages(history);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentAnalysis: analysis,
          question: text,
          history: messages.slice(-6),
          language: selectedLanguage,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success || !data?.answer) {
        throw new Error(t.analysisFailedError);
      }
      setMessages((current) => [
        ...current,
        {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: data.answer,
          keyFact: data.keyFact,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          sender: 'agent',
          text: t.connectionError,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="lg:sticky lg:top-4 h-[640px] lg:h-[calc(100dvh-150px)] lg:min-h-[620px] lg:max-h-[820px] bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
      <header className="bg-black text-white px-4 py-3.5 flex items-center gap-3 shrink-0">
        <span className="h-9 w-9 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
          <Bot className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-extrabold text-sm">{t.chatbotTitle}</h2>
          <p className="text-[11px] text-slate-300 truncate">
            {t.voiceAiModalSub}
          </p>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto bg-slate-50 p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-3 text-xs sm:text-sm leading-relaxed ${
                message.sender === 'user'
                  ? 'bg-black text-white rounded-br-sm'
                  : 'bg-white text-slate-900 border border-slate-200 rounded-bl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.keyFact && (
                <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-slate-700 flex items-start gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{message.keyFact}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-600 w-fit">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>{t.analyzingTitle}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white px-3 py-2 flex gap-2 overflow-x-auto shrink-0">
        {sampleQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => void sendQuestion(question)}
            className="shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            {question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void sendQuestion();
        }}
        className="border-t border-slate-200 bg-white p-3 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder={t.typeQuestionPlaceholder}
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black focus:bg-white"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          aria-label={t.voiceAiSendInput}
          title={t.voiceAiSendInput}
          className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </section>
  );
};
