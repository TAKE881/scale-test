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

// export default (theme) => {
//     // ❶ theme("extend.xxx") からカスタム設定を取得
//     const strokeWidths = theme("extend.textStrokeWidth") || {}; // textStrokeWidth
//     const strokeColors = theme("extend.textStrokeColor") || {}; // textStrokeColor

//     let newUtilities = {};

//     // ❷ textStrokeWidth の値からクラスを自動生成
//     Object.entries(strokeWidths).forEach(([key, value]) => {
//       newUtilities[`.text-stroke-${key}`] = {
//         "-webkit-text-stroke-width": value,
//       };
//     });

//     // ❸ textStrokeColor の値からクラスを自動生成
//     Object.entries(strokeColors).forEach(([key, value]) => {
//       newUtilities[`.text-stroke-${key}`] = {
//         "-webkit-text-stroke-color": value,
//       };
//     });

//     // ❹ 手動で追加していたクラスを再現
//     //    （もともと tailwind.config.js の plugins 内にあった定義）
//     const customStrokeClasses = {
//       ".text-stroke-1": {
//         "-webkit-text-stroke": "1px white",
//       },
//       ".text-stroke-2": {
//         "-webkit-text-stroke": "2px white",
//       },
//       ".text-stroke-3": {
//         "-webkit-text-stroke": "3px white",
//       },
//       ".text-stroke": {
//         "-webkit-text-stroke-width": "1px",
//         "-webkit-text-stroke-color": "black",
//       },
//       // 必要に応じて:
//       // ".text-stroke-sssssm": { "-webkit-text-stroke-width": "0.05px" },
//       // ".text-stroke-ssssm":  { "-webkit-text-stroke-width": "0.1px" },
//       // ".text-stroke-sssm":   { "-webkit-text-stroke-width": "0.2px" },
//       // ".text-stroke-ssm":    { "-webkit-text-stroke-width": "0.3px" },
//       // ".text-stroke-sm":     { "-webkit-text-stroke-width": "0.5px" },
//       // ".text-stroke-md":     { "-webkit-text-stroke-width": "1px" },
//       // ".text-stroke-lg":     { "-webkit-text-stroke-width": "2px" },
//       // ".text-stroke-xl":     { "-webkit-text-stroke-width": "3px" },
//       // ".text-stroke-2xl":    { "-webkit-text-stroke-width": "4px" },
//       // ".text-stroke-black":  { "-webkit-text-stroke-color": "#000" },
//       // ".text-stroke-white":  { "-webkit-text-stroke-color": "#fff" },
//       // ...ほか必要なものがあれば追加
//     };

//     // ❺ 既存の newUtilities と手動クラスをマージ
//     newUtilities = { ...newUtilities, ...customStrokeClasses };

//     // ❻ 生成した全クラスを返す
//     return newUtilities;
//   };
