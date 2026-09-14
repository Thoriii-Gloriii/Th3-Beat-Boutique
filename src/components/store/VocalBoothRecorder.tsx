'use client';

import { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2, Download } from 'lucide-react';

type RecordingState = 'idle' | 'recording' | 'recorded';

export default function VocalBoothRecorder() {
  const [state, setState] = useState<RecordingState>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        setState('recorded');
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setState('recording');
    } catch {
      setError('Microphone access denied. Please allow access to use the Vocal Booth.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    setState('idle');
  };

  return (
    <div className="glass rounded-2xl border border-white/5 p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-sm uppercase tracking-widest">Vocal Booth</h3>
        <span className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">
          Record over this beat
        </span>
      </div>

      {error && (
        <p className="text-[var(--primary-red)] text-xs text-center mb-3">{error}</p>
      )}

      <div className="flex flex-col items-center gap-4">
        {/* Recording visualiser placeholder */}
        <div className={`w-full h-16 rounded-xl border flex items-center justify-center transition-all ${
          state === 'recording'
            ? 'border-[var(--primary-red)] bg-[var(--primary-red)]/5 animate-pulse'
            : 'border-white/10 bg-white/5'
        }`}>
          {state === 'recording' ? (
            <div className="flex gap-1 items-end h-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-[var(--primary-red)]"
                  style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          ) : (
            <span className="text-[var(--muted-text)] text-xs">
              {state === 'recorded' ? '✅ Recording captured' : 'Press Record to start'}
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {state === 'idle' && (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-red)] rounded-full text-white text-sm font-bold neon-glow hover:brightness-110 transition-all"
            >
              <Mic className="w-4 h-4" />
              Record
            </button>
          )}

          {state === 'recording' && (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-white text-sm font-bold hover:bg-white/20 transition-all"
            >
              <Square className="w-4 h-4 fill-white" />
              Stop
            </button>
          )}

          {state === 'recorded' && audioUrl && (
            <>
              <audio src={audioUrl} controls className="hidden" id="vocal-playback" />
              <button
                onClick={() => document.getElementById('vocal-playback')?.play()}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-bold hover:bg-white/20 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Play
              </button>
              <a
                href={audioUrl}
                download="vocal-demo.webm"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-bold hover:bg-white/20 transition-all"
              >
                <Download className="w-4 h-4" />
                Save
              </a>
              <button
                onClick={deleteRecording}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-red)]/10 border border-[var(--primary-red)]/30 rounded-full text-[var(--primary-red)] text-sm font-bold hover:bg-[var(--primary-red)]/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
