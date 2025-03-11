// src/tone/setupCustomSynths.js
import * as Tone from "tone";
import { GuitarSynth } from "./synths/GuitarSynth";
import { ViolinSynth } from "./synths/ViolinSynth";
import { VoiceSynth } from "./synths/VoiceSynth";
import { RetroSynth } from "./synths/RetroSynth";

// Toneオブジェクトに自作Synthを登録（Tone.Synthと同じように扱える）
Tone.Guitar = GuitarSynth;
Tone.Violin = ViolinSynth;
Tone.Voice = VoiceSynth;
Tone.Retro = RetroSynth;
