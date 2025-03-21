/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "music-paper":
          "linear-gradient(to bottom, #fefcf3, #f5f1e8), url('/images/noise.png')",
      },
      backgroundBlendMode: {
        overlay: "overlay",
      },

      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.6)",
        white: "1px 1px 2px rgba(255, 255, 255, 0.8)",
      },

      height: {
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        22: "88px",
        26: "104px",
        28: "112px",
        30: "120px",
        34: "136px",
        36: "144px",
        38: "152px",
      },
      width: {
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        22: "88px",
        26: "104px",
        28: "112px",
        30: "120px",
        34: "136px",
        36: "144px",
        38: "152px",
      },

      fontSize: {
        xxs: "10px",
        xxxs: "8px",
        xxl: "22px",
        xxxl: "26px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "60px",
        "7xl": "72px",
      },

      borderRadius: {
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
      },

      spacing: {
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        22: "88px",
        26: "104px",
        28: "112px",
        30: "120px",
        34: "136px",
        36: "144px",
        38: "152px",
        50: "200px",
        51: "202px",
        52: "204px",
        53: "206px",
        54: "208px",
        55: "210px",
        56: "212px",
        57: "214px",
        58: "216px",
        59: "218px",
        60: "220px",
        61: "222px",
        62: "224px",
        63: "226px",
        64: "228px",
        65: "230px",
        66: "232px",
        67: "234px",
        68: "236px",
        69: "238px",
        70: "240px",
        71: "242px",
        72: "244px",
        73: "246px",
        74: "248px",
        75: "250px",
      },
      blur: {
        ssm: "2px",
        sssm: "1.8px",
        ssssm: "1.6px",
        sssssm: "1.4px",
        ssssssm: "1.2px",
        sssssssm: "1px",
      },

      zIndex: {
        100: "100",
        200: "200",
        999: "999",
      },

      animation: {
        wave: "wave 3s infinite ease-in-out",
        floating: "floating 2.5s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
      },
      keyframes: {
        wave: {
          "0%, 100%": {
            transform: "scale(1.01)",
            opacity: "1",
            transformOrigin: "center",
          },
          "40%": {
            transform: "scale(1.02)",
            opacity: "0.8",
            transformOrigin: "center",
          },
        },
        floating: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-3px)" },
          "40%": { transform: "translateX(3px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
      },

      screens: {
        xs: "400px",
        xl2: "1440px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1E40AF",
        secondary: "#9333EA",
        danger: "#DC2626",
        success: "#16A34A",
        navy: "#001f3f",
        "loyal-blue": "#1E40AF",
        "metallic-blue": "#32527B",
        "royal-blue": "#4169E1",
        "prussian-blue": "#003153",
        "midnight-blue": "#191970",
        "electric-blue": "#7DF9FF",
        "steel-blue": "#4682B4",
        "deep-sapphire": "#082567",
        "azure-blue": "#007FFF",
        "metallic-blue": "#2f4550",
        "metallic-silver": "#C0C0C0",
        "metallic-gold": "#D4AF37",
        "rich-gold": "#FFD700",
        "light-gold": "#FFE066",
        "shine-gold": "#FFF3B0",
        "highlight-gold": "#F5C542",
        "metallic-bronze": "#CD7F32",
        "metallic-yellow": "#ddd12b",

        "metallic-green-dark": "#3f7e5d",
        "metallic-green": "#569b75",
        "metallic-green-medium": "#6fb88e",
        "metallic-green-light": "#87cfa5",
        "metallic-green-soft": "#a7e1c0",

        "metallic-red-dark": "#993d3d",
        "metallic-red": "#b45757",
        "metallic-red-medium": "#cd6e6e",
        "metallic-red-light": "#e38585",
        "metallic-red-soft": "#f0adad",

        "metallic-gray-dark": "#4a4a4a",
        "metallic-gray": "#666666",
        "metallic-gray-medium": "#838383",
        "metallic-gray-light": "#a0a0a0",
        "metallic-gray-soft": "#c9c9c9",

        ivory: "#fefcf3",

        sepia: "#704214",
      },
      fontFamily: {
        waterBrush: ["Water Brush", "cursive"],
      },
      textStrokeWidth: {
        DEFAULT: "1px",
        sssssm: "0.03px",
        sssssm: "0.05px",
        ssssm: "0.1px",
        sssm: "0.2px",
        ssm: "0.3px",
        sm: "0.5px",
        md: "1px",
        lg: "2px",
        xl: "3px",
        "2xl": "4px",
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
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
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
        ".text-stroke-ssssssm": {
          "-webkit-text-stroke-width": "0.03px",
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
