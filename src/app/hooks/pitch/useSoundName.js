//  音階を日本語表記に変換するhook
export const useSoundName = () => {
  // 英名 → 日本語 変換表
  const noteMapping = {
    C4: "ド",
    D4: "レ",
    E4: "ミ",
    F4: "ファ",
    G4: "ソ",
    A4: "ラ",
    B4: "シ",
  };

  // note名を変換（該当なければそのまま返す）
  const convertSoundName = (note) => noteMapping[note] || note;


  return { convertSoundName };
};
