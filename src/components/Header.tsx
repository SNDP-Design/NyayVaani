import React from 'react';
import { Scale, Upload, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  currentStep: 'upload' | 'result';
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  onNewUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  selectedLanguage,
  setSelectedLanguage,
  onNewUpload,
}) => {
  const t = getTranslation(selectedLanguage);

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
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="relative w-[96px] shrink-0">
              <select
                aria-label={t.selectLanguageAria}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                className="h-8 w-full appearance-none rounded-full border border-slate-300 bg-slate-50 pl-3 pr-7 text-xs font-semibold text-slate-900 shadow-xs outline-none transition-colors cursor-pointer hover:border-slate-400 focus:border-black focus:ring-2 focus:ring-slate-200"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="bn">বাংলা</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="mr">मराठी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-700"
              />
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

              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
