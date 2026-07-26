import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, RefreshCw, Radio } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LitigantAudioPlayerProps {
  textToRead: string;
  language: SupportedLanguage;
  onGenerateAudio?: () => Promise<string | null>;
}

export const LitigantAudioPlayer: React.FC<LitigantAudioPlayerProps> = ({
  textToRead,
  language,
  onGenerateAudio
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Handle Play/Pause
  const togglePlay = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      setIsPlaying(false);
      return;
    }

    // Attempt Gemini TTS or Web Speech API Fallback
    if (onGenerateAudio) {
      setIsGenerating(true);
      try {
        const audioBase64 = await onGenerateAudio();
        if (audioBase64) {
          // Play raw audio base64 or blob
          const sound = new Audio(`data:audio/wav;base64,${audioBase64}`);
          sound.playbackRate = playbackSpeed;
          sound.onended = () => setIsPlaying(false);
          sound.play();
          audioRef.current = sound;
          setIsPlaying(true);
          setIsGenerating(false);
          return;
        }
      } catch (err) {
        console.warn("TTS generation error, falling back to Web Speech API:", err);
      }
      setIsGenerating(false);
    }

    // Fallback: Web Speech API
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = playbackSpeed;
      
      const langCodes: Record<SupportedLanguage, string> = {
        hi: 'hi-IN',
        en: 'en-IN',
        bn: 'bn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        mr: 'mr-IN',
        gu: 'gu-IN'
      };

      utterance.lang = langCodes[language] || 'hi-IN';
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      synthRef.current.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-xs text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
            <Radio className={`h-5 w-5 ${isPlaying ? 'animate-pulse text-indigo-600' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                Voice Read Aloud Engine
              </h4>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-semibold">
                Bulbul / Mayura TTS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Listen to the order in your native spoken tongue
            </p>
          </div>
        </div>

        {/* Right: Audio Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Speed Select */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-[11px]">
            {[0.8, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-0.5 rounded font-mono font-medium cursor-pointer transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-white text-indigo-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Play / Pause Main Button */}
          <button
            onClick={togglePlay}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Synthesizing Voice...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause Audio</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Listen Aloud</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Simulated Waveform Visualizer */}
      {isPlaying && (
        <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-center gap-1 h-6">
          {[40, 70, 30, 90, 60, 100, 40, 80, 50, 90, 30, 75, 45, 85].map((height, idx) => (
            <span
              key={idx}
              className="w-1 bg-indigo-500 rounded-full animate-pulse"
              style={{
                height: `${height}%`,
                animationDelay: `${(idx * 0.1) % 0.8}s`
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};
