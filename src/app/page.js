import QuizPage from '@/components/QuizPage';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">音楽クイズへようこそ！</h1>
      <p className="mb-6 text-lg">2つのクイズから好きな方を選んでチャレンジしましょう！</p>

      <div className="flex flex-col gap-4">
        {/* ✅ スケールクイズへのボタン */}
        <Link href="/quiz/scales">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-64">
            🎵 スケールクイズ
          </button>
        </Link>

        {/* ✅ 音感クイズ（ピアノ）へのボタン */}
        <Link href="/quiz/pitch">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-64">
            🎹 音感クイズ（ピアノ）
          </button>
        </Link>
      </div>
    </main>
  );
}
