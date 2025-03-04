/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],


  theme: {
    extend: {

      /*============================================================
                              カスタム設定
      =============================================================== */


      /////////////////////////////////// 高さ
      height: {
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '28': '112px',
        '30': '120px',
        '34': '136px',
        '36': '144px',
        '38': '152px',
      },
      width: {
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '28': '112px',
        '30': '120px',
        '34': '136px',
        '36': '144px',
        '38': '152px',
      },
      //////////////////////////////// フォントサイズ
      fontSize: {
        'xxs': '10px',
        'xxxs': '8px',
        'xxl': '22px',
        'xxxl': '26px',
      },
      //////////////////////////////// 角丸
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      //////////////////////////////// スペース
      spacing: {
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '28': '112px',
        '30': '120px',
        '34': '136px',
        '36': '144px',
        '38': '152px',
      },
      //////////////////////////////// 重なり
      zIndex: {
        '100': '100',
        '200': '200',
        '999': '999', // これで最前面
      },
      //////////////////////////////// アニメーション
      animation: {
        wave: "wave 3s infinite ease-in-out",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scale(1.01)", opacity: "1", transformOrigin: "center" },
          "40%": { transform: "scale(1.02)", opacity: "0.8", transformOrigin: "center" },
        },
      },
      // ブレイクポイント
      screens: {
        'xs': '400px', // 小さめスマホ
        'xl2': '1440px', // 大画面用
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#1E40AF', // 青系のメインカラー
        secondary: '#9333EA', // 紫系のアクセント
        danger: '#DC2626', // 赤色の警告
        success: '#16A34A', // 緑色の成功通知
      },
      fontFamily: {
        waterBrush: ["Water Brush", "cursive"],
      },
      /*============================================================
              ///////////////////////////////////////////////////////////
      =============================================================== */
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-stroke-1": {
          "-webkit-text-stroke": "1px white",
        },
        ".text-stroke-2": {
          "-webkit-text-stroke": "2px white",
        },
        ".text-stroke-3": {
          "-webkit-text-stroke": "3px white",
        },
      });
    },
  ],
};
