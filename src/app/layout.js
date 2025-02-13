import { Kaisei_Tokumin } from "next/font/google";
import "./globals.css"; // Tailwind CSS やグローバルスタイルを適用

const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ["latin", "japanese"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={kaiseiTokumin.className}>
        {children}
      </body>
    </html>
  );
}
