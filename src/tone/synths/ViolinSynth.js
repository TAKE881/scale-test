// src/tone/synths/ViolinSynth.js
import * as Tone from "tone";

export class ViolinSynth {
    constructor() {
        // 本体：MonoSynth（Violin風）
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "sawtooth" }, // 鋸波 → 弦っぽい音
            envelope: {
                attack: 0.4,
                decay: 0.8,
                sustain: 0.6,
                release: 2
            },
            filter: {
                type: "lowpass",
                frequency: 1000
            }
        });

        // エフェクト（任意で追加してもOK、今回は直接出力）
        this.synth.toDestination();
    }

    triggerAttackRelease(note, duration) {
        this.synth.triggerAttackRelease(note, duration);
    }
}
