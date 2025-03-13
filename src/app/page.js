import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Link href="/mode-select">
        <div className="relative w-screen h-screen overflow-hidden">
          {/* 背景画像レイヤー */}
          <div className="absolute inset-0 bg-[url('/image-bg-piano/imagepiano.webp')] bg-cover bg-center bg-no-repeat animate-wave z-0"></div>

          {/* ぼかし・透過レイヤー（背景だけをぼかす） */}
          <div className="absolute inset-0 backdrop-blur-ssm bg-white/10 z-10"></div>

          {/* メインコンテンツ（前面・文字はぼけない） */}
          <main className="relative z-20 flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-metallic-gold mb-9 text-stroke-1 text-stroke-white">
              Perfect pitch！
            </h1>

            <div className="flex flex-col gap-4">
              <button
                className="relative px-9 py-3 mb-3 text-3xl font-semibold text-gray-600 text-stroke-1 text-stroke-white"
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
