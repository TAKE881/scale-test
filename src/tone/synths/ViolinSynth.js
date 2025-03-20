import * as Tone from "tone";

export class ViolinSynth {
  constructor() {
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      envelope: {
        attack: 0.4,
        decay: 0.8,
        sustain: 0.6,
        release: 2,
      },
      filter: {
        type: "lowpass",
        frequency: 1000,
      },
    });

    this.synth.toDestination();
  }

  triggerAttackRelease(note, duration) {
    this.synth.triggerAttackRelease(note, duration);
  }
  dispose() {
    this.synth.dispose();
  }
}
