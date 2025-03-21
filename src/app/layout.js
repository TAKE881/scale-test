import { Reggae_One } from "next/font/google";
import { Water_Brush } from "next/font/google";
import "./globals.css";

//  Google Fonts
const ReggaeOne = Reggae_One({
  weight: "400",
  subsets: ["latin"],
});

//  （Water Brushフォント）
export const waterBrush = Water_Brush({
  subsets: ["latin"],
  weight: "400",
});

//  グローバルレイアウト（全ページ共通）
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Perfect Pitch App" />
        <meta property="og:description" content="音感を鍛えるクイズアプリ！" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-project.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Perfect Pitch App" />
        <meta name="twitter:description" content="音感を鍛えるクイズアプリ！" />
        <meta name="twitter:image" content="/og-image.png" />
      </head>

      <body className={ReggaeOne.className}>
        <div className="relative w-screen min-h-screen">
          <div className="absolute inset-0 bg-[url('/image-bg-Result/silver6.webp')] bg-cover bg-center bg-no-repeat z-0 opacity-20"></div>
          <div className="absolute inset-0 bg-black/30 z-5 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
