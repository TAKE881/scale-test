// /** @type {import('tailwindcss').Config} */
// import theme from "./src/config/tailwind/theme";  // カスタムテーマを読み込む
// import plugins from "./src/config/tailwind/plugins";  // プラグインを読み込む

// export default {
//   content: [
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme,
//   plugins,
// };


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
      textStrokeWidth: {
        DEFAULT: "1px", // デフォルトの太さ
        sssssm: "0.05px", // 最も細い
        ssssm: "0.1px",  // 極細
        sssm: "0.2px",   // さらに細い
        ssm: "0.3px",    // 超細い
        sm: "0.5px",     // 細い
        md: "1px",       // 標準
        lg: "2px",       // 太め
        xl: "3px",       // さらに太い
        "2xl": "4px",    // 超太い
      },
      textStrokeColor: {
        black: "#000",
        white: "#fff",
        red: "#ff0000",
        darkGray: "#222",
        gray100: "#f3f4f6",
        gray200: "#e5e7eb",
        gray300: "#d1d5db",
        gray400: "#9ca3af",
        gray500: "#6b7280",
        gray600: "#4b5563",
        gray700: "#374151",
        gray800: "#1f2937",
        gray900: "#111827",
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
        ".text-stroke": {
          "-webkit-text-stroke-width": "1px",
          "-webkit-text-stroke-color": "black",
        },
        ".text-stroke-sssssm": {
          "-webkit-text-stroke-width": "0.05px",
        },
        ".text-stroke-ssssm": {
          "-webkit-text-stroke-width": "0.1px",
        },
        ".text-stroke-sssm": {
          "-webkit-text-stroke-width": "0.2px",
        },
        ".text-stroke-ssm": {
          "-webkit-text-stroke-width": "0.3px",
        },
        ".text-stroke-sm": {
          "-webkit-text-stroke-width": "0.5px",
        },
        ".text-stroke-md": {
          "-webkit-text-stroke-width": "1px",
        },
        ".text-stroke-lg": {
          "-webkit-text-stroke-width": "2px",
        },
        ".text-stroke-xl": {
          "-webkit-text-stroke-width": "3px",
        },
        ".text-stroke-2xl": {
          "-webkit-text-stroke-width": "4px",
        },
        ".text-stroke-black": {
          "-webkit-text-stroke-color": "#000",
        },
        ".text-stroke-dark-gray": {
          "-webkit-text-stroke-color": "#222",
        },
        ".text-stroke-gray-700": {
          "-webkit-text-stroke-color": "#374151",
        },
        ".text-stroke-gray-800": {
          "-webkit-text-stroke-color": "#1f2937",
        },
        ".text-stroke-gray-900": {
          "-webkit-text-stroke-color": "#111827",
        },
        ".text-stroke-black": {
          "-webkit-text-stroke-color": "black",
        },
        ".text-stroke-white": {
          "-webkit-text-stroke-color": "white",
        },
        ".text-stroke-red": {
          "-webkit-text-stroke-color": "red",
        },
        ".text-stroke-gray-100": {
          "-webkit-text-stroke-color": "#f3f4f6",
        },
        ".text-stroke-gray-200": {
          "-webkit-text-stroke-color": "#e5e7eb",
        },
        ".text-stroke-gray-300": {
          "-webkit-text-stroke-color": "#d1d5db",
        },
        ".text-stroke-gray-400": {
          "-webkit-text-stroke-color": "#9ca3af",
        },
        ".text-stroke-gray-500": {
          "-webkit-text-stroke-color": "#6b7280",
        },
        ".text-stroke-gray-600": {
          "-webkit-text-stroke-color": "#4b5563",
        },
        ".text-stroke-gray-700": {
          "-webkit-text-stroke-color": "#374151",
        },
        ".text-stroke-gray-800": {
          "-webkit-text-stroke-color": "#1f2937",
        },
        ".text-stroke-gray-900": {
          "-webkit-text-stroke-color": "#111827",
        },
        ".text-stroke-dark-gray": {
          "-webkit-text-stroke-color": "#222",
        },
      });
    },
  ],
};
