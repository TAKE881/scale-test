import './globals.css'

export const metadata = {
  title: 'スケールクイズアプリ',
  description: '音を聴いてスケールを当てるクイズ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
