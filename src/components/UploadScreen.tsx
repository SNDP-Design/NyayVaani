import React, { useState } from 'react';
import { Upload, Camera, FileText, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { BENCHMARK_CASES } from '../data/benchmarkCases';
import { BenchmarkCase, SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface UploadScreenProps {
  onReadDocument: (payload: { imageBase64?: string; textContent?: string; sampleCase?: BenchmarkCase }) => void;
  isLoading: boolean;
  selectedLanguage?: SupportedLanguage;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onReadDocument, isLoading, selectedLanguage = 'hi' }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<BenchmarkCase | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const t = getTranslation(selectedLanguage);

  // Handle image upload from file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setSelectedSample(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Drag and Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setSelectedSample(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Click on "Read the Document"
  const handleStartReading = () => {
    if (selectedSample) {
      onReadDocument({ sampleCase: selectedSample });
    } else if (selectedImage) {
      onReadDocument({ imageBase64: selectedImage });
    } else if (pastedText.trim()) {
      onReadDocument({ textContent: pastedText });
    } else {
      // Default to first sample if nothing selected
      onReadDocument({ sampleCase: BENCHMARK_CASES[0] });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Hero Banner Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full text-indigo-700 font-semibold text-xs shadow-xs">
          <Sparkles className="h-4 w-4 text-indigo-600 animate-pulse" />
          <span>{t.uploadHeroBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.uploadHeading}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t.uploadSubheading}
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Drag & Drop Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all flex flex-col items-center justify-center space-y-4 ${
            dragActive
              ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01]'
              : selectedImage || selectedSample
              ? 'border-emerald-300 bg-emerald-50/30'
              : 'border-slate-300 hover:border-indigo-500 bg-slate-50/60'
          }`}
        >
          {selectedImage ? (
            <div className="space-y-4 w-full max-w-md mx-auto">
              <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-md bg-white p-2 max-h-64 flex items-center justify-center">
                <img src={selectedImage} alt="Uploaded Document" className="max-h-60 object-contain rounded-lg" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
                <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Image Selected
                </span>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-indigo-600 hover:underline font-medium cursor-pointer"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : selectedSample ? (
            <div className="space-y-3 w-full max-w-md mx-auto bg-white p-4 rounded-xl border border-indigo-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase font-mono">Sample Document Selected</span>
                <button
                  onClick={() => setSelectedSample(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm font-bold text-slate-900">{selectedSample.title}</p>
              <p className="text-xs text-slate-500">{selectedSample.caseNumber} • {selectedSample.courtName}</p>
            </div>
          ) : (
            <>
              <div className="h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <Upload className="h-8 w-8" />
              </div>

              <div className="space-y-3">
                <p className="text-base font-bold text-slate-900">
                  {t.dragDropTitle}{' '}
                  <label className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-extrabold">
                    {t.browseFiles}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>

                {/* Mobile Camera Direct Snap Button */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <label className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs flex items-center gap-2 border border-indigo-200 cursor-pointer shadow-xs transition-colors">
                    <Camera className="h-4 w-4 text-indigo-600" />
                    <span>{t.takePhotoButton}</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="text-xs text-slate-500">
                  {t.uploadNote}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Alternative: Sample Court Documents for quick testing */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {t.sampleCasesTitle}
            </span>
            <span className="text-[11px] text-slate-400">{t.sampleCasesSub}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BENCHMARK_CASES.slice(0, 4).map((caseItem) => (
              <button
                key={caseItem.id}
                onClick={() => {
                  setSelectedSample(caseItem);
                  setSelectedImage(null);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  selectedSample?.id === caseItem.id
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-500'
                    : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  caseItem.isRefusalCase ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{caseItem.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{caseItem.courtName}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Paste Option (Optional) */}
        <div className="pt-2">
          <details className="text-xs text-slate-500">
            <summary className="cursor-pointer hover:text-slate-800 font-semibold text-slate-600">
              Or paste document text manually
            </summary>
            <textarea
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                setSelectedImage(null);
                setSelectedSample(null);
              }}
              rows={4}
              placeholder="Paste text from photocopied court order here..."
              className="mt-2 w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-600"
            />
          </details>
        </div>

        {/* PRIMARY CTA BUTTON: "Read the Document" */}
        <div className="pt-4">
          <button
            onClick={handleStartReading}
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 group border border-indigo-500"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.analyzingTitle}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 text-indigo-200 group-hover:rotate-12 transition-transform" />
                <span>{selectedSample ? `Analyze: ${selectedSample.title}` : selectedImage ? 'Read Uploaded Court Order' : 'Read Court Document'}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Feature Footnote */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-slate-600">
        <div className="p-3 bg-white rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-0.5">Operative Clause Extraction</span>
          Isolates what the judge actually ordered vs party claims.
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-0.5">Voice AI Q&A Agent</span>
          Talk verbally or type questions directly to NyayVaani Voice AI.
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-0.5">Regional Translations</span>
          Plain-language summaries in Hindi, English, Marathi, Bengali & more.
        </div>
      </div>

    </div>
  );
};
