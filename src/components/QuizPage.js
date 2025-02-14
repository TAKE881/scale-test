"use client";

import QuizPageContent from "../components/QuizPageContent";  // クイズロジックを分離

export default function QuizPage({ mode }) { // ✅ `mode` を props で受け取る
  return (
    <div className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/ruthvik-chandramouli-AHrljF0Zwog-unsplash.jpg')" }}>
      <QuizPageContent mode={mode} /> {/* ✅ `mode` を渡す */}
    </div>
  );
}

// ✅ `getServerSideProps` を追加して `mode` を取得
export async function getServerSideProps(context) {
  const { query } = context;
  const mode = query.mode || "default"; // ✅ URL クエリから `mode` を取得（なければ `default`）

  return {
    props: {
      mode, // ✅ `mode` を props に渡す
    },
  };
}
