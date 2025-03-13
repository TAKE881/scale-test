import { Reggae_One } from "next/font/google";
import { Water_Brush } from "next/font/google"; //Water_Brushフォント//
import "./globals.css";


{/*============================================================
                              RaggaeOneフォント使用
        =============================================================== */}

const ReggaeOne = Reggae_One({
  weight: "400",
  subsets: ["latin"],
});
{/*============================================================
                              waterBrushフォント使用
        =============================================================== */}

export const waterBrush = Water_Brush({
  subsets: ["latin"],
  weight: "400",
});




{/*============================================================
                              全ページの背景設定
        =============================================================== */}


export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      {/*============================================================
                                    アイコン
        =============================================================== */}
      <head>
        {/* ✅ ① favicon明示 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />

        {/* ✅ ③ PWA対応 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ ② SNS / OGP対応 */}
        <meta property="og:title" content="Perfect Pitch App" />
        <meta property="og:description" content="音感を鍛えるクイズアプリ！" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-project.vercel.app/" />

        {/* Twitterカード */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Perfect Pitch App" />
        <meta name="twitter:description" content="音感を鍛えるクイズアプリ！" />
        <meta name="twitter:image" content="/og-image.png" />
      </head>

      {/*============================================================
                                    フォント
        =============================================================== */}
      <body className={ReggaeOne.className}>

        {/*============================================================
                                    背景
        =============================================================== */}
        <div className="
          relative w-screen min-h-screen">
          <div className="
          absolute inset-0 bg-[url('/image-bg-piano/imagepiano.webp')] bg-cover bg-center bg-no-repeat z-0">
          </div>
          <div className="
          absolute inset-0 backdrop-blur-sm bg-white/20 border border-white/40 rounded-xl shadow-lg z-10">
          </div>
          <div className="
          relative z-10">
            {children}</div>
        </div>
      </body>
    </html>
  );
}
