import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadScreen } from './components/UploadScreen';
import { DocumentResultView } from './components/DocumentResultView';
import { BENCHMARK_CASES } from './data/benchmarkCases';
import { BenchmarkCase, SupportedLanguage } from './types';
import { Scale } from 'lucide-react';
import { getTranslation } from './utils/translations';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'result'>('upload');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [currentCase, setCurrentCase] = useState<BenchmarkCase>(BENCHMARK_CASES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = getTranslation(selectedLanguage);

  // Handle "Read the Document" click
  const handleReadDocument = async (payload: { imageBase64?: string; imagesBase64?: string[]; textContent?: string }) => {
    // If custom images/PDFs or text was uploaded/pasted
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: payload.imageBase64,
          imagesBase64: payload.imagesBase64,
          textContent: payload.textContent,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (data.success && data.analysis) {
        const customCase: BenchmarkCase = {
          id: `custom-${Date.now()}`,
          title: data.analysis.title || 'Uploaded Court Document',
          caseNumber: data.analysis.caseNumber || 'O.S. / Misc Application',
          type: 'order',
          courtName: data.analysis.courtName || 'District Court / High Court',
          photocopyStyle: 'distorted_photocopy_stamp',
          isRefusalCase: !!data.analysis.isRefusalState,
          demoHighlight: 'Digitized by Sarvam Vision and analyzed by Sarvam-105B',
          documentText: payload.textContent || 'Scanned Court Order Document',
          analysis: data.analysis,
          humanGroundTruth: {
            totalParagraphs: data.analysis.paragraphs?.length || 0,
            correctlyAttributed: data.analysis.paragraphs?.length || 0,
            operativeFound: !data.analysis.isRefusalState,
            honestlyRefused: !!data.analysis.isRefusalState,
            notes: 'AI generated analysis for uploaded court document.',
          },
        };

        setCurrentCase(customCase);
        setCurrentStep('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(
          data.error ||
          'Sarvam could not analyze this court document. Please try again.',
        );
      }
    } catch (err: any) {
      console.error('Analysis call error:', err);
      alert('NyayVaani could not reach Sarvam AI. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToUpload = () => {
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
        {currentStep === 'upload' ? (
          <UploadScreen
            onReadDocument={handleReadDocument}
            isLoading={isLoading}
            selectedLanguage={selectedLanguage}
          />
        ) : (
          <DocumentResultView
            currentCase={currentCase}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onBackToUpload={handleBackToUpload}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Scale className="h-4 w-4 text-indigo-600" />
            <span>NyayVaani Voice & Document Intelligence • Sarvam AI</span>
          </div>

          <p className="text-[11px] text-slate-500">
            {t.footerLitigantNote}
          </p>
        </div>
      </footer>

    </div>
  );
}
