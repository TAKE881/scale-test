// // src/tone/synths/GuitarSynth.js
// import * as Tone from "tone";

// export class GuitarSynth {
//     constructor() {
//         // 本体：MonoSynth
//         this.synth = new Tone.MonoSynth({
//             oscillator: { type: "square" },
//             envelope: {
//                 attack: 0.01,
//                 decay: 0.3,
//                 sustain: 0.3,
//                 release: 0.8
//             },
//             filter: {
//                 type: "lowpass",
//                 frequency: 800,
//                 Q: 2
//             },
//             filterEnvelope: {
//                 attack: 0.01,
//                 decay: 0.2,
//                 sustain: 0.2,
//                 release: 0.6,
//                 baseFrequency: 700,
//                 octaves: 3
//             }
//         });

//         // エフェクト：リバーブ → ディストーション → 出力
//         const distortion = new Tone.Distortion(0.6).toDestination();
//         const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.4 }).connect(distortion);

//         // 接続
//         this.synth.connect(reverb);
//     }

//     triggerAttackRelease(note, duration) {
//         this.synth.triggerAttackRelease(note, duration);
//     }
// }
import * as Tone from "tone";

export class GuitarSynth {
    constructor() {
        // 本体：MonoSynth
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "square" }, // ← ここを "fatsawtooth" にするとさらに派手
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

        // 歪み強化＆oversampleを追加
        const distortion = new Tone.Distortion({
            distortion: 0.7,   // 歪み具合(0~1推奨)
            oversample: "4x"   // 音をクリアに保ちつつ歪み
        });

        // コーラス（揺れ感） 4Hz, ディレイタイム2.5ms, depth=0.3
        const chorus = new Tone.Chorus(4, 2.5, 0.3).start();

        // EQで微調整（低音-8dB, 中音+1dB, 高音+5dB）
        const eq = new Tone.EQ3({ low: -8, mid: 1, high: 5 });

        // リバーブ（適度な空間）
        const reverb = new Tone.Reverb({
            decay: 2.5,
            wet: 0.4
        }).toDestination();

        // 接続順：Synth → Distortion → Chorus → EQ → Reverb → 出力
        this.synth.connect(distortion);
        distortion.connect(chorus);
        chorus.connect(eq);
        eq.connect(reverb);
    }

    triggerAttackRelease(note, duration) {
        this.synth.triggerAttackRelease(note, duration);
    }
}
