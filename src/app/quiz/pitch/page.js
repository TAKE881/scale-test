"use client";

// import { useFont } from "@/app/layout";
import { useABCDEFGNotation } from "@/app/hooks/pitch/useABCDEFGNotation";
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePitchQuiz } from "@/app/hooks/pitch/usePitchQuiz";
import { PitchQuizButton } from "@/app/components/pitch/PitchQuizButton";
import { PitchQuizKey } from "@/app/components/pitch/PitchQuizKey";
import { PitchQuizPlayer } from "@/app/components/pitch/PitchQuizPlayer";
import Link from "next/link";//画面遷移用//
import { useVolumeControl } from "@/app/hooks/pitch/useVolumeControl";
import { usePitchPlayer } from "@/app/hooks/pitch/usePitchPlayer";
import PitchQuizResult from "@/app/components/pitch/PitchQuizResult";

//
export default function PitchQuizPage() {

  const { volume, setVolume } = useVolumeControl();

  const { handlePlayNote } = usePitchPlayer();

  const { convertToABCDEFG } = useABCDEFGNotation();

  // 音程分析用フック: 問題生成・回答処理・正解時ピンポン音など
  const {
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    options,
    playNote,
    handleAnswer,
    resetQuiz,
  } = usePitchQuiz();


  const [clientOptions, setClientOptions] = useState([null]);

  useEffect(() => {
    if (options) {
      setClientOptions(options);
    }
  }, [options]);


  useEffect(() => {
    console.log("useVolumeControl:", volume);
    console.log("usePitchPlayer:", handlePlayNote);
    console.log("useABCDEFGNotation:", convertToABCDEFG);
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="min-h-screen bg-cover bg-center bg-no-repeat"
    >

      {/* タイトル */}
      <h1 className="text-white text-2xl font-bold text-center mb-4">
        音感レベル診断！
      </h1>
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
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            {/* スコアや問題数 */}
            <p className="text-white mb-4 text-lg text-center">
              スコア: {score}
            </p>
            <p className="text-white mb-4 text-lg text-center">
              問題: {questionNumber + 1} / {totalQuestions}
            </p>

            {/* 再生ボタン → playNote() */}
            <div className="flex justify-center">
              <button
                onClick={handlePlayNote}
                className="items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 shadow-md transition-colors duration-200"
                aria-label="再生"
              >
                再生
              </button>
            </div>
            <div className="flex gap-12 w-full max-w-md mt-4 mb-5 justify-center">
              {clientOptions.map((option, index) => (
                <PitchQuizKey
                  key={option}
                  label={option}
                  value={option}
                  onClick={(val) => handleAnswer(val, index)}
                />
              ))}

            </div>
            <div className="flex justify-center">
              <Link href="/mode-select">
                <button className="
                relative px-7 py-2 text-lg font-semibold
                text-white bg-gradient-to-r from-gray-500 to-gray-700
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              ">
                  戻る
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
