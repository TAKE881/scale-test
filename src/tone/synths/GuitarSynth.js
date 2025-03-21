import * as Tone from "tone";

/**
 * GuitarSynth クラス
 * ギター風の音色をシミュレートするカスタムシンセサイザー。
 * 複数のエフェクト（ディストーション、コーラス、EQ、リバーブ）を組み合わせて、
 * よりリアルで深みのあるサウンドを実現しています。
 */
export class GuitarSynth {
  constructor() {
    // MonoSynth をベースとしたシンセサイザーを初期化
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "fatsawtooth" }, // 厚みのあるサウ音波を使用
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.3,
        release: 0.8,
      },
      filter: {
        type: "lowpass",
        frequency: 800,
        Q: 2,
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 0.6,
        baseFrequency: 700,
        octaves: 3,
      },
    });

    // ディストーションエフェクト（音を歪ませる効果）
    this.distortion = new Tone.Distortion({
      distortion: 0.7,
      oversample: "4x",
    });

    // コーラスエフェクト（揺らぎ・厚みのある音に変化）
    this.chorus = new Tone.Chorus({
      frequency: 4,
      delayTime: 2.5,
      depth: 0.3,
      spread: 180,
    });

    // 3バンドEQ（低音・中音・高音のバランス調整）
    this.eq = new Tone.EQ3({
      low: -8,
      mid: 1,
      high: 5,
    });

    // リバーブ（音の残響を追加）
    this.reverb = new Tone.Reverb({
      decay: 2.5,
      wet: 0.4,
    });

    // 各エフェクトをチェーン接続し、出力先を設定
    this.synth.connect(this.distortion);
    this.distortion.connect(this.chorus);
    this.chorus.connect(this.eq);
    this.eq.connect(this.reverb);
    this.reverb.toDestination();

    // コーラスを起動
    this.chorus.start();
  }

  /**
   * 音を再生するためのメソッド
   * @param {string} note - 再生する音階（例: "C4"）
   * @param {string} duration - 再生時間（例: "8n"）
   */
  async triggerAttackRelease(note, duration) {
    await Tone.loaded(); // Tone.js のロードを待機
    this.synth.triggerAttackRelease(note, duration);
  }

  /**
   * 使用済みオブジェクトの解放（メモリリーク防止）
   */
  dispose() {
    this.synth.dispose();
    this.distortion.dispose();
    this.chorus.dispose();
    this.eq.dispose();
    this.reverb.dispose();
  }
}
