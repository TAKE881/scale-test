"use client";

import { Suspense } from "react";
import QuizPageContent from "../components/QuizPageContent";  // クイズロジックを分離

export default function QuizPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QuizPageContent />
    </Suspense>
  );
}
