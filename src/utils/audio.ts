/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Offline Synth Sound Effects using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = (type: "correct" | "wrong" | "victory" | "click", enabled: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const playTone = (freqs: number[], durations: number[], typeOsc: OscillatorType = "sine") => {
    try {
      const now = ctx.currentTime;
      let startTime = now;

      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = typeOsc;
        osc.frequency.setValueAtTime(freq, startTime);

        // Simple volume envelope
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + durations[index]);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + durations[index]);

        startTime += durations[index] * 0.8; // overlap slightly
      });
    } catch (err) {
      console.warn("Web Audio play failed:", err);
    }
  };

  switch (type) {
    case "click":
      playTone([300], [0.08], "triangle");
      break;
    case "correct":
      // A bright ascending major third (C5 to E5)
      playTone([523.25, 659.25], [0.12, 0.2], "sine");
      break;
    case "wrong":
      // A low buzz sliding downwards
      playTone([180, 130], [0.15, 0.25], "sawtooth");
      break;
    case "victory":
      // A happy celebratory arpeggio (C5 - E5 - G5 - C6!)
      playTone([523.25, 659.25, 783.99, 1046.50], [0.1, 0.1, 0.1, 0.35], "sine");
      break;
  }
};
