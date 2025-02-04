"use client";

import { Suspense } from "react";
import QuizPageContent from "../components/QuizPageContent";  // クイズロジックを分離

export default function QuizPage({ mode }) { // ✅ `mode` を props で受け取る
  return (
    <div className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/ruthvik-chandramouli-AHrljF0Zwog-unsplash.jpg')" }}>
      <Suspense fallback={<p>Loading...</p>}>
        <QuizPageContent mode={mode} /> {/* ✅ `mode` を渡す */}
      </Suspense>
    </div>
  );
}
