import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { UploadScreen } from './components/UploadScreen';
import { DocumentResultView } from './components/DocumentResultView';
import { CourtDocumentCase, SupportedLanguage } from './types';
import { Scale } from 'lucide-react';
import { getTranslation } from './utils/translations';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'result'>('upload');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [currentCase, setCurrentCase] = useState<CourtDocumentCase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = getTranslation(selectedLanguage);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
    document.title = `${t.appTitle} - ${t.appSubtitle}`;
  }, [selectedLanguage, t.appTitle, t.appSubtitle]);

  // Handle "Read the Document" click
  const handleReadDocument = async (payload: { imagesBase64?: string[]; textContent?: string }) => {
    // If custom images/PDFs or text was uploaded/pasted
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagesBase64: payload.imagesBase64,
          textContent: payload.textContent,
          language: selectedLanguage,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success && data.analysis) {
        const customCase: CourtDocumentCase = {
          id: `custom-${Date.now()}`,
          title: data.analysis.title || t.readUploadedDocument,
          caseNumber: data.analysis.caseNumber || 'O.S. / Misc Application',
          courtName: data.analysis.courtName || 'District Court / High Court',
          isRefusalCase: !!data.analysis.isRefusalState,
          analysis: data.analysis,
        };

        setCurrentCase(customCase);
        setCurrentStep('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(
          response.status === 413
            ? t.uploadSizeError
            : data?.code === 'PDF_PAGE_LIMIT'
              ? t.uploadPageLimitError
              : t.analysisFailedError,
        );
      }
    } catch (err: any) {
      console.error('Analysis call error:', err);
      alert(t.connectionError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToUpload = () => {
    setCurrentCase(null);
    setCurrentStep('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navbar Header */}
      <Header
        currentStep={currentStep}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onNewUpload={handleBackToUpload}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto px-2 sm:px-4 lg:px-8 py-4">
        {currentStep === 'upload' || !currentCase ? (
          <UploadScreen
            onReadDocument={handleReadDocument}
            isLoading={isLoading}
            selectedLanguage={selectedLanguage}
          />
        ) : (
          <DocumentResultView
            currentCase={currentCase}
            selectedLanguage={selectedLanguage}
            onBackToUpload={handleBackToUpload}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Scale className="h-4 w-4 text-black" />
            <span>{t.appTitle}</span>
          </div>

          <p className="text-[11px] text-slate-500">
            {t.footerLitigantNote}
          </p>
        </div>
      </footer>

    </div>
  );
}
