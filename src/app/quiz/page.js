"use client";

import { useSearchParams } from "next/navigation";
import QuizPage from "@/components/QuizPage";

export default function QuizPageWrapper() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "scaleQuiz";

  return <QuizPage mode={mode} />;
}
