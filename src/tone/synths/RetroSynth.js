// src/tone/synths/RetroSynth.js
import * as Tone from "tone";

export class RetroSynth {
    constructor() {
        // Square音（ピコッ）メイン
        this.squareSE = new Tone.Synth({
            oscillator: { type: "square" },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 }
        }).toDestination();

        // Triangle音（ボコッ）サブ効果
        this.triangleSE = new Tone.Synth({
            oscillator: { type: "triangle" },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 }
        }).toDestination();

        // ノイズ音（シャッ）効果音
        this.noiseSE = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
        }).toDestination();
    }

    triggerAttackRelease(note = "C4", duration = "8n") {
        // 3種類同時に鳴らしてレトロSE感を出す
        this.squareSE.triggerAttackRelease(note, duration);
        this.triangleSE.triggerAttackRelease("C3", duration);
        this.noiseSE.triggerAttackRelease(duration);
    }
}
