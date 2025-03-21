import * as Tone from "tone";
import { GuitarSynth } from "./synths/GuitarSynth";
import { ViolinSynth } from "./synths/ViolinSynth";
import { VoiceSynth } from "./synths/VoiceSynth";
import { RetroSynth } from "./synths/RetroSynth";

//  楽器ごとの Synth インスタンスを管理するマップ
// → 選択された楽器名に応じて、ここから適切なSynthをnewする流れ

export const customSynthMap = {
  // デフォルトのTone.Synth → 一応classで包んでるけどちょい特殊
  Synth: class {
    constructor() {
      this.synth = new Tone.Synth().toDestination(); // ⇒ 音出るように直でおk
    }
    triggerAttackRelease(note, duration) {
      this.synth.triggerAttackRelease(note, duration); // 音鳴らすとこだけメソッド化
    }
  },

  // カスタムSynth系（それぞれ別ファイルで定義）
  Guitar: GuitarSynth,
  Violin: ViolinSynth,
  Voice: VoiceSynth,
  Retro: RetroSynth,
};
