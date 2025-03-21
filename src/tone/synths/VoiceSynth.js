import * as Tone from "tone";

/**
 * VoiceSynth クラス
 * 人間の声に近い音色を目指して構成されたシンセサイザー。
 * 柔らかな波形と複数の音響処理を組み合わせることで、声のような響きを再現します。
 */
export class VoiceSynth {
  constructor() {
    /**
     * MonoSynth（基本音源）
     * 三角波（triangle）を使用し、柔らかで滑らかな音色を生成します。
     * エンベロープ設定により、自然な立ち上がりと持続感を表現します。
     */
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "triangle" },
      envelope: {
        attack: 0.3,   // 声らしい緩やかな立ち上がり
        decay: 0.2,
        sustain: 0.8,
        release: 3.0,  // 息のように残る長めのリリース
      },
      filter: {
        type: "lowpass",
        frequency: 1500, // 高域を抑え、まろやかな音質に調整
      },
    });

    /**
     * Bandpass Filter（共鳴帯域の強調）
     * 声帯のフォルマント（共鳴）を模倣するためのフィルタです。
     */
    this.formant = new Tone.Filter({
      type: "bandpass",
      frequency: 800, // 声の「う」母音に近い中心帯域
      Q: 6,
    });

    /**
     * Vibrato（微細な揺れ）
     * 声特有の自然な揺らぎを再現します。
     */
    this.vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.05,
    });

    /**
     * EQ3（イコライザー）
     * 中音域を強調し、声らしい輪郭を強調します。
     */
    this.eq = new Tone.EQ3({
      low: -3,
      mid: 5,
      high: -1,
    });

    /**
     * Reverb（残響）
     * 空間的な立体感を付与し、自然な響きを加えます。
     */
    this.reverb = new Tone.Reverb({
      decay: 3.0,
      wet: 0.4,
    });

    /**
     * Output Gain（出力調整）
     * 最終的な音量バランスを調整するためのゲインコントロールです。
     */
    this.outputGain = new Tone.Gain(3);

    /**
     * シグナルチェーン構成：
     * Synth → Formant → Vibrato → EQ → Reverb → OutputGain → Destination
     */
    this.synth.chain(
      this.formant,
      this.vibrato,
      this.eq,
      this.reverb,
      this.outputGain,
      Tone.Destination
    );
  }

  /**
   * ノートを再生するメソッド
   * Tone.js のロード完了後に指定された音階を鳴らします。
   *
   * @param {string} note - 発音する音階（例: "C4"）
   * @param {string} duration - 音の長さ（例: "8n", "4n"など）
   */
  async triggerAttackRelease(note, duration) {
    await Tone.loaded();
    this.synth.triggerAttackRelease(note, duration);
  }

  /**
   * ノートを停止するメソッド
   * サスティン中のノートを手動でリリースします。
   */
  stopNote() {
    this.synth.triggerRelease();
  }

  /**
   * リソースの解放メソッド
   * 各エフェクトやSynthインスタンスを破棄してメモリを開放します。
   */
  dispose() {
    this.synth.dispose();
    this.formant.dispose();
    this.vibrato.dispose();
    this.eq.dispose();
    this.reverb.dispose();
    this.outputGain.dispose();
  }
}
