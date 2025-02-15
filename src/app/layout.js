import { Kaisei_Tokumin } from "next/font/google";
import "./globals.css";

const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={kaiseiTokumin.className}>
        <div className="w-screen min-h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat">
          {children}
        </div>
      </body>
    </html>
  );
}
