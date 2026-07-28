import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Radio, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslation } from '../utils/translations';

interface LitigantAudioPlayerProps {
  audioScript: string;
  selectedLanguage: SupportedLanguage;
}

const AUDIO_GENERATING_LABELS: Record<SupportedLanguage, string> = {
  en: 'Generating voice summary...',
  hi: 'आवाज़ में सारांश तैयार हो रहा है...',
  bn: 'কণ্ঠে সারসংক্ষেপ তৈরি হচ্ছে...',
  ta: 'குரல் சுருக்கம் உருவாக்கப்படுகிறது...',
  te: 'వాయిస్ సారాంశం తయారవుతోంది...',
  mr: 'आवाजातील सारांश तयार होत आहे...',
  gu: 'અવાજમાં સારાંશ તૈયાર થઈ રહ્યો છે...',
  pa: 'ਆਵਾਜ਼ ਵਿੱਚ ਸਾਰ ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ...',
};

export const LitigantAudioPlayer: React.FC<LitigantAudioPlayerProps> = ({
  audioScript,
  selectedLanguage,
}) => {
  const activeLang = selectedLanguage;
  const text = audioScript;
  const t = getTranslation(activeLang);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setIsPlaying(false);
    setAudioError('');
  }, [activeLang, text]);

  const generateAudio = async (): Promise<string | null> => {
    const response = await fetch('/api/generate-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language: activeLang,
        speaker: 'shubh',
        pace: playbackSpeed,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.success || !data.audioBase64) {
      throw new Error('Voice playback is temporarily unavailable.');
    }
    return data.audioBase64;
  };

  // Handle Play/Pause
  const togglePlay = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    setAudioError('');
    if (audioRef.current) {
      try {
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0;
        }
        audioRef.current.playbackRate = playbackSpeed;
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      } catch {
        audioRef.current = null;
      }
    }

    setIsGenerating(true);
    try {
      const audioBase64 = await generateAudio();
      if (!audioBase64) {
        throw new Error('The voice service returned no audio.');
      }

      const sound = new Audio(`data:audio/wav;base64,${audioBase64}`);
      sound.playbackRate = playbackSpeed;
      sound.onended = () => setIsPlaying(false);
      sound.onerror = () => {
        setIsPlaying(false);
        audioRef.current = null;
        setAudioError('The audio could not be played on this device.');
      };
      await sound.play();
      audioRef.current = sound;
      setIsPlaying(true);
    } catch (err: any) {
      console.warn('Voice generation error:', err);
      setAudioError(err?.message || 'Voice playback is temporarily unavailable.');
      setIsPlaying(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-center shrink-0">
            <Radio className={`h-5 w-5 ${isPlaying ? 'animate-pulse text-black' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                {t.listenTitle}
              </h4>
              <span className="text-[10px] bg-slate-200 text-slate-900 px-2 py-0.5 rounded font-semibold">
                Voice AI
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.listenSub}
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
                    ? 'bg-black text-white font-bold shadow-xs'
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
                ? 'bg-slate-800 hover:bg-slate-900 text-white'
                : 'bg-black hover:bg-slate-800 text-white'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{AUDIO_GENERATING_LABELS[activeLang]}</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>{t.pauseAudio}</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>{t.playAudioButton}</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Simulated Waveform Visualizer */}
      {isPlaying && (
        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-center gap-1 h-6">
          {[40, 70, 30, 90, 60, 100, 40, 80, 50, 90, 30, 75, 45, 85].map((height, idx) => (
            <span
              key={idx}
              className="w-1 bg-black rounded-full animate-pulse"
              style={{
                height: `${height}%`,
                animationDelay: `${(idx * 0.1) % 0.8}s`
              }}
            ></span>
          ))}
        </div>
      )}

      {audioError && (
        <div className="mt-3 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{audioError}</span>
        </div>
      )}
    </div>
  );
};
