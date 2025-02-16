// app/quiz/scales/page.js
"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScaleQuiz } from "@/components/scales/ScaleQuizLogic";

export default function ScalesQuizPage() {
  async function playNote() {
    if (!toneStarted) {
      await Tone.start();
      toneStarted = true;
    }
    // localStorageから音量を取得し、反映
    const vol = localStorage.getItem("quizVolume");
    if (vol !== null) {
      Tone.getDestination().volume.value = Number(vol);
    }
    // あとはSynth再生
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }

  const router = useRouter();
  const {
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    playScaleNotes,
    options,
    handleAnswer,
    resetQuiz,
  } = useScaleQuiz();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
    >
      <h1 className="text-white text-2xl font-bold text-center mb-4">
        スケールクイズ
      </h1>

      {isQuizFinished ? (
        <motion.main
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">クイズ結果</h1>
          <p className="mb-4 text-lg text-center">
            スコア: {score} / {totalQuestions}
          </p>
          <p className="mb-8 text-lg text-center">
            正答率: {((score / totalQuestions) * 100).toFixed(2)}%
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              もう一度プレイ
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              トップに戻る
            </button>
          </div>
        </motion.main>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={questionNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            <p className="text-white mb-4 text-lg text-center">
              スコア: {score}
            </p>
            <p className="text-white mb-4 text-lg text-center">
              問題: {questionNumber + 1} / {totalQuestions}
            </p>

            {/* スケールを再生ボタン */}
            <button
              onClick={playScaleNotes}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 shadow-md transition-colors duration-200"
              aria-label="再生"
            >
              再生
            </button>

            {/* 選択肢を並べる */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
              {options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.name, index)}
                  className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ${
                    selectedOption === index ? "selected" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.name}
                </motion.button>
              ))}
            </div>
          </motion.main>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
