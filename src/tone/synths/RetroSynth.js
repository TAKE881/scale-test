import * as Tone from "tone";

export class RetroSynth {
  constructor() {
    this.squareSE = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 },
    }).toDestination();

    this.triangleSE = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 },
    }).toDestination();

    this.noiseSE = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 },
    }).toDestination();
  }

  triggerAttackRelease(note = "C4", duration = "8n") {
    this.squareSE.triggerAttackRelease(note, duration);
    this.triangleSE.triggerAttackRelease("C3", duration);
    this.noiseSE.triggerAttackRelease(duration);
  }
  dispose() {
    this.squareSE.dispose();
    this.triangleSE.dispose();
    this.noiseSE.dispose();
  }
}
