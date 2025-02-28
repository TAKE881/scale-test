<Link href="/mode-select">
<button
  className="
  /*  位置とサイズ */
  relative px-9 py-3 mb-3 text-lg font-semibold

  /*  テキストのスタイル */
  text-white

  /*  背景のグラデーション */
  bg-gradient-to-r from-green-500 to-emerald-400

  /*  角丸・影 */
  rounded-full shadow-lg hover:shadow-xl

  /*  トランジション（アニメーションのスムーズさ） */
  transition-all duration-300

  /*  境界線（白い枠の透明度を変化） */
  border border-white border-opacity-30 hover:border-opacity-60

  /*  ホバー時の拡大アニメーション */
  hover:scale-105

  /*  疑似要素（ホバー時に輝きを追加） */
  before:absolute before:inset-0 before:bg-white/10
  before:rounded-full before:opacity-0 before:transition-opacity
  hover:before:opacity-100
  "
>
  はじめる
</button>
</Link>

page.js

import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <Link href="/mode-select">
      <div
        // className={
        //   "w-screen h-screen bg-[url('/gradation-612x612.jpg')] bg-cover bg-center bg-no-repeat"
        // }
        className={
          "w-screen h-screen bg-[url('/image-bg/park_scene_pastel.jpg')] bg-cover bg-center bg-no-repeat"
        }
      >
        <main className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-5xl font-bold text-gray-600 mb-9">環境音マスター検定</h1>
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
              relative px-9 py-3 mb-3 text-4xl font-semibold

              /*  テキストのスタイル */
              text-gray-600

              /*  トランジション（アニメーションのスムーズさ） */
              transition-all duration-300
              "
            >
              はじめる
            </button>
            {/* </Link> */}
          </div>
        </main>
      </div>
    </Link>
  );
}
// testtest
