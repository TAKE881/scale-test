import Link from "next/link";

export default function Home() {
  return (
    <div
      className={
        "w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat"
      }
    >
      <main className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-white mb-4">音感ゲーム</h1>
        <p className="mb-6 text-lg text-white">モード選択</p>

        <div className="flex flex-col gap-4">
          {/* 1. ピッチクイズへ遷移 */}
          <Link href="/quiz/pitch">
            <button
              className="
                relative px-16 py-3 text-lg font-semibold
                text-white bg-gradient-to-r from-green-500 to-emerald-400
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              音程ゲーム
            </button>
          </Link>

          {/* 2. スケールクイズへ遷移 */}
          <Link href="/quiz/scales">
            <button
              className="
                relative px-7 py-3 text-lg font-semibold
                text-white bg-gradient-to-r from-blue-500 to-indigo-400
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              音楽スケールゲーム
            </button>
          </Link>

          {/* 3. 設定ページ（仮）へ遷移
              設定ページが未実装であれば、将来的に /settings などに作成する想定でOK
          */}
          <Link href="/setting">
            <button
              className="
                relative px-8 py-3 text-lg font-semibold
                text-white bg-gradient-to-r from-gray-500 to-gray-700
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              設定
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
