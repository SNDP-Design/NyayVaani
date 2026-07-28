import React, { useState, useRef } from 'react';
import { Upload, Sparkles, ArrowRight, AlertCircle, FileType, Plus, Layers, X } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface UploadScreenProps {
  onReadDocument: (payload: { imagesBase64?: string[]; textContent?: string }) => void;
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

const MAX_HOSTED_UPLOAD_BYTES = 3 * 1024 * 1024;

const approximateDataUrlBytes = (dataUrl: string): number => {
  const base64 = dataUrl.split(',', 2)[1] || '';
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((base64.length * 3) / 4) - padding);
};

const compressAndResizeImage = (
  dataUrl: string,
  maxDimension = 1800,
  quality = 0.85,
  forceCompression = false,
): Promise<string> => {
  return new Promise((resolve) => {
    if (!dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (
        !forceCompression &&
        width <= maxDimension &&
        height <= maxDimension &&
        approximateDataUrlBytes(dataUrl) < 750000
      ) {
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

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
};

const optimizeImageBatch = async (files: UploadedFileInfo[]): Promise<UploadedFileInfo[]> => {
  if (files.some((file) => file.isPdf)) return files;

  const count = files.length;
  const firstPass =
    count <= 3
      ? { maxDimension: 1800, quality: 0.85, force: false }
      : count <= 6
        ? { maxDimension: 1600, quality: 0.78, force: true }
        : { maxDimension: 1400, quality: 0.72, force: true };
  const passes = [
    firstPass,
    { maxDimension: 1250, quality: 0.68, force: true },
    { maxDimension: 1050, quality: 0.62, force: true },
  ];

  let optimized = files;
  for (const pass of passes) {
    optimized = await Promise.all(
      optimized.map(async (file) => {
        const dataUrl = await compressAndResizeImage(
          file.dataUrl,
          pass.maxDimension,
          pass.quality,
          pass.force,
        );
        const bytes = approximateDataUrlBytes(dataUrl);
        return {
          ...file,
          dataUrl,
          size:
            bytes >= 1024 * 1024
              ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
              : `${Math.round(bytes / 1024)} KB`,
        };
      }),
    );

    const totalBytes = optimized.reduce(
      (total, file) => total + approximateDataUrlBytes(file.dataUrl),
      0,
    );
    if (totalBytes <= MAX_HOSTED_UPLOAD_BYTES) break;
  }

  return optimized;
};

export const UploadScreen: React.FC<UploadScreenProps> = ({ onReadDocument, isLoading, selectedLanguage = 'en' }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [pastedText, setPastedText] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = getTranslation(selectedLanguage);

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const unsupportedFile = fileArray.find((file) => {
      const lowerName = file.name.toLowerCase();
      return !(
        file.type === 'application/pdf' ||
        lowerName.endsWith('.pdf') ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        lowerName.endsWith('.jpg') ||
        lowerName.endsWith('.jpeg') ||
        lowerName.endsWith('.png')
      );
    });
    if (unsupportedFile) {
      setUploadError(t.uploadUnsupportedError);
      return;
    }

    const existingPdfCount = uploadedFiles.filter((file) => file.isPdf).length;
    const incomingPdfCount = fileArray.filter(
      (file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'),
    ).length;
    const totalCount = uploadedFiles.length + fileArray.length;
    const totalPdfCount = existingPdfCount + incomingPdfCount;

    if (totalCount > 10) {
      setUploadError(t.uploadPageLimitError);
      return;
    }
    if (totalPdfCount > 1 || (totalPdfCount === 1 && totalCount > 1)) {
      setUploadError(t.uploadPdfMixError);
      return;
    }

    setUploadError('');
    setIsCompressing(true);

    const filePromises = fileArray.map((file, index) => {
      return new Promise<UploadedFileInfo>((resolve, reject) => {
        const reader = new FileReader();
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

        reader.onload = async (event) => {
          const rawDataUrl = (event.target?.result as string) || '';
          let finalDataUrl = rawDataUrl;

          const approximateBytes = approximateDataUrlBytes(finalDataUrl);
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
        reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
        reader.readAsDataURL(file);
      });
    });

    try {
      const newFiles = await Promise.all(filePromises);
      const combined = await optimizeImageBatch([...uploadedFiles, ...newFiles]);
      const combinedBytes = combined.reduce(
        (total, file) => total + approximateDataUrlBytes(file.dataUrl),
        0,
      );
      if (combinedBytes > MAX_HOSTED_UPLOAD_BYTES) {
        setUploadError(t.uploadSizeError);
        return;
      }
      setUploadedFiles(combined);
    } catch {
      setUploadError(t.uploadReadError);
    } finally {
      setIsCompressing(false);
    }
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
    setUploadError('');
  };

  const handleClearAllFiles = () => {
    setUploadedFiles([]);
    setUploadError('');
  };

  // Handle Click on "Read the Document"
  const handleStartReading = () => {
    if (uploadedFiles.length > 0) {
      const dataUrls = uploadedFiles.map((f) => f.dataUrl);
      onReadDocument({
        imagesBase64: dataUrls,
      });
    } else if (pastedText.trim()) {
      onReadDocument({ textContent: pastedText });
    } else {
      setUploadError(t.uploadRequiredError);
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
          accept="image/jpeg,image/png,application/pdf,.pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {uploadError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Drag & Drop Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => {
            if (uploadedFiles.length === 0) {
              fileInputRef.current?.click();
            }
          }}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all flex flex-col items-center justify-center space-y-4 ${
            uploadedFiles.length === 0 ? 'cursor-pointer hover:border-black hover:bg-slate-100/80' : ''
          } ${
            dragActive
              ? 'border-black bg-slate-100 scale-[1.01]'
              : uploadedFiles.length > 0
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
                    {uploadedFiles.length} {uploadedFiles.length === 1 ? t.fileSelected : t.filesSelected}
                  </span>
                  <span className="bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                    {t.multiPageReady}
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
                    <span>{t.addMoreFiles}</span>
                  </button>

                  {/* Clear All */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAllFiles();
                    }}
                    className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-red-600 font-bold cursor-pointer transition-colors"
                  >
                    {t.clearAll}
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
                      title={t.removePage}
                      className="absolute -top-2 -right-2 bg-black text-white hover:bg-red-600 p-1 rounded-full shadow-md z-10 cursor-pointer transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>

                    {/* Page badge */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold text-slate-700 px-1">
                      <span>{t.pageLabel.toUpperCase()} {idx + 1}</span>
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
                        <img src={file.dataUrl} alt={`${t.pageLabel} ${idx + 1}`} className="h-full w-full object-cover" />
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
                {t.uploadTip}
              </p>
            </div>
          ) : (
            <>
              <div className="h-16 w-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                <Upload className="h-8 w-8 text-white" />
              </div>

              <div className="space-y-3">
                <p className="text-base font-bold text-slate-900">
                  {t.dragDropTitle}{' '}
                  <span className="text-black hover:text-slate-700 underline cursor-pointer font-extrabold">
                    {t.browseFiles}
                  </span>
                </p>

                <p className="text-xs text-slate-500 font-medium">
                  {t.uploadNote}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Manual Text Paste Accordion */}
        <div className="pt-2">
          <details className="group text-xs">
            <summary className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-between">
              <span>{t.pastePrompt}</span>
              <span className="text-[10px] text-slate-400 font-mono group-open:hidden">+ {t.expand}</span>
              <span className="text-[10px] text-slate-400 font-mono hidden group-open:inline">- {t.collapse}</span>
            </summary>
            <textarea
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                if (e.target.value.trim()) {
                  setUploadedFiles([]);
                }
              }}
              rows={4}
              placeholder={t.pastePlaceholder}
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
                <span>{t.optimizingPages}</span>
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
                  {uploadedFiles.length > 1
                    ? t.readUploadedPages.replace('{count}', String(uploadedFiles.length))
                    : uploadedFiles.length === 1
                    ? t.readUploadedDocument
                    : t.readCourtDocument}
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
