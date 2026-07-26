import React, { useState, useEffect } from 'react';
import { Scale, Bot, Upload, Download, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  currentStep: 'upload' | 'result';
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  onNewUpload: () => void;
  onOpenVoiceAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  selectedLanguage,
  setSelectedLanguage,
  onNewUpload,
  onOpenVoiceAI,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const t = getTranslation(selectedLanguage);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      alert('To install NyayVaani on your phone, open your browser menu (⋮ or Share) and tap "Add to Home Screen".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div
            onClick={onNewUpload}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:bg-slate-800 transition-colors">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-black transition-colors">
                  {t.appTitle}
                </h1>
                <span className="bg-slate-100 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-300 hidden sm:inline-block font-mono">
                  {t.pwaReady}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Install PWA Button */}
            <button
              onClick={handleInstallPWA}
              title="Install NyayVaani App on Mobile"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-900" />
              <span>{t.installApp}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-300 text-xs">
              <span className="text-slate-500 hidden sm:inline">{t.languageLabel}</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
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

            {currentStep === 'result' && (
              <>
                <button
                  onClick={onNewUpload}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                >
                  <Upload className="h-3.5 w-3.5 text-slate-900" />
                  <span className="hidden sm:inline">{t.uploadNew}</span>
                </button>

                {onOpenVoiceAI && (
                  <button
                    onClick={onOpenVoiceAI}
                    className="px-3.5 py-1.5 bg-black hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-slate-900"
                  >
                    <Bot className="h-4 w-4" />
                    <span>{t.voiceAi}</span>
                  </button>
                )}
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
