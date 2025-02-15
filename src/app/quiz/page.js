"use client";

import { useSearchParams } from "next/navigation";
import QuizPage from "@/components/QuizPage";
import { Suspense } from "react";

export default function QuizPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "scaleQuiz";

  return <QuizPage mode={mode} />;
}
