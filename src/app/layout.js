import { Kaisei_Tokumin } from "next/font/google";
import "./globals.css"; // Tailwind CSS やグローバルスタイルを適用

const kaiseiTokumin = Kaisei_Tokumin({
  // subsets: ["latin", "japanese"],
  subsets: ["latin-ext"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={kaiseiTokumin.className}>
        <div className="w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat">
          {children}
        </div>
      </body>
    </html>
  );
}
