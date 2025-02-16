// import { Suspense } from "react";
import QuizPage from "@/components/QuizPage"; // ✅ `QuizPage.js` を読み込む

export default function PitchQuizPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QuizPage />
    </Suspense>
  );
}
