import React, { useState, useRef } from 'react';
import { Upload, Camera, FileText, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Image as ImageIcon, FileType, Plus, Trash2, Layers, X } from 'lucide-react';
import { BENCHMARK_CASES } from '../data/benchmarkCases';
import { BenchmarkCase, SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface UploadScreenProps {
  onReadDocument: (payload: { imageBase64?: string; imagesBase64?: string[]; textContent?: string; sampleCase?: BenchmarkCase }) => void;
  isLoading: boolean;
  selectedLanguage?: SupportedLanguage;
}

interface UploadedFileInfo {
  id: string;
  name: string;
  size: string;
  dataUrl: string;
  isPdf: boolean;
}

const compressAndResizeImage = (dataUrl: string, maxDimension = 1800, quality = 0.85): Promise<string> => {
  return new Promise((resolve) => {
    if (!dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width <= maxDimension && height <= maxDimension && dataUrl.length < 1000000) {
        resolve(dataUrl);
        return;
      }

      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
};

export const UploadScreen: React.FC<UploadScreenProps> = ({ onReadDocument, isLoading, selectedLanguage = 'en' }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [pastedText, setPastedText] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<BenchmarkCase | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const t = getTranslation(selectedLanguage);

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setSelectedSample(null);
    setIsCompressing(true);

    const filePromises = fileArray.map((file, index) => {
      return new Promise<UploadedFileInfo>((resolve) => {
        const reader = new FileReader();
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

        reader.onload = async (event) => {
          const rawDataUrl = (event.target?.result as string) || '';
          let finalDataUrl = rawDataUrl;

          if (!isPdf && rawDataUrl.startsWith('data:image')) {
            finalDataUrl = await compressAndResizeImage(rawDataUrl, 1800, 0.85);
          }

          const approximateBytes = Math.round((finalDataUrl.length * 3) / 4);
          const sizeInMB = (approximateBytes / (1024 * 1024)).toFixed(2);
          const sizeStr = approximateBytes >= 1024 * 1024 ? `${sizeInMB} MB` : `${Math.round(approximateBytes / 1024)} KB`;

          resolve({
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}-${index}`,
            name: file.name,
            size: sizeStr,
            dataUrl: finalDataUrl,
            isPdf,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((newFiles) => {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setIsCompressing(false);
    });
  };

  // Handle file upload from file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAllFiles = () => {
    setUploadedFiles([]);
  };

  // Handle Click on "Read the Document"
  const handleStartReading = () => {
    if (selectedSample) {
      onReadDocument({ sampleCase: selectedSample });
    } else if (uploadedFiles.length > 0) {
      const dataUrls = uploadedFiles.map((f) => f.dataUrl);
      onReadDocument({
        imageBase64: dataUrls[0],
        imagesBase64: dataUrls,
      });
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
        
        {/* Hidden Master File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Drag & Drop Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => {
            if (uploadedFiles.length === 0 && !selectedSample) {
              fileInputRef.current?.click();
            }
          }}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all flex flex-col items-center justify-center space-y-4 ${
            uploadedFiles.length === 0 && !selectedSample ? 'cursor-pointer hover:border-black hover:bg-slate-100/80' : ''
          } ${
            dragActive
              ? 'border-black bg-slate-100 scale-[1.01]'
              : uploadedFiles.length > 0 || selectedSample
              ? 'border-slate-900 bg-slate-50'
              : 'border-slate-300 bg-slate-50/60'
          }`}
        >
          {uploadedFiles.length > 0 ? (
            <div className="space-y-4 w-full" onClick={(e) => e.stopPropagation()}>
              {/* Header bar for uploaded files */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-black" />
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {uploadedFiles.length} {uploadedFiles.length === 1 ? 'Page / File Selected' : 'Pages / Files Selected'}
                  </span>
                  <span className="bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                    Multi-Page Ready
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Add More Files Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5 text-black" />
                    <span>Add More Images/PDFs</span>
                  </button>

                  {/* Add Photo / Snap Camera */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300 transition-colors"
                  >
                    <Camera className="h-3.5 w-3.5 text-black" />
                    <span>Snap Photo</span>
                  </button>

                  {/* Clear All */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAllFiles();
                    }}
                    className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-red-600 font-bold cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Grid of Pages/Images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={file.id}
                    className="group relative bg-white rounded-xl border border-slate-300 p-2 shadow-xs flex flex-col items-center justify-between space-y-2 hover:border-black transition-all"
                  >
                    {/* Delete file button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(file.id);
                      }}
                      title="Remove this page"
                      className="absolute -top-2 -right-2 bg-black text-white hover:bg-red-600 p-1 rounded-full shadow-md z-10 cursor-pointer transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>

                    {/* Page badge */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold text-slate-700 px-1">
                      <span>PAGE {idx + 1}</span>
                      <span>{file.size}</span>
                    </div>

                    {/* Preview Content */}
                    <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 relative">
                      {file.isPdf ? (
                        <div className="flex flex-col items-center gap-1 text-slate-800 p-2 text-center">
                          <FileType className="h-8 w-8 text-black" />
                          <span className="text-[10px] font-bold truncate max-w-[100px]">{file.name}</span>
                        </div>
                      ) : (
                        <img src={file.dataUrl} alt={`Page ${idx + 1}`} className="h-full w-full object-cover" />
                      )}
                    </div>

                    {/* File name */}
                    <span className="text-[11px] font-semibold text-slate-800 truncate w-full text-center px-1">
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 text-center font-medium">
                Tip: You can select or photograph multiple court order pages together. Sarvam Doc AI will analyze all pages sequentially!
              </p>
            </div>
          ) : selectedSample ? (
            <div className="space-y-3 w-full max-w-md mx-auto bg-white p-4 rounded-xl border border-slate-400 shadow-xs" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono">Sample Document Selected</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSample(null);
                  }}
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
                  Drag & drop court order photos or <span className="text-black font-extrabold underline">PDF document</span> here, or{' '}
                  <span className="text-black hover:text-slate-700 underline cursor-pointer font-extrabold">
                    {t.browseFiles}
                  </span>
                </p>

                {/* Explicit PDF and Image Format Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-900 text-[11px] font-bold px-3 py-1 rounded-lg border border-slate-300 shadow-2xs">
                    <FileType className="h-4 w-4 text-black" /> PDF Document Supported
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-900 text-[11px] font-bold px-3 py-1 rounded-lg border border-slate-300 shadow-2xs">
                    <ImageIcon className="h-4 w-4 text-black" /> Multiple Court Images (JPG, PNG)
                  </span>
                </div>

                {/* Mobile Camera Direct Snap Button */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-300 cursor-pointer shadow-xs transition-colors"
                  >
                    <Camera className="h-4 w-4 text-black" />
                    <span>{t.takePhotoButton}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Upload single or multi-page court orders in PDF or Image format at once
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
            {BENCHMARK_CASES.map((caseItem) => (
              <button
                key={caseItem.id}
                onClick={() => {
                  setSelectedSample(caseItem);
                  setUploadedFiles([]);
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
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {caseItem.title}
                    </span>
                    {caseItem.isRefusalCase && (
                      <span className="shrink-0 bg-slate-200 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                        Refusal
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {caseItem.caseNumber} • {caseItem.courtName}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Text Paste Accordion */}
        <div className="pt-2">
          <details className="group text-xs">
            <summary className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-between">
              <span>Need to paste plain text instead?</span>
              <span className="text-[10px] text-slate-400 font-mono group-open:hidden">+ Expand</span>
              <span className="text-[10px] text-slate-400 font-mono hidden group-open:inline">- Collapse</span>
            </summary>
            <textarea
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                if (e.target.value.trim()) {
                  setSelectedSample(null);
                  setUploadedFiles([]);
                }
              }}
              rows={4}
              placeholder="Paste text from photocopied court order here..."
              className="mt-2 w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-black"
            />
          </details>
        </div>

        {/* Submit Reading Action Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleStartReading}
            disabled={isLoading || isCompressing}
            className="w-full py-4 bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 group border border-slate-900"
          >
            {isCompressing ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin text-slate-300" />
                <span>Optimizing Court Pages for Fast AI Analysis...</span>
              </>
            ) : isLoading ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                <span>{t.analyzingTitle}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 text-slate-300 group-hover:rotate-12 transition-transform" />
                <span>
                  {selectedSample
                    ? `Analyze: ${selectedSample.title}`
                    : uploadedFiles.length > 1
                    ? `Read ${uploadedFiles.length} Uploaded Court Pages`
                    : uploadedFiles.length === 1
                    ? `Read Uploaded Court Document`
                    : 'Read Court Document'}
                </span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
