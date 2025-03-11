// src/tone/synths/GuitarSynth.js
import * as Tone from "tone";

export class GuitarSynth {
    constructor() {
        // 本体：MonoSynth
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "fatsawtooth" }, // ギター風に派手な音に
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

        // Distortion
        this.distortion = new Tone.Distortion({
            distortion: 0.7,
            oversample: "4x"
        });

        // Chorus
        this.chorus = new Tone.Chorus({
            frequency: 4,
            delayTime: 2.5,
            depth: 0.3,
            spread: 180
        });

        // EQ
        this.eq = new Tone.EQ3({
            low: -8,
            mid: 1,
            high: 5
        });

        // Reverb
        this.reverb = new Tone.Reverb({
            decay: 2.5,
            wet: 0.4
        });

        // 接続（出力は Reverb → Destination）
        this.synth.connect(this.distortion);
        this.distortion.connect(this.chorus);
        this.chorus.connect(this.eq);
        this.eq.connect(this.reverb);
        this.reverb.toDestination();

        // ★ Chorus は明示的に start が必要！
        this.chorus.start();
    }

    async triggerAttackRelease(note, duration) {
        await Tone.loaded(); // リバーブなどが読み込み完了してから
        this.synth.triggerAttackRelease(note, duration);
    }
}
