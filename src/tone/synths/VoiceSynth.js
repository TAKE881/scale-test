import * as Tone from "tone";

export class VoiceSynth {
  constructor() {
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "triangle" },
      envelope: {
        attack: 0.3,
        decay: 0.2,
        sustain: 0.8,
        release: 3,
      },
      filter: {
        type: "lowpass",
        frequency: 1500,
      },
    });

    this.formant = new Tone.Filter({
      type: "bandpass",
      frequency: 800,
      Q: 6,
    });

    this.vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.05,
    });

    this.eq = new Tone.EQ3({
      low: -3,
      mid: 5,
      high: -1,
    });

    this.reverb = new Tone.Reverb({
      decay: 3,
      wet: 0.4,
    });

    this.outputGain = new Tone.Gain(3);

    this.synth.chain(
      this.formant,
      this.vibrato,
      this.eq,
      this.reverb,
      this.outputGain,
      Tone.Destination
    );
  }

  async triggerAttackRelease(note, duration) {
    await Tone.loaded();
    this.synth.triggerAttackRelease(note, duration);
  }
  stopNote() {
    this.synth.triggerRelease();
  }
  dispose() {
    this.synth.dispose();
    this.formant.dispose();
    this.vibrato.dispose();
    this.eq.dispose();
    this.reverb.dispose();
    this.outputGain.dispose();
  }
}
