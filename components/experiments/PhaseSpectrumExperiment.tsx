'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

// --- Constants & Types ---

const SAMPLE_RATE = 48000;
const F0 = 200; // Fundamental frequency
const MAX_HARMONICS = 5; // Max selectable harmonics

type PhaseType = 'zero' | 'custom';
type SpectrumType = 'sawtooth' | 'square' | 'flat';

// --- Audio Generation Logic ---

const getAmplitude = (k: number, type: SpectrumType): number => {
  switch (type) {
    case 'sawtooth':
      return 1 / k;
    case 'square':
      return k % 2 === 1 ? 1 / k : 0; // Odd harmonics only
    case 'flat':
      return 1.0;
    default:
      return 0;
  }
};

const createBuffer = (
  ctx: AudioContext,
  phaseType: PhaseType,
  customPhases: number[],
  duration: number,
  activeHarmonics: number,
  spectrumType: SpectrumType
): AudioBuffer => {
  const buffer = ctx.createBuffer(1, Math.floor(SAMPLE_RATE * duration), SAMPLE_RATE);
  const data = buffer.getChannelData(0);
  const numSamples = data.length;

  // 1. Generate Carrier (Harmonic Complex Tone)

  const phases = new Float32Array(activeHarmonics + 1);
  if (phaseType === 'custom') {
    // customPhases is 0-indexed (0 -> harmonic 1)
    for (let k = 1; k <= activeHarmonics; k++) {
      phases[k] = customPhases[k - 1];
    }
  } else {
    phases.fill(0);
  }

  // Calculate max possible amplitude for normalization based on active harmonics and spectrum type
  let maxAmpSum = 0;
  for (let k = 1; k <= activeHarmonics; k++) {
    maxAmpSum += getAmplitude(k, spectrumType);
  }
  // Safety margin (avoid div by zero if maxAmpSum is 0, though unlikely with current types)
  const normalizationScale = maxAmpSum > 0 ? 0.9 / maxAmpSum : 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sample = 0;
    for (let k = 1; k <= activeHarmonics; k++) {
      const amp = getAmplitude(k, spectrumType);
      if (amp > 0) {
        sample += amp * Math.cos(2 * Math.PI * k * F0 * t + phases[k]);
      }
    }
    data[i] = sample * normalizationScale;
  }

  // 2. Apply Envelope (Steady / Sustained)
  const attackTime = 0.02;
  const decayTime = 0.0;
  const sustainLevel = 1.0;
  const releaseTime = 0.02;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let env = 0;

    if (t < attackTime) {
      env = t / attackTime;
    } else if (t < attackTime + decayTime) {
      env = 1.0 - (1.0 - sustainLevel) * ((t - attackTime) / decayTime);
    } else if (t < duration - releaseTime) {
      env = sustainLevel;
    } else if (t < duration) {
      const releaseStart = duration - releaseTime;
      env = sustainLevel * (1.0 - (t - releaseStart) / releaseTime);
    } else {
      env = 0;
    }

    data[i] *= env;
  }

  return buffer;
};

