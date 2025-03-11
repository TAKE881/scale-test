import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Link href="/mode-select">
        <div
          // className={
          //   "w-screen h-screen  bg-[url('/image-bg/tokai-and-homeDALLE.webp')] bg-cover bg-center bg-no-repeat animate-wave "
          // }
          className={
            "w-screen h-screen  bg-[url('/image-bg-mu/music_bar.webp')] bg-cover bg-center bg-no-repeat animate-wave"
          }
        >
          <main className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-metallic-gold mb-9 text-stroke-1 text-stroke-white">Perfect pitch！</h1>
            {/* <p className="mb-7 text-lg text-white">モード選択</p> */}
            {/* <div>
          <Image src="/AIboo2-removebg.png" alt="ブーブークッションに乗ったブタ" width={150} height={0} />
        </div> */}
            {/* <div>
          <Image src="/A-warm-pastel-colored-scene of-a-park.webp" alt="" width={150} height={0} />
        </div> */}

            <div className="flex flex-col gap-4">{/*縦並び & 16px の間隔 */}
              {/* <Link href="/mode-select"> */}
              <button
                className="
              /*  位置とサイズ */
              relative px-9 py-3 mb-3 text-3xl font-semibold

              /*  テキストのスタイル */
              text-gray-600 text-stroke-1 text-stroke-white
              "
              >
                はじめる
              </button>
              {/* </Link> */}
            </div>
          </main>
        </div>
      </Link>
    </>
  );
}
// testtest
