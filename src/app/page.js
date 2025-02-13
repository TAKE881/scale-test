import QuizPage from '@/components/QuizPage';
import Link from 'next/link';


export default function Home() {
  return (
    <div className={"w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat"}>

      <main className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold  text-white mb-4">音感ゲーム</h1>
        <p className="mb-6 text-lg">モード選択</p>

        <div className="flex flex-col gap-4">
          {/* ✅ 音感クイズ（ピアノ）へのボタン */}
          <Link href="/quiz?mode=pitchTrainingQuiz">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-64">
              音程ゲーム
            </button>
          </Link>

          {/* ✅ スケールクイズへのボタン */}
          <Link href="quiz?mode=scaleQuiz">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-64">
              音楽スケールゲーム
            </button>
          </Link>


        </div>
      </main>
    </div>
  );
}
