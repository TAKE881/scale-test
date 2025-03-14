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
  const [isShaking, setIsShaking] = useState(false);

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

  const handlePlayClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
    playNote();
  };

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
        <h1
          className="
            text-metallic-gold
            text-xxxl
            pt-4
            text-stroke-sm
            text-stroke-white
            font-bold
            text-center
          "
        >
          {/* Perfect Pitch！ */}
        </h1>
      </div>
      {/*============================================================
                                    リザルト
        =============================================================== */}
      {isQuizFinished ? (
        <PitchQuizResult
          score={score}
          totalQuestions={totalQuestions}
          resetQuiz={resetQuiz}
        />
      ) : (
        /* ============================================================
         *                          問題画面
         * ============================================================ */
        <AnimatePresence mode="wait">
          <motion.main
            key={questionNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="
              flex flex-col
              items-center
              justify-center
              p-4
            "
          >
            {/*============================================================
                                    スコア、問題数
            =============================================================== */}
            <div
              className="
                h-[5%]
                mb-12
                flex
                items-center
                justify-center
                text-metallic-gold
                text-stroke-sssssm
                text-stroke-white
                text-md
                font-bold
                text-center
              "
            >
              <div>
                <p className=" mb-1">スコア: {score}</p>
                <p className="mb-10">
                  問題: {questionNumber + 1} / {totalQuestions}
                </p>
              </div>
            </div>
            {/*============================================================
                                    楽器変更ボタン
            =============================================================== */}
            <div
              className="
                h-[42.5%]
                flex flex-col
                items-center
                gap-4
              "
            >
              <div className="flex gap-4">
                {/* *****************🎤 Voice ***************** */}
                <button
                  onClick={() => handleInstrumentToggle("Voice")}
                  className={`
                    px-1 py-1 w-8 h-8
                    rounded-full
                    ${instrument === "Voice"
                      ? "bg-metallic-gold"
                      : instrument !== "Voice" && instrument !== "Synth"
                        ? "bg-gray-400"
                        : "bg-metallic-silver"
                    }
                  `}
                >
                  <span
                    className={`
                      ${instrument !== "Voice" && instrument !== "Synth"
                        ? "opacity-20"
                        : "opacity-100"
                      }
                      transition-opacity
                      duration-500
                      ease-in-out
                    `}
                  >
                    🎤
                  </span>
                </button>

                {/* *****************🎮 Retro ***************** */}
                <button
                  onClick={() => handleInstrumentToggle("Retro")}
                  className={`
                    px-1 py-1 w-8 h-8
                    rounded-full
                    ${instrument === "Retro"
                      ? "bg-metallic-gold"
                      : instrument !== "Retro" && instrument !== "Synth"
                        ? "bg-gray-400"
                        : "bg-metallic-silver"
                    }
                  `}
                >
                  <span
                    className={`
                      ${instrument !== "Retro" && instrument !== "Synth"
                        ? "opacity-20"
                        : "opacity-100"
                      }
                      transition-opacity
                      duration-500
                      ease-in-out
                    `}
                  >
                    🎮
                  </span>
                </button>

                {/* *****************🎻 Violin ***************** */}
                <button
                  onClick={() => handleInstrumentToggle("Violin")}
                  className={`
                    px-1 py-1 w-8 h-8
                    rounded-full
                    ${instrument === "Violin"
                      ? "bg-metallic-gold"
                      : instrument !== "Violin" && instrument !== "Synth"
                        ? "bg-gray-400"
                        : "bg-metallic-silver"
                    }
                  `}
                >
                  <span
                    className={`
                      ${instrument !== "Violin" && instrument !== "Synth"
                        ? "opacity-20"
                        : "opacity-100"
                      }
                      transition-opacity
                      duration-500
                      ease-in-out
                    `}
                  >
                    🎻
                  </span>
                </button>
                {/* *****************🎸 Guitar ***************** */}
                <button
                  onClick={() => handleInstrumentToggle("Guitar")}
                  className={`
                    px-1
                    py-1
                    rounded-full
                    w-8
                    h-8
                    ${instrument === "Guitar"
                      ? "bg-metallic-gold"
                      : instrument !== "Guitar" && instrument !== "Synth"
                        ? "bg-gray-400"
                        : "bg-metallic-silver"
                    }
                  `}
                >
                  <span
                    className={`
                      ${instrument !== "Guitar" && instrument !== "Synth"
                        ? "opacity-20"
                        : "opacity-100"
                      }
                      transition-opacity
                      duration-500
                      ease-in-out
                    `}
                  >
                    🎸
                  </span>
                </button>
              </div>
              {/*============================================================
                                    再生ボタン
                =============================================================== */}

              <button
                onClick={playNote}
                aria-label="再生"
                className="
                  relative
                  w-30
                  h-30
                  flex
                  items-center
                  justify-center
                  rounded-full
                  shadow-md
                  overflow-hidden
                  transition-all
                  duration-150
                  active:scale-95
                "
              >
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
                  <circle cx="100" cy="100" r="88" fill="#3a3a3a" />
                  {/* ▼ 内リング（グレーで統一） */}
                  <circle cx="100" cy="100" r="80" fill="#888888" />
                  {/* ▼ 中央ノブ */}
                  <circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="url(#metalGradient)"
                  />
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
                  {/* <circle cx="100" cy="100" r="5" fill="#aaa" /> */}
                </svg>
              </button>
              <button
                onClick={handlePlayClick}
                aria-label="再生"
                className={`
                  absolute
                  top-72
                  text-metallic-gold
                  text-xxxl
                  text-stroke-sm
                  text-stroke-white
                  font-bold
                  pointer-events-none
                  animate-floating
                  `}
              >
                tap
              </button>


            </div>
            {/*============================================================
                                    選択肢ボタン
            =============================================================== */}
            {/* 選択肢ボタン */}
            <div
              className="
                h-[42.5%]
                mb-30
                flex
                items-center
                justify-center
              "
            >
              <div
                className="
                  flex
                  gap-8
                  w-full
                  max-w-md
                  justify-center
                "
              >
                {clientOptions.map((option, index) => (
                  <PitchQuizButton
                    key={option}
                    note={option}
                    correctNote={correctAnswer} //  noteと比較する基準
                    onClick={() => handleAnswer(option)} //  正誤判定不要、PitchQuizButtonが自分で判断する
                  />
                ))}
              </div>
            </div>

            {/*============================================================
                                    モードセレクトに戻る
            =============================================================== */}
            <div
              className="
                h-[5%]
                flex
                justify-center
                items-center
              "
            >
              <Link href="/mode-select">
                <button
                  className="
                    relative
                    px-7 py-2
                    text-xxxs font-semibold text-white
                    bg-gradient-to-r
                    from-gray-500 to-gray-700
                    rounded-full
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    border border-white border-opacity-30
                    hover:border-opacity-60
                    hover:scale-105

                    before:absolute
                    before:inset-0
                    before:bg-white/10
                    before:rounded-full
                    before:opacity-0
                    before:transition-opacity
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
