"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScaleQuiz } from "../components/ScaleQuizLogic";
import { usePitchTrainingQuiz } from "./PitchTrainingLogic";
import { PianoKeyboard } from "../components/PianoKeyboard";

export default function QuizPageContent({ mode }) { // ✅ props で `mode` を受け取る
  const router = useRouter();

  console.log("Quiz mode:", mode); // ✅ デバッグ用

  // クイズの種類に応じてロジックを選択
  const quizLogic = mode.includes("pitch") ? usePitchTrainingQuiz() : useScaleQuiz();

  // クイズのデータを取得
  const {
    currentQuestion,
    options,
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    playQuestionSound,
    handleAnswer,
    resetQuiz
  } = quizLogic;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="min-h-screen bg-cover bg-center bg-no-repeat dark:bg-gray-900 dark:text-white"
    >
      <h1 className="text-white text-2xl font-bold text-center mb-4">
        {mode.includes("pitch") ? "音程ゲーム" : "スケールクイズ"}
      </h1>

      {isQuizFinished ? (
        <motion.main
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">クイズ結果</h1>
          <p className="mb-4 text-lg text-center">スコア: {score} / {totalQuestions}</p>
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
            <p className="text-white mb-4 text-lg text-center">スコア: {score}</p>
            <p className="text-white mb-4 text-lg text-center">
              問題: {questionNumber + 1} / {totalQuestions}
            </p>

            {/* 🎵 クイズの音を再生 */}
            <button
              onClick={playQuestionSound}
              className="flex items-center justify-center bg-[#1DB954] hover:bg-[#1ED760] text-white rounded-full w-16 h-16 shadow-md transition-colors duration-200"
              aria-label="再生"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-play-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
              </svg>
            </button>

            {/* 🎹 音程ゲームならピアノを表示 */}
            {mode.includes("pitch") && (
              <div className="mt-4">
                <PianoKeyboard handleAnswer={handleAnswer} />
              </div>
            )}

            {/* 🎵 スケールクイズなら選択肢を表示 */}
            {!mode.includes("pitch") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
                {options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.name, index)}
                    className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ${selectedOption === index ? "selected" : ""
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.name}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.main>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
