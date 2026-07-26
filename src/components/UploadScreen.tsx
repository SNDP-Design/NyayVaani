import React, { useState } from 'react';
import { Upload, Camera, FileText, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Image as ImageIcon, FileType } from 'lucide-react';
import { BENCHMARK_CASES } from '../data/benchmarkCases';
import { BenchmarkCase, SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface UploadScreenProps {
  onReadDocument: (payload: { imageBase64?: string; textContent?: string; sampleCase?: BenchmarkCase }) => void;
  isLoading: boolean;
  selectedLanguage?: SupportedLanguage;
}

interface UploadedFileInfo {
  name: string;
  size: string;
  dataUrl: string;
  isPdf: boolean;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onReadDocument, isLoading, selectedLanguage = 'hi' }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileInfo | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<BenchmarkCase | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const t = getTranslation(selectedLanguage);

  const processFile = (file: File) => {
    const reader = new FileReader();
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeStr = file.size >= 1024 * 1024 ? `${sizeInMB} MB` : `${Math.round(file.size / 1024)} KB`;

    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setUploadedFile({
          name: file.name,
          size: sizeStr,
          dataUrl,
          isPdf,
        });
        setSelectedImage(dataUrl);
        setSelectedSample(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle file upload from file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Handle Click on "Read the Document"
  const handleStartReading = () => {
    if (selectedSample) {
      onReadDocument({ sampleCase: selectedSample });
    } else if (uploadedFile) {
      onReadDocument({ imageBase64: uploadedFile.dataUrl });
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
        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 px-3.5 py-1.5 rounded-full text-slate-900 font-semibold text-xs shadow-xs">
          <Sparkles className="h-4 w-4 text-slate-900 animate-pulse" />
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
              ? 'border-black bg-slate-100 scale-[1.01]'
              : selectedImage || selectedSample
              ? 'border-slate-900 bg-slate-50'
              : 'border-slate-300 hover:border-black bg-slate-50/60'
          }`}
        >
          {uploadedFile?.isPdf ? (
            <div className="space-y-4 w-full max-w-md mx-auto">
              <div className="p-5 rounded-2xl bg-white border border-slate-300 shadow-md flex items-center gap-4 text-left">
                <div className="h-14 w-14 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileType className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="bg-slate-100 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300 uppercase font-mono">
                      PDF Document
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{uploadedFile.size}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate" title={uploadedFile.name}>
                    {uploadedFile.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black shrink-0" />
                    <span>Ready for Sarvam Doc AI Analysis</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" /> PDF File Selected
                </span>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setSelectedImage(null);
                  }}
                  className="text-black hover:underline font-bold cursor-pointer"
                >
                  Change File
                </button>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="space-y-4 w-full max-w-md mx-auto">
              <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-md bg-white p-2 max-h-64 flex items-center justify-center">
                <img src={selectedImage} alt="Uploaded Document" className="max-h-60 object-contain rounded-lg" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" /> Image Selected
                </span>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setUploadedFile(null);
                  }}
                  className="text-black hover:underline font-bold cursor-pointer"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : selectedSample ? (
            <div className="space-y-3 w-full max-w-md mx-auto bg-white p-4 rounded-xl border border-slate-400 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono">Sample Document Selected</span>
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
              <div className="h-16 w-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                <Upload className="h-8 w-8 text-white" />
              </div>

              <div className="space-y-3">
                <p className="text-base font-bold text-slate-900">
                  {t.dragDropTitle}{' '}
                  <label className="text-black hover:text-slate-700 underline cursor-pointer font-extrabold">
                    {t.browseFiles}
                    <input
                      type="file"
                      accept="image/*,application/pdf,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>

                {/* Mobile Camera Direct Snap Button */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-300 cursor-pointer shadow-xs transition-colors">
                    <Camera className="h-4 w-4 text-black" />
                    <span>{t.takePhotoButton}</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf,.pdf"
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
                    ? 'border-black bg-slate-100 shadow-xs ring-1 ring-black'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  caseItem.isRefusalCase ? 'bg-slate-200 text-slate-900' : 'bg-black text-white'
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
              className="mt-2 w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-black"
            />
          </details>
        </div>

        {/* PRIMARY CTA BUTTON: "Read the Document" */}
        <div className="pt-4">
          <button
            onClick={handleStartReading}
            disabled={isLoading}
            className="w-full py-4 bg-black hover:bg-slate-800 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 group border border-slate-900"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.analyzingTitle}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 text-slate-300 group-hover:rotate-12 transition-transform" />
                <span>{selectedSample ? `Analyze: ${selectedSample.title}` : uploadedFile?.isPdf ? 'Read Uploaded PDF Court Order' : selectedImage ? 'Read Uploaded Court Order' : 'Read Court Document'}</span>
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
