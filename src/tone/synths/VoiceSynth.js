// // src/tone/synths/VoiceSynth.js
// import * as Tone from "tone";

// export class VoiceSynth {
//     constructor() {
//         // 本体：MonoSynth（Voice風・息っぽい音）
//         this.synth = new Tone.MonoSynth({
//             oscillator: { type: "triangle" }, // 柔らかく穏やかな波形
//             envelope: {
//                 attack: 0.6,
//                 decay: 0.4,
//                 sustain: 0.5,
//                 release: 3
//             }
//         });

//         // エフェクト：リバーブ（ふわっとした空間感）
//         const reverb = new Tone.Reverb({ decay: 4, wet: 0.8 }).toDestination();
//         this.synth.connect(reverb);
//     }

//     triggerAttackRelease(note, duration) {
//         this.synth.triggerAttackRelease(note, duration);
//     }
// }
import * as Tone from "tone";

export class VoiceSynth {
    constructor() {
        // ベースはMonoSynth（triangle波）
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "triangle" },
            envelope: {
                attack: 0.5,   // ふわっと立ち上がる
                decay: 0.4,
                sustain: 0.4, // 息が続く感じ
                release: 2.5  // ゆっくりと消える
            }
        });

        // Vibrato（少しのピッチ揺れ） → 声のようなうねり
        const vibrato = new Tone.Vibrato({
            frequency: 5,  // 揺れる速さ（Hz）
            depth: 0.1     // 揺れの深さ(0~1)
        }).start();

        // EQで中音域を少し強調（人の声っぽさUP）
        const eq = new Tone.EQ3({
            low: -6,    // 低音を少しカット
            mid: 3,     // 中域を強調
            high: -2    // 高域少しカット
        });

        // リバーブ（空間感）
        const reverb = new Tone.Reverb({
            decay: 4,  // 残響長め
            wet: 0.7   // 全体的にしっかりリバーブ
        }).toDestination();

        // 接続順：synth → vibrato → eq → reverb → 出力
        this.synth.connect(vibrato);
        vibrato.connect(eq);
        eq.connect(reverb);
    }

    triggerAttackRelease(note, duration) {
        this.synth.triggerAttackRelease(note, duration);
    }
}
