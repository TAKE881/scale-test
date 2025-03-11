// src/tone/synths/VoiceSynth.js
import * as Tone from "tone";

export class VoiceSynth {
    constructor() {
        // メインSynth（Triangle波）
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "triangle" },
            envelope: {
                attack: 0.5,
                decay: 0.4,
                sustain: 0.4,
                release: 2.5,
            },
        });

        // ✅ サブオシレーター風に重ねる（FatOscillatorで厚み追加）
        const subSynth = new Tone.FatOscillator({
            type: "sine",
            frequency: 0, // main note に追従させる
            spread: 10,
            count: 3,
        }).start();

        // ✅ FormantFilter（母音共鳴）
        this.formant = new Tone.Filter({
            type: "bandpass",
            frequency: 800, // 中域の声のフォルマント（母音“a”〜“e”あたり）
            Q: 7,
        });

        // ✅ Vibrato（揺れ感）
        this.vibrato = new Tone.Vibrato({
            frequency: 5,
            depth: 0.1,
        }).start();

        // ✅ EQ（中音域さらに強調）
        this.eq = new Tone.EQ3({
            low: -6,
            mid: 5,
            high: -3,
        });

        // ✅ Reverb（空間感）
        this.reverb = new Tone.Reverb({
            decay: 4,
            wet: 0.7,
        });

        // 🔗 接続（MainSynth → Formant → Vibrato → EQ → Reverb → 出力）
        this.synth.connect(this.formant);
        this.formant.connect(this.vibrato);
        this.vibrato.connect(this.eq);
        this.eq.connect(this.reverb);
        this.reverb.toDestination();

        // （※サブオシレータは音として重ねる場合、mainSynthにMIXして接続も可）
        // ⇒ Tone.Mixer使えば調整もできる。今はシンプルにmainのみ出力。
    }

    async triggerAttackRelease(note, duration) {
        await Tone.loaded();
        this.synth.triggerAttackRelease(note, duration);
    }
}
