import Link from "next/link";
import Image from 'next/image';

export default function ModeSelect() {
  return (
    <div
      className={
        "w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat"
      }
    >
      <main className="flex flex-col items-center justify-center h-screen text-center">
        {/* <h1 className="text-3xl font-bold text-white mb-4">SE音程王</h1> */}
        <p className="mb-7 text-xl text-gray-600 font-bold text-stroke-sm text-stroke-white">モードセレクト</p>
        {/* <div>
          <Image src="/AIboo2-removebg.png" alt="ブーブークッションに乗ったブタ" width={150} height={0} />
        </div> */}

        <div className="flex flex-col gap-4">
          {/* 1. ピッチクイズへ遷移 */}
          <Link href="/quiz/pitch">
            <button
              className="
                relative px-7 mb-3 py-3 text-lg font-semibold text-stroke-ssssm text-stroke-gray-300
                text-white bg-gradient-to-r from-green-500 to-emerald-400
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              初心者
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-4 inline"><path d="M1 11C6.52285 11 11 6.52285 11 1H13C13 6.52285 17.4772 11 23 11V13C17.4772 13 13 17.4772 13 23H11C11 17.4772 6.52285 13 1 13V11ZM5.80342 12C8.56895 13.2093 10.7907 15.431 12 18.1966C13.2093 15.431 15.431 13.2093 18.1966 12C15.431 10.7907 13.2093 8.56895 12 5.80342C10.7907 8.56895 8.56895 10.7907 5.80342 12Z"></path></svg>
            </button>
          </Link>

          {/* 2. スケールクイズへ遷移 */}
          {/* <Link href="/qui/scales"> */}
          <Link href="/test">
            <button
              className="
                relative px-7 mb-3 py-3 text-lg font-semibold text-stroke-ssssm text-stroke-gray-300
                text-white bg-gradient-to-r from-red-500 to-rose-400
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
            >
              上級者
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-6 inline"><path d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM4.87601 12C6.18717 12.7276 7.27243 13.8128 8 15.124 8.72757 13.8128 9.81283 12.7276 11.124 12 9.81283 11.2724 8.72757 10.1872 8 8.87601 7.27243 10.1872 6.18717 11.2724 4.87601 12ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"></path></svg>
            </button>
          </Link>
          {/* 3. 設定ページへ遷移*/}
          <Link href="/settings">
            <button
              className="
                relative px-6 py-0 text-base font-semibold text-stroke-ssssm text-stroke-gray-300
                text-white bg-gradient-to-r from-gray-500 to-gray-700
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
                        "

            >設定
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="ml-1 size-6 inline">
                <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z" />
              </svg>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
