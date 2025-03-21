import Link from "next/link";
import Image from "next/image";

export default function ModeSelect() {
  return (
    <div
      //  背景グラデーション（フル画面）
      className={
        "w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat"
      }
    >
      <main className="flex flex-col items-center justify-center h-screen text-center">
        {/* タイトル見出し */}
        <p className="mb-7 text-2xl text-metallic-gold font-bold text-stroke-sssm text-stroke-white">
          モードセレクト
        </p>

        {/* ▼ モード選択ボタンたち */}
        <div className="flex flex-col gap-4">

          {/* --- 初心者モードボタン --- */}
          <Link href="/quiz/pitch">
            <button
              className="
                relative px-7 mb-3 py-3 text-lg font-semibold text-stroke-sssssm text-stroke-white
                text-white bg-gradient-to-r from-metallic-green to-metallic-green-dark
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              初心者
              {/* ▼ SVGアイコン：初心者マーク風（レーダーチャート型のエフェクト） */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="ml-1 size-4 inline  fill-white"
              >
                <path d="M1 11C6.52285 11 11 6.52285 11 1H13C13 6.52285 17.4772 11 23 11V13C17.4772 13 13 17.4772 13 23H11C11 17.4772 6.52285 13 1 13V11ZM5.80342 12C8.56895 13.2093 10.7907 15.431 12 18.1966C13.2093 15.431 15.431 13.2093 18.1966 12C15.431 10.7907 13.2093 8.56895 12 5.80342C10.7907 8.56895 8.56895 10.7907 5.80342 12Z"></path>
              </svg>
            </button>
          </Link>

          {/* --- 上級者モードボタン --- */}
          <Link href="/quiz/pitch">
            <button
              className="
                relative px-6 mb-3 py-3 text-lg font-semibold text-stroke-sssssm text-stroke-white
                text-white bg-gradient-to-r from-metallic-red to-metallic-red-dark
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              上級者
              {/* ▼ SVGアイコン：上級者っぽい強さ・パワー系エフェクト */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="ml-1 size-6 inline fill-white"
              >
                <path d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM4.87601 12C6.18717 12.7276 7.27243 13.8128 8 15.124 8.72757 13.8128 9.81283 12.7276 11.124 12 9.81283 11.2724 8.72757 10.1872 8 8.87601 7.27243 10.1872 6.18717 11.2724 4.87601 12ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"></path>
              </svg>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
