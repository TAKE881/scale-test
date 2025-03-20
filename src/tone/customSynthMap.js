import * as Tone from "tone";
import { GuitarSynth } from "./synths/GuitarSynth";
import { ViolinSynth } from "./synths/ViolinSynth";
import { VoiceSynth } from "./synths/VoiceSynth";
import { RetroSynth } from "./synths/RetroSynth";

export const customSynthMap = {
  Synth: class {
    constructor() {
      this.synth = new Tone.Synth().toDestination();
    }
    triggerAttackRelease(note, duration) {
      this.synth.triggerAttackRelease(note, duration);
    }
  },
  Guitar: GuitarSynth,
  Violin: ViolinSynth,
  Voice: VoiceSynth,
  Retro: RetroSynth,
};
