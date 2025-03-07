import utilities from "./utilities";  // `utilities.js` を読み込む

export default [
    function ({ addUtilities, theme }) {
        addUtilities(utilities(theme));  // `utilities.js` で定義したカスタムクラスを適用
    },
];
