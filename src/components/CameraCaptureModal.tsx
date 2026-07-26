import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Sliders, RotateCw, RefreshCw, Sparkles, AlertTriangle, Check, FileCheck } from 'lucide-react';
import { ImageProcessingFilters } from '../types';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (payload: { imageBase64?: string; textContent?: string }) => void;
  isLoading: boolean;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  isLoading
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'sample_photocopy'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [manualText, setManualText] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [filters, setFilters] = useState<ImageProcessingFilters>({
    deskew: true,
    contrastBoost: true,
    binarization: true,
    noiseReduction: true,
    rotationDegrees: 0,
  });

  // Camera stream initializer
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isOpen && activeMode === 'camera') {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setIsCameraActive(true);
        })
        .catch((err) => {
          console.warn("Camera access denied or unequipped:", err);
          setIsCameraActive(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach((track) => track.stop());
      }
      setIsCameraActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, activeMode]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhotoFromCamera = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        setActiveMode('upload');
      }
    }
  };

  const handleStartAnalysis = () => {
    if (selectedImage) {
      onAnalyze({ imageBase64: selectedImage });
    } else if (manualText.trim()) {
      onAnalyze({ textContent: manualText });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden text-slate-900 my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Capture or Upload Court Order</h2>
              <p className="text-xs text-slate-500">Photocopied, skewed, or sealed document input with Sarvam Vision</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-6 pt-4 flex border-b border-slate-200 gap-2 bg-slate-50/50">
          <button
            onClick={() => setActiveMode('upload')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'upload'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            Upload File / Photo
          </button>
          <button
            onClick={() => setActiveMode('camera')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'camera'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="h-3.5 w-3.5" />
            Live Camera Capture
          </button>
          <button
            onClick={() => {
              setActiveMode('sample_photocopy');
              setManualText(`IN THE COURT OF ADDITIONAL DISTRICT JUDGE IV, KANPUR NAGAR
Original Suit No. 412/2026
Ashok Verma v. Ramakant Sharma
ORDER DATED 22-07-2026

Para 1: Matter comes up for application 6C filed by plaintiff Ramakant Sharma for mandatory demolition against defendant Ashok Verma.
Para 2: Plaintiff counsel argued that defendant illegally encroached 4 feet passage and prayed for immediate demolition wall.
Para 3: Defendant counsel submitted ancestral land receipts for 30 years.
Para 4: Court finds no urgency for demolition.
Para 5: Application 6C for mandatory demolition is REJECTED. Defendant Ashok Verma directed to submit property tax receipts for 2021-2026 by 14th August 2026 in Court Room 4.`);
            }}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'sample_photocopy'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCheck className="h-3.5 w-3.5" />
            Paste / Sample Order Text
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Mode 1: File Upload */}
          {activeMode === 'upload' && (
            <div className="space-y-4">
              {!selectedImage ? (
                <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-slate-100/50">
                  <Upload className="h-10 w-10 text-indigo-600 mb-3 animate-bounce" />
                  <span className="text-sm font-bold text-slate-800">Click to upload photographed court order</span>
                  <span className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP (Photocopy, scanned PDF photo, mobile camera capture)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                  <div className="relative max-h-72 overflow-hidden flex items-center justify-center bg-slate-100 rounded-lg">
                    <img
                      src={selectedImage}
                      alt="Captured Court Order"
                      className="max-h-72 object-contain transition-all"
                      style={{
                        transform: `rotate(${filters.rotationDegrees}deg)`,
                        filter: `${filters.contrastBoost ? 'contrast(130%)' : ''} ${filters.binarization ? 'grayscale(100%)' : ''}`
                      }}
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-slate-900/80 text-white p-1.5 rounded-full hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Camera Capture */}
          {activeMode === 'camera' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-200">
                {isCameraActive ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute inset-0 border-2 border-indigo-500/40 pointer-events-none rounded-xl m-4 flex flex-col justify-between p-4">
                      <div className="text-[11px] text-indigo-300 bg-slate-900/80 px-2.5 py-0.5 rounded self-start border border-indigo-500/30">
                        Align Court Order within frame
                      </div>
                      <div className="text-[10px] text-slate-300 text-center bg-slate-900/80 px-2 py-1 rounded">
                        Sarvam Vision extracts text, structure, and reading order
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 text-slate-400 space-y-2">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto" />
                    <p className="text-xs font-semibold text-slate-300">Camera unavailable or permission denied</p>
                    <p className="text-[11px] text-slate-500">Please switch to "Upload File / Photo" tab or grant camera permissions.</p>
                  </div>
                )}
              </div>

              {isCameraActive && (
                <button
                  onClick={capturePhotoFromCamera}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <span>Take Snapshot of Order</span>
                </button>
              )}
            </div>
          )}

          {/* Mode 3: Text Paste */}
          {activeMode === 'sample_photocopy' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Photocopied Court Order Text Content</span>
                <span className="text-[11px] text-slate-500 font-normal">Paragraph structure auto-preserved</span>
              </label>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                rows={8}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                placeholder="Paste photocopied court order or judgment text..."
              />
            </div>
          )}

          {/* Pre-Processing Pipeline Toggle Switches */}
          {(selectedImage || manualText || activeMode === 'upload') && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-indigo-600" />
                  Sarvam Vision Capture Preparation
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.deskew}
                    onChange={(e) => setFilters({ ...filters, deskew: e.target.checked })}
                    className="accent-indigo-600 rounded"
                  />
                  <span>Auto-Deskew</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.contrastBoost}
                    onChange={(e) => setFilters({ ...filters, contrastBoost: e.target.checked })}
                    className="accent-indigo-600 rounded"
                  />
                  <span>Contrast Boost</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.binarization}
                    onChange={(e) => setFilters({ ...filters, binarization: e.target.checked })}
                    className="accent-indigo-600 rounded"
                  />
                  <span>Photocopy Cleaner</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, rotationDegrees: (filters.rotationDegrees + 90) % 360 })}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 text-xs font-medium text-left cursor-pointer"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Rotate ({filters.rotationDegrees}°)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleStartAnalysis}
            disabled={isLoading || (!selectedImage && !manualText.trim())}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isLoading || (!selectedImage && !manualText.trim())
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Running Sarvam Vision & Sarvam-105B...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Process Court Order</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
