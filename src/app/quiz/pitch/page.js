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
    instrument,
    setInstrument,
    handleInstrumentToggle,
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
      <div className="h-[5%] mb-7 flex items-center justify-center">
        <h1 className="text-metallic-gold text-xxl pt-4 text-stroke-sm text-stroke-gray-300 font-bold  text-center">
          Perfect pitch！
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
            <div className="h-[5%] mb-12 flex items-center justify-center  text-stroke-sm text-stroke-gray-300">
              <div>
                <p className="text-metallic-silver mb-1 text-xs text-center">
                  スコア: {score}
                </p>
                <p className="text-metallic-silver mb-10 text-xs text-center">
                  問題: {questionNumber + 1} / {totalQuestions}
                </p>
              </div>
            </div>
            {/*============================================================
                                    再生ボタン（仮）
            =============================================================== */}
            {/* 再生ボタン */}
            {/* バージョン１ */}
            {/* <div className="h-[42.5%] flex items-center justify-center">
              <div className="flex justify-center mb-26">
                <button
                  onClick={playNote}
                  className="items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-24 h-24 shadow-md transition-colors duration-200"
                  aria-label="再生"
                >
                  再生
                </button>
              </div>
            </div> */}
            {/* バージョン２ */}
            {/* <div>
              <div className="flex justify-center mt-4">
                <button onClick={() => setInstrument("Violin")} className="px-4 py-2 bg-gray-300 rounded">🎻</button>
              </div>
              <div className="h-[42.5%] flex items-center justify-center">
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
              <div className="flex justify-between px-4">
                <button onClick={() => handleInstrumentToggle("Voice")} className="px-4 py-2 bg-gray-300 rounded">🎤</button>
                <button onClick={() => handleInstrumentToggle("Retro")} className="px-4 py-2 bg-gray-300 rounded">🎮</button>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={() => handleInstrumentToggle("Guitar")} className="px-4 py-2 bg-gray-300 rounded">🎸</button>
              </div>
            </div> */}

            {/*============================================================
                                    楽器変更ボタン
            =============================================================== */}
            <div className="h-[42.5%] flex flex-col items-center gap-4">
              <div className="flex gap-4">
                {/* *****************🎤*****************  */}
                <button
                  onClick={() => handleInstrumentToggle("Voice")}
                  className={`px-1 py-1 rounded-full w-8 h-8 ${
                    instrument === "Voice"
                      ? "bg-metallic-gold"
                      : instrument !== "Voice" && instrument !== "Synth"
                      ? "bg-gray-400"
                      : "bg-metallic-silver"
                  }`}
                >
                  🎤
                </button>

                {/* *****************🎮***************** */}
                <button
                  onClick={() => handleInstrumentToggle("Retro")}
                  className={`px-1 py-1 rounded-full w-8 h-8 ${
                    instrument === "Retro"
                      ? "bg-metallic-gold"
                      : instrument !== "Retro" && instrument !== "Synth"
                      ? "bg-gray-400"
                      : "bg-metallic-silver"
                  }`}
                >
                  🎮
                </button>

                {/* *****************🎻*****************  */}
                <button
                  onClick={() => handleInstrumentToggle("Violin")}
                  className={`px-1 py-1 rounded-full w-8 h-8 ${
                    instrument === "Violin"
                      ? "bg-metallic-gold"
                      : instrument !== "Violin" && instrument !== "Synth"
                      ? "bg-gray-400"
                      : "bg-metallic-silver"
                  }`}
                >
                  🎻
                </button>

                {/* *****************🎸*****************  */}
                <button
                  onClick={() => handleInstrumentToggle("Guitar")}
                  className={`px-1 py-1 rounded-full w-8 h-8 ${
                    instrument === "Guitar"
                      ? "bg-metallic-gold"
                      : instrument !== "Guitar" && instrument !== "Synth"
                      ? "bg-gray-400"
                      : "bg-metallic-silver"
                  }`}
                >
                  🎸
                </button>
                {/*============================================================
                                    再生ボタン
            =============================================================== */}
              </div>
              {/* 再生 */}
              {/* <button
                onClick={playNote}
                className="items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-24 h-24 shadow-md transition-colors duration-200"
                aria-label="再生"
              >
                再生
              </button> */}
              <button
                onClick={playNote}
                aria-label="再生"
                className="
                            relative
                            w-30 h-30
                            flex items-center justify-center
                            rounded-full shadow-md
                            overflow-hidden
                            transition-all duration-150
                            active:scale-95
                          "
              >
                {/*============================================================
                                    SVG（仮）
            =============================================================== */}
                {/* ▼ SVGを全面に表示 */}
                {/* <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                > */}
                {/* ▼ メタリックグラデ定義 */}
                {/* <defs>
                    <radialGradient id="metalGradient" cx="50%" cy="50%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#cccccc" />
                      <stop offset="80%" stopColor="#999999" />
                      <stop offset="100%" stopColor="#666666" />
                    </radialGradient>
                  </defs> */}

                {/* ▼ 外周リング */}
                {/* <circle cx="100" cy="100" r="95" fill="#222" />
                  <circle cx="100" cy="100" r="80" fill="#333" /> */}

                {/* ▼ 上半分の水色円弧 */}
                {/* <path
                    d="M 100,100 L 100,20 A 80,80 0 0 1 180,100 Z"
                    fill="#4EB1BA"
                  /> */}
                {/* ▼ 下半分のピンク円弧 */}
                {/* <path
                    d="M 100,100 L 180,100 A 80,80 0 0 1 100,180 A 80,80 0 0 1 20,100 Z"
                    fill="#EF5777"
                  /> */}

                {/* ▼ 中央ノブ */}
                {/* <circle cx="100" cy="100" r="40" fill="url(#metalGradient)" /> */}

                {/* ▼ ノブの溝装飾 */}
                {/* <circle cx="100" cy="100" r="35" fill="none" stroke="#444" strokeWidth="2" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#555" strokeWidth="2" /> */}

                {/* ▼ 中央マーカー */}
                {/* <circle cx="100" cy="100" r="5" fill="#aaa" />
                </svg> */}

                {/*============================================================
                                    SVG
            =============================================================== */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ▼ メタリックグラデ定義 */}
                  <defs>
                    <radialGradient
                      id="metalGradient"
                      cx="50%"
                      cy="50%"
                      r="70%"
                    >
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#cccccc" />
                      <stop offset="80%" stopColor="#999999" />
                      <stop offset="100%" stopColor="#666666" />
                    </radialGradient>
                  </defs>

                  {/* ▼ 外周リング */}
                  <circle cx="100" cy="100" r="88" fill="#222" />

                  {/* ▼ 内リング（グレーで統一） */}
                  <circle cx="100" cy="100" r="80" fill="#888888" />

                  {/* ▼ 中央ノブ */}
                  <circle cx="100" cy="100" r="40" fill="url(#metalGradient)" />

                  {/* ▼ ノブの溝装飾 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="35"
                    fill="none"
                    stroke="#444"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="30"
                    fill="none"
                    stroke="#555"
                    strokeWidth="2"
                  />

                  {/* ▼ 中央マーカー */}
                  <circle cx="100" cy="100" r="5" fill="#aaa" />
                </svg>
              </button>
            </div>

            {/*============================================================
                                    選択肢ボタン
            =============================================================== */}
            {/* 選択肢ボタン */}
            <div className="h-[42.5%] mb-30 flex items-center justify-center">
              <div className="flex gap-8 w-full max-w-md justify-center">
                {clientOptions.map((option, index) => (
                  <PitchQuizButton
                    key={option}
                    note={option}
                    // isCorrect={selectedOption === option && correctAnswer === option}
                    // onClick={() => handleAnswer(option)}
                    correctNote={correctAnswer} // ✅ これが重要！noteと比較する基準
                    onClick={() => handleAnswer(option)} // ✅ 正誤判定不要、PitchQuizButtonが自分で判断する
                  />
                ))}
              </div>
            </div>
            {/*============================================================
                                    モードセレクトに戻る
            =============================================================== */}
            <div className="h-[5%] flex justify-center items-center">
              <Link href="/mode-select">
                <button
                  className="
                  relative px-7 py-2 text-xxxs font-semibold
                  text-white bg-gradient-to-r from-gray-500 to-gray-700
                  rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                  border border-white border-opacity-30 hover:border-opacity-60
                  hover:scale-105
                  before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                  hover:before:opacity-100
                "
                >
                  モードセレクトに戻る
                </button>
              </Link>
            </div>
          </motion.main>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
