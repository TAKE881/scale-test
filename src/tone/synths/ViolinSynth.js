import * as Tone from "tone";

/**
 * ViolinSynth クラス
 * バイオリンのような音色を目指して設計されたシンセサイザー。
 * ザラついた質感と柔らかなフィルター処理により、弦楽器風の響きを再現します。
 */
export class ViolinSynth {
  constructor() {
    /**
     * MonoSynth を用いてバイオリン風のサウンドを構成します。
     * 鋸波（sawtooth）によって弓で弦を擦るような質感を演出しています。
     */
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      envelope: {
        attack: 0.4,     // 徐々に立ち上がる音で滑らかなアタック感を実現
        decay: 0.8,
        sustain: 0.6,
        release: 2.0,    // 長めの余韻でバイオリン特有の残響を表現
      },
      filter: {
        type: "lowpass",
        frequency: 1000, // 高音域をカットし、柔らかく落ち着いた音色に調整
      },
    });

    // 出力先をスピーカーに設定
    this.synth.toDestination();
  }

  /**
   * ノートを再生するメソッド
   *
   * @param {string} note - 発音する音階（例: "C4"）
   * @param {string} duration - 音の長さ（例: "8n", "4n"など）
   */
  triggerAttackRelease(note, duration) {
    this.synth.triggerAttackRelease(note, duration);
  }

  /**
   * リソースの解放メソッド
   * 使用後にシンセをメモリから削除し、リソースを開放します。
   */
  dispose() {
    this.synth.dispose();
  }
}
