// src/tone/synths/GuitarSynth.js
import * as Tone from "tone";

export class GuitarSynth {
    constructor() {
        // 本体：MonoSynth
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "square" },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.3,
                release: 0.8
            },
            filter: {
                type: "lowpass",
                frequency: 800,
                Q: 2
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.2,
                release: 0.6,
                baseFrequency: 700,
                octaves: 3
            }
        });

        // エフェクト：リバーブ → ディストーション → 出力
        const distortion = new Tone.Distortion(0.6).toDestination();
        const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.4 }).connect(distortion);

        // 接続
        this.synth.connect(reverb);
    }

    triggerAttackRelease(note, duration) {
        this.synth.triggerAttackRelease(note, duration);
    }
}
