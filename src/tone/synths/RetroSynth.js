import * as Tone from "tone";

/**
 * RetroSynth クラス
 * レトロゲーム風のサウンドを再現するためのカスタムシンセサイザー。
 * スクエア波・トライアングル波・ホワイトノイズの3種類の音源を同時に鳴らすことで、
 * チープで懐かしい「ピコピコサウンド」を演出します。
 */
export class RetroSynth {
  constructor() {
    /**
     * スクエア波シンセサイザー
     * 主にメインメロディを担当し、レトロ感を強調します。
     */
    this.squareSE = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.1,
        release: 0.2,
      },
    }).toDestination();

    /**
     * トライアングル波シンセサイザー
     * スクエア波を補完し、低音に厚みを加える役割を担います。
     */
    this.triangleSE = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.1,
        release: 0.3,
      },
    }).toDestination();

    /**
     * ホワイトノイズシンセサイザー
     * パーカッシブなアタック音を加えるためのノイズサウンドです。
     */
    this.noiseSE = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
    }).toDestination();
  }

  /**
   * サウンド再生メソッド
   * 各シンセサイザー（スクエア・トライアングル・ノイズ）を同時に発音します。
   *
   * @param {string} note - 再生するノート（デフォルトは "C4"）
   * @param {string} duration - ノートの再生時間（デフォルトは "8n"）
   */
  triggerAttackRelease(note = "C4", duration = "8n") {
    this.squareSE.triggerAttackRelease(note, duration);
    this.triangleSE.triggerAttackRelease("C3", duration);
    this.noiseSE.triggerAttackRelease(duration);
  }

  /**
   * リソースの解放メソッド
   * 使用後に各シンセサイザーのメモリを適切に解放します。
   */
  dispose() {
    this.squareSE.dispose();
    this.triangleSE.dispose();
    this.noiseSE.dispose();
  }
}
