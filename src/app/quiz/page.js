"use client";

import { useSearchParams } from "next/navigation";
import QuizPage from "@/components/QuizPage";

export default function QuizPageWrapper() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "scaleQuiz"; // ✅ `mode` を取得

  return <QuizPage mode={mode} />; // ✅ `QuizPage.js` に `mode` を渡す
}