export default function PhaseSpectrumExperiment() {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [spectrumType, setSpectrumType] = useState<SpectrumType>('sawtooth');
  const [numHarmonics, setNumHarmonics] = useState<number>(3);

  // Custom phases (0 to 2PI) for harmonics 1 to MAX_HARMONICS
  const [customPhases, setCustomPhases] = useState<number[]>(
    Array.from({ length: MAX_HARMONICS }, () => Math.random() * 2 * Math.PI)
  );

  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const ampSpecCanvasRef = useRef<HTMLCanvasElement>(null);
  const phaseSpecCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize AudioContext
  const initAudio = useCallback(() => {
    if (!audioCtx) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioCtx(ctx);
      return ctx;
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }, [audioCtx]);

  // Draw Visualizations
  useEffect(() => {
    // 1. Waveform Visualization
    const wfCanvas = waveformCanvasRef.current;
    if (wfCanvas) {
      const ctx = wfCanvas.getContext('2d');
      if (ctx) {
        const width = wfCanvas.width;
        const height = wfCanvas.height;
        ctx.clearRect(0, 0, width, height);

        // Grid
        ctx.strokeStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        const periodsToShow = 2;
        let maxAmpSum = 0;
        for (let k = 1; k <= numHarmonics; k++) maxAmpSum += getAmplitude(k, spectrumType);
        const vizScale = maxAmpSum > 0 ? (height / 2) * 0.9 / maxAmpSum : 0;

        // Custom Phase Waveform
        ctx.beginPath();
        ctx.strokeStyle = '#7c3aed'; // Purple
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          const t = (x / width) * (periodsToShow / F0);
          let sample = 0;
          for (let k = 1; k <= numHarmonics; k++) {
            const amp = getAmplitude(k, spectrumType);
            if (amp > 0) {
              const phase = customPhases[k - 1];
              sample += amp * Math.cos(2 * Math.PI * k * F0 * t + phase);
            }
          }
          const y = height / 2 - (sample * vizScale);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Zero Phase Waveform (Background)
        ctx.beginPath();
        ctx.strokeStyle = '#e5e7eb'; // Gray-200
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x++) {
          const t = (x / width) * (periodsToShow / F0);
          let sample = 0;
          for (let k = 1; k <= numHarmonics; k++) {
            const amp = getAmplitude(k, spectrumType);
            if (amp > 0) {
              sample += amp * Math.cos(2 * Math.PI * k * F0 * t + 0);
            }
          }
          const y = height / 2 - (sample * vizScale);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // 2. Amplitude Spectrum Visualization
    const ampCanvas = ampSpecCanvasRef.current;
    if (ampCanvas) {
      const ctx = ampCanvas.getContext('2d');
      if (ctx) {
        const width = ampCanvas.width;
        const height = ampCanvas.height;
        ctx.clearRect(0, 0, width, height);

        const barWidth = (width / MAX_HARMONICS) * 0.6;
        const spacing = (width / MAX_HARMONICS);

        // Draw bars
        for (let i = 0; i < MAX_HARMONICS; i++) {
          const k = i + 1;
          const isActive = k <= numHarmonics;
          const amp = getAmplitude(k, spectrumType);
          const barHeight = amp * height * 0.8; // Scale to fit (relative to max possible amp 1.0)

          const x = i * spacing + (spacing - barWidth) / 2;
          const y = height - barHeight;

          ctx.fillStyle = isActive && amp > 0 ? '#3b82f6' : '#e5e7eb'; // Blue if active & non-zero, Gray otherwise
          if (amp > 0) {
            ctx.fillRect(x, y, barWidth, barHeight);
          }

          // Label
          ctx.fillStyle = isActive ? '#374151' : '#9ca3af';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`H${k}`, x + barWidth / 2, height - 5);
        }
      }
    }

    // 3. Phase Spectrum Visualization
    const phaseCanvas = phaseSpecCanvasRef.current;
    if (phaseCanvas) {
      const ctx = phaseCanvas.getContext('2d');
      if (ctx) {
        const width = phaseCanvas.width;
        const height = phaseCanvas.height;
        ctx.clearRect(0, 0, width, height);

        const spacing = (width / MAX_HARMONICS);

        // Draw grid lines for 0, PI, 2PI
        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1;
        // 0
        ctx.beginPath(); ctx.moveTo(0, height - 20); ctx.lineTo(width, height - 20); ctx.stroke();
        // PI
        ctx.beginPath(); ctx.moveTo(0, (height - 20) / 2); ctx.lineTo(width, (height - 20) / 2); ctx.stroke();
        // 2PI
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(width, 0); ctx.stroke();

        // Draw stems
        for (let i = 0; i < MAX_HARMONICS; i++) {
          const k = i + 1;
          const amp = getAmplitude(k, spectrumType);
          const isActive = k <= numHarmonics && amp > 0; // Only show phase for active harmonics with non-zero amplitude
          const phase = customPhases[i];

          // Map 0-2PI to height-0 (y axis inverted)
          // Let's leave some padding at bottom for labels
          const graphHeight = height - 20;
          const y = graphHeight - (phase / (2 * Math.PI)) * graphHeight;
          const x = i * spacing + spacing / 2;

          if (isActive) {
            // Stem
            ctx.beginPath();
            ctx.strokeStyle = '#7c3aed'; // Purple
            ctx.lineWidth = 2;
            ctx.moveTo(x, graphHeight);
            ctx.lineTo(x, y);
            ctx.stroke();

            // Head
            ctx.beginPath();
            ctx.fillStyle = '#7c3aed';
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            // Inactive placeholder
            ctx.beginPath();
            ctx.fillStyle = '#e5e7eb';
            ctx.arc(x, graphHeight, 3, 0, 2 * Math.PI);
            ctx.fill();
          }

          // Label
          ctx.fillStyle = isActive ? '#374151' : '#9ca3af';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`H${k}`, x, height - 5);
        }
      }
    }

  }, [customPhases, numHarmonics, spectrumType]);

  const playSound = async (phaseType: PhaseType) => {
    const ctx = initAudio();
    if (!ctx) return;

    const duration = 1.0; // Steady duration

    const buffer = createBuffer(ctx, phaseType, customPhases, duration, numHarmonics, spectrumType);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  const randomizePhases = () => {
    setCustomPhases(Array.from({ length: MAX_HARMONICS }, () => Math.random() * 2 * Math.PI));
  };

  const resetPhases = () => {
    setCustomPhases(new Array(MAX_HARMONICS).fill(0));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 my-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Phase Spectrum Experiment</h3>

      {/* Controls Row 1: Sound Source & Harmonics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sound Source</label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={spectrumType === 'sawtooth' ? 'default' : 'outline'}
              onClick={() => setSpectrumType('sawtooth')}
              className="text-xs h-8 px-2"
            >
              Sawtooth (1/k)
            </Button>
            <Button
              variant={spectrumType === 'square' ? 'default' : 'outline'}
              onClick={() => setSpectrumType('square')}
              className="text-xs h-8 px-2"
            >
              Square (Odd)
            </Button>
            <Button
              variant={spectrumType === 'flat' ? 'default' : 'outline'}
              onClick={() => setSpectrumType('flat')}
              className="text-xs h-8 px-2"
            >
              Flat (1)
            </Button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Harmonics: {numHarmonics}</label>
          <input
            type="range"
            min="1"
            max={MAX_HARMONICS}
            step="1"
            value={numHarmonics}
            onChange={(e) => setNumHarmonics(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Waveform Visualization (Full Width on mobile, Left on Desktop) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Waveform (Purple: Custom, Gray: Zero)</label>
          <canvas
            ref={waveformCanvasRef}
            width={600}
            height={150}
            className="w-full bg-white border border-gray-200 rounded-lg"
          />
        </div>

        {/* Amplitude Spectrum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amplitude Spectrum</label>
          <canvas
            ref={ampSpecCanvasRef}
            width={300}
            height={150}
            className="w-full bg-white border border-gray-200 rounded-lg"
          />
        </div>

        {/* Phase Spectrum */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Phase Spectrum (Custom)</label>
            <div className="space-x-1">
              <Button onClick={randomizePhases} size="sm" variant="outline" className="text-[10px] h-6 px-2">Rand</Button>
              <Button onClick={resetPhases} size="sm" variant="outline" className="text-[10px] h-6 px-2">Reset</Button>
            </div>
          </div>
          <canvas
            ref={phaseSpecCanvasRef}
            width={300}
            height={150}
            className="w-full bg-white border border-gray-200 rounded-lg"
          />
        </div>
      </div>

      {/* Phase Sliders (Active Harmonics Only) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-4">Phase Adjustment (Active Harmonics)</label>
        <div className="grid grid-cols-5 gap-2">
          {customPhases.map((phase, i) => {
            if (i >= numHarmonics) return null;
            const k = i + 1;
            const amp = getAmplitude(k, spectrumType);
            if (amp === 0) return (
              <div key={i} className="flex flex-col items-center opacity-30">
                <div className="h-2 w-full bg-gray-100 rounded-lg mt-2"></div>
                <span className="text-[10px] text-gray-400 mt-1">H{k} (0)</span>
              </div>
            );

            return (
              <div key={i} className="flex flex-col items-center">
                <input
                  type="range"
                  min="0"
                  max={2 * Math.PI}
                  step="0.1"
                  value={phase}
                  onChange={(e) => {
                    const newPhases = [...customPhases];
                    newPhases[i] = parseFloat(e.target.value);
                    setCustomPhases(newPhases);
                  }}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
                <span className="text-[10px] text-gray-500 mt-1">H{k}</span>
                <span className="text-[10px] text-gray-400">{Math.round(phase * 180 / Math.PI)}°</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Play Controls */}
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <h4 className="font-bold text-gray-700 mb-2">Condition 1: All-zero Phase</h4>
          <p className="text-xs text-gray-500 mb-4 h-10">
            All active harmonics aligned (0°).
          </p>
          <Button onClick={() => playSound('zero')} className="w-full">
            Play Zero Phase
          </Button>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-700 mb-2">Condition 2: Custom Phase</h4>
          <p className="text-xs text-gray-500 mb-4 h-10">
            Phases set by sliders above.
          </p>
          <Button onClick={() => playSound('custom')} className="w-full" variant="secondary">
            Play Custom Phase
          </Button>
        </div>
      </div>
    </div>
  );
}
