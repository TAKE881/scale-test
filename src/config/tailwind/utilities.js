export default (theme) => {
    const strokeWidths = theme("extend.textStrokeWidth") || {}; // デフォルト値を空オブジェクトに
    const strokeColors = theme("extend.textStrokeColor") || {};

    let newUtilities = {};

    // 太さのクラスを作成
    Object.entries(strokeWidths).forEach(([key, value]) => {
        newUtilities[`.text-stroke-${key}`] = {
            "-webkit-text-stroke-width": value,
        };
    });

    // 色のクラスを作成
    Object.entries(strokeColors).forEach(([key, value]) => {
        newUtilities[`.text-stroke-${key}`] = {
            "-webkit-text-stroke-color": value,
        };
    });

    return newUtilities;
};
