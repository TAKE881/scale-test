import { useCallback } from "react";
import * as Tone from "tone";

export const useCorrectSound = () => {
  const playCorrectSound = useCallback(async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("A#5", "8n", now);
    synth.triggerAttackRelease("F#5", "8n", now + 0.1);
  }, []);

  //   const playIncorrectSound = useCallback(async () => {
  //     await Tone.start();
  //     const synth = new Tone.Synth().toDestination();
  //     const now = Tone.now();
  //     synth.triggerAttackRelease("C#4", "8n", now);
  //     synth.triggerAttackRelease("C#4", "8n", now + 0.1);
  //   }, []);
  const playIncorrectSound = useCallback(async () => {
    await Tone.start();
    const synth = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.6,
        release: 0.2,
      },
      volume: -8, // 🔻 音量を8dB下げ
    }).toDestination();

    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("C4", "16n", now + 0.1);
  }, []);

  return {
    playCorrectSound,
    playIncorrectSound,
  };
};
