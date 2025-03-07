/** @type {import('tailwindcss').Config} */
import theme from "./src/config/tailwind/theme";  // カスタムテーマを読み込む
import plugins from "./src/config/tailwind/plugins";  // プラグインを読み込む

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme,
  plugins,
};
