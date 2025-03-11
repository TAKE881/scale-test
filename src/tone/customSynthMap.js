// src/tone/customSynthMap.js
import * as Tone from "tone";
import { GuitarSynth } from "./synths/GuitarSynth";
import { ViolinSynth } from "./synths/ViolinSynth";
import { VoiceSynth } from "./synths/VoiceSynth";
import { RetroSynth } from "./synths/RetroSynth";

export const customSynthMap = {
    Synth: Tone.Synth,
    Guitar: GuitarSynth,
    Violin: ViolinSynth,
    Voice: VoiceSynth,
    Retro: RetroSynth,
};
