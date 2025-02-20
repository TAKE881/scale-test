import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <div
      className={
        "w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat"
      }
    >
      <main className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-white mb-9">SE音程王</h1>
        {/* <p className="mb-7 text-lg text-white">モード選択</p> */}
        {/* <div>
          <Image src="/AIboo2-removebg.png" alt="ブーブークッションに乗ったブタ" width={150} height={0} />
        </div> */}

        <div className="flex flex-col gap-4">
          {/* 1. ピッチクイズへ遷移 */}
          <Link href="/mode-select">
            <button
              className="
                relative px-9 mb-3 py-3 text-lg font-semibold
                text-white bg-gradient-to-r from-green-500 to-emerald-400
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              はじめる
            </button>
          </Link>

          {/* 2. スケールクイズへ遷移 */}
          {/* <Link href="/quiz/scales">
            <button
              className="
                relative px-7 py-1 text-lg font-semibold
                text-white bg-gradient-to-r from-blue-500 to-indigo-400
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              真面目モード
            </button>
          </Link> */}

          {/* 3. 設定ページへ遷移*/}
          {/* <Link href="/settings">
            <button
              className="
                relative px-8 py-1 text-lg font-semibold
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
          </Link> */}
        </div>
      </main>
    </div>
  );
}
