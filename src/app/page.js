import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">スケールクイズへようこそ！</h1>
      <p className="mb-6">音を聴いてスケールを当ててみましょう！</p>
      <Link href="/quiz">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
          クイズを開始
        </button>
      </Link>
    </main>
  );
}
