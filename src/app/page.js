import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Link href="/mode-select">
        <div className="absolute inset-0 bg-[url('/image-button/bgsilver.webp')] bg-cover bg-center bg-no-repeat animate-wave z-0"></div>

        {/* 背景画像レイヤー */}
        {/* <div className="absolute inset-0 bg-[url('/image-bg-piano/imagepiano.webp')] bg-cover bg-center bg-no-repeat animate-wave z-0"></div> */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-wave z-0"
          style={{ backgroundImage: "url('/image-button/bgsilver.webp')" }}
        ></div> */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-wave z-0"
          style={{ backgroundImage: "url('/image-bg-Result/silver6.webp')" }}
        ></div>
        {/* ぼかし・透過レイヤー（背景だけをぼかす） */}
        <div className="absolute inset-0 backdrop-blur-sssssm bg-black/20 z-10"></div>

        {/* メインコンテンツ（前面・文字はぼけない） */}
        <main className="relative z-20 flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-4xl font-bold text-royal-blue mb-9 text-stroke-1 text-stroke-white">
            Perfect Pitch！
          </h1>

          <div className="flex flex-col gap-4">
            <button className="relative px-9 py-3 mb-3 text-3xl font-semibold text-metallic-gold text-stroke-1 text-stroke-white">
              はじめる
            </button>

            {/* </Link> */}
          </div>
        </main>
      </Link>
    </>
  );
}
// testtest
