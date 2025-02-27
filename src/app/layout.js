import { Reggae_One } from "next/font/google";
import { Water_Brush } from "next/font/google";//Water_Brushフォント//
import "./globals.css";

// RaggaeOneフォント使用
const ReggaeOne = Reggae_One({
  weight: '400',
  subsets: ['latin'],
});


export const waterBrush = Water_Brush({
  subsets: ["latin"],
  weight: "400"
});


// 全ページの背景設定
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={ReggaeOne.className}>
        <div className="w-screen min-h-screen
          bg-[url('/image-bg/gradation-612x612.jpg')] {/*背景画像アイデア1*/}
          bg-cover bg-center bg-no-repeat">{/*画像はカバー、中央配置、リピートなし*/}
          {/* 背景画像アイデア2 */}
          {/* <div className="w-screen min-h-screen bg-[url('/image-bg/home-and-tokai2DALLE.webp')] bg-cover bg-center bg-no-repeat"> */}
          {children}
        </div>
      </body>
    </html>
  );
}
