"use client";


import { Water_Brush } from "next/font/google";
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePitchQuiz } from "@/components/pitch/PitchQuizLogic";
import { PitchQuizButton } from "@/components/pitch/PitchQuizButton";
import { PitchQuizPlayer } from "@/components/pitch/PitchQuizPlayer";
import Link from "next/link";

const waterBrush = Water_Brush({ subsets: ["latin"], weight: "400" });
export default function PitchQuizPage() {

  const router = useRouter();

  // ①「現在の音量」を管理する state
  const [volume, setVolume] = useState(0);

  // ② ページのマウント時に localStorage を読み込む
  useEffect(() => {
    const savedVol = localStorage.getItem("quizVolume");
    if (savedVol !== null) {
      setVolume(Number(savedVol));
    }
  }, []);

  // ③ 再生ボタン押下時の処理 (音量再取得 & 音再生)
  async function handlePlayNote() {
    // 再度 localStorage から読み込み (設定ページから戻ってきた直後など想定)
    const savedVol = localStorage.getItem("quizVolume");
    if (savedVol !== null) {
      setVolume(Number(savedVol));
    }
    await Tone.start();
    Tone.getDestination().volume.value = volume;
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }

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
        /* =================
         *  結果画面
         * ================= */
        <motion.main
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center justify-center min-h-[90vh] p-6 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
        >
          <div>
            <h1 className={`${waterBrush.className} text-9xl`}>
              {((score / totalQuestions) * 100).toFixed()}
            </h1>
          </div>
          <h1 className="text-2xl font-bold mb-9 text-center">あなたの音感レベル</h1>
          <div className="w-300">
            <p className="mb-1 text-lg text-left">
              正解数: {score} / {totalQuestions}
            </p>
            <p className="mb-8 text-lg text-left">
              音感レベル: Lv.{((score / totalQuestions) * 100).toFixed()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              再チャレンジ
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
            <button
              onClick={playNote}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 shadow-md transition-colors duration-200"
              aria-label="再生"
            >
              再生
            </button>

            {/* ▼ ここから選択肢表示（2通りの例示）▼ */}

            {/* --- (例1) PitchQuizButton.js を使ってシンプルなボタンUIで4択表示する場合 --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4 mb-5">
              {options.map((option, index) => (
                <PitchQuizButton
                  key={option}
                  label={option}
                  value={option}
                  onClick={(val) => handleAnswer(val, index)}
                />
              ))}
            </div>

            {/* --- (例2) PitchQuizPlayer.js を使って「鍵盤風UI」で4択表示する場合 ---

            <div className="mt-8">
              <PitchQuizPlayer
                options={options}
                handleAnswer={handleAnswer}
              />
            </div>

            ※ 上の PitchQuizButton の部分をコメントアウトし、
               こちらを使えば「鍵盤のUI」で回答できるようになります。 */}
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
          </motion.main>
        </AnimatePresence>
      )}

    </motion.div>
  );
}
