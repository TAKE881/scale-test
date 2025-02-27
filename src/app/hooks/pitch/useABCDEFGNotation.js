export const useABCDEFGNotation = () => {
    const noteMapping = {
        "C4": "ド",
        "D4": "レ",
        "E4": "ミ",
        "F4": "ファ",
        "G4": "ソ",
        "A4": "ラ",
        "B4": "シ",
    };

    // ✅ 変換関数を提供
    const convertToABCDEFG = (note) => noteMapping[note] || note;

    return { convertToABCDEFG };
};
