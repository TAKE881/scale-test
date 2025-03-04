/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '10px',
        'xxxs': '8px',
      },
      animation: {
        wave: "wave 3s infinite ease-in-out",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scale(1.01)", opacity: "1", transformOrigin: "center" },
          "40%": { transform: "scale(1.02)", opacity: "0.8", transformOrigin: "center" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        waterBrush: ["Water Brush", "cursive"],
      },
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
