import * as Tone from "tone";

export class GuitarSynth {
  constructor() {
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "fatsawtooth" },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.3,
        release: 0.8,
      },
      filter: {
        type: "lowpass",
        frequency: 800,
        Q: 2,
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 0.6,
        baseFrequency: 700,
        octaves: 3,
      },
    });

    this.distortion = new Tone.Distortion({
      distortion: 0.7,
      oversample: "4x",
    });

    this.chorus = new Tone.Chorus({
      frequency: 4,
      delayTime: 2.5,
      depth: 0.3,
      spread: 180,
    });

    this.eq = new Tone.EQ3({
      low: -8,
      mid: 1,
      high: 5,
    });

    this.reverb = new Tone.Reverb({
      decay: 2.5,
      wet: 0.4,
    });

    this.synth.connect(this.distortion);
    this.distortion.connect(this.chorus);
    this.chorus.connect(this.eq);
    this.eq.connect(this.reverb);
    this.reverb.toDestination();

    this.chorus.start();
  }

  async triggerAttackRelease(note, duration) {
    await Tone.loaded();
    this.synth.triggerAttackRelease(note, duration);
  }
  dispose() {
    this.synth.dispose();
    this.distortion.dispose();
    this.chorus.dispose();
    this.eq.dispose();
    this.reverb.dispose();
  }
}
