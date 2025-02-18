// import { Kaisei_Tokumin } from "next/font/google";
import { Reggae_One } from "next/font/google";
import "./globals.css";

// const kaiseiTokumin = Kaisei_Tokumin({
const ReggaeOne = Reggae_One({
  weight: '400',
  subsets: ['latin'],
  // display: 'swap',
  // weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={ReggaeOne.className}>
        <div className="w-screen min-h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat">
          {children}
        </div>
      </body>
    </html>
  );
}
