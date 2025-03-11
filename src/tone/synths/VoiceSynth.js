// src/tone/synths/VoiceSynth.js
import * as Tone from "tone";

export class VoiceSynth {
    constructor() {
        // 本体：MonoSynth（Voice風・息っぽい音）
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "triangle" }, // 柔らかく穏やかな波形
            envelope: {
                attack: 0.6,
                decay: 0.4,
                sustain: 0.5,
                release: 3
            }
        });

        // エフェクト：リバーブ（ふわっとした空間感）
        const reverb = new Tone.Reverb({ decay: 4, wet: 0.8 }).toDestination();
        this.synth.connect(reverb);
    }

    triggerAttackRelease(note, duration) {
        this.synth.triggerAttackRelease(note, duration);
    }
}
