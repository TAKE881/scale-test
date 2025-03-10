"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePitchQuizLogic } from "@/app/hooks/pitch/usePitchQuizLogic";
import Link from "next/link";
import PitchQuizResult from "@/app/components/pitch/PitchQuizResult";
import { PitchQuizButton } from "@/app/components/pitch/PitchQuizButton";

export default function PitchQuizPage() {
  const {
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    correctAnswer,
    options,
    playNote,
    handleAnswer,
    resetQuiz,
  } = usePitchQuizLogic();

  const [clientOptions, setClientOptions] = useState([]);

  const isOnlyCorrect = false;

  useEffect(() => {
    if (options) {
      if (isOnlyCorrect) {

        setClientOptions([correctAnswer]);
      } else {

        setClientOptions(options);
      }
    }
  }, [options, correctAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="h-screen flex flex-col bg-cover bg-center bg-no-repeat"
    >
      {/*============================================================
                                    タイトル
        =============================================================== */}
      <div className="h-[10%] flex items-center justify-center">
        <h1 className="text-white text-xxl pt-4 text-stroke-sm text-stroke-gray-300 font-bold  text-center">
          音感レベル診断！
        </h1>
      </div>
      {isQuizFinished ? (
        <PitchQuizResult
          score={score}
          totalQuestions={totalQuestions}
          resetQuiz={resetQuiz}
        />
      ) : (
        /* =================
         *  問題画面
         * ================= */
        <AnimatePresence mode="wait">
          <motion.main
            key={questionNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center justify-center p-4"
          >
            {/*============================================================
                                    スコア、問題数
            =============================================================== */}
            <div className="h-[10%] flex items-center justify-center  text-stroke-sm text-stroke-gray-300">
              <div>
                <p className="text-white mb-1 text-xs text-center">
                  スコア: {score}
                </p>
                <p className="text-white mb-10 text-xs text-center">
                  問題: {questionNumber + 1} / {totalQuestions}
                </p>
              </div>
            </div>
            {/*============================================================
                                    ボタンレイアウト
            =============================================================== */}
            {/* 再生ボタン */}
            <div className="h-[35%] flex items-center justify-center">
              <div className="flex justify-center mb-26">
                <button
                  onClick={playNote}
                  className="items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-24 h-24 shadow-md transition-colors duration-200"
                  aria-label="再生"
                >
                  再生
                </button>
              </div>
            </div>
            {/* 選択肢ボタン */}
            <div className="h-[35%] flex items-center justify-center">
              <div className="flex gap-8 w-full max-w-md mb-34 justify-center">
                {clientOptions.map((option, index) => (
                  <PitchQuizButton
                    key={option}
                    note={option}
                    isCorrect={selectedOption === option && correctAnswer === option}
                    onClick={() => handleAnswer(option)}
                  />
                ))}
              </div>
            </div>
            {/* 5️ モードセレクトに戻る */}
            <div className="h-[10%] flex justify-center items-center">
              <Link href="/mode-select">
                <button className="
                  relative px-7 py-2 text-xxxs font-semibold
                  text-white bg-gradient-to-r from-gray-500 to-gray-700
                  rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                  border border-white border-opacity-30 hover:border-opacity-60
                  hover:scale-105
                  before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                  hover:before:opacity-100
                ">
                  モードセレクトに戻る
                </button>
              </Link>
            </div>
          </motion.main>
        </AnimatePresence >
      )
      }
    </motion.div >
  );
}
