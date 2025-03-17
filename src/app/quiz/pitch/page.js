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
    bonusPoint,
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
            text-royal-blue
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, ease: "easeOut", delay: 0.9 }}
        >
          <PitchQuizResult
            score={score}
            bonusPoint={bonusPoint}
            totalQuestions={totalQuestions}
            resetQuiz={resetQuiz}
          />
        </motion.div>
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
                text-royal-blue
                text-stroke-ssssm
                text-stroke-gray-500
                text-xl
                font-bold
                text-center
              "
            >
              <div>
                <p className=" mb-1">スコア: {score}</p>
                <p className=" mb-1">スコア: {bonusPoint}</p>
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
                    border
                    border-metallic-silver
                    ${instrument === "Voice"
                      ? "bg-royal-blue"
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
                    border
                    border-metallic-silver
                    ${instrument === "Retro"
                      ? "bg-royal-blue"
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
                    border
                    border-metallic-silver
                    ${instrument === "Violin"
                      ? "bg-royal-blue"
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
                    border
                    border-metallic-silver
                    ${instrument === "Guitar"
                      ? "bg-royal-blue"
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
                                  PlayerSVG
                =============================================================== */}
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* グラデーション定義 */}
                  <defs>
                    {/* 外円のグラデーション */}
                    <radialGradient
                      id="outerGradient"
                      cx="50%"
                      cy="50%"
                      r="60%"
                    >
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>

                    <radialGradient
                      id="outerHighlight"
                      cx="50%"
                      cy="20%"
                      r="30%"
                    >
                      <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    {/* 中央シルバーグラデーション */}
                    <radialGradient id="silverGloss" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#e5e7eb" />
                      <stop offset="60%" stopColor="#9ca3af" />
                      <stop offset="80%" stopColor="#6b7280" />
                      <stop offset="100%" stopColor="#4b5563" />
                    </radialGradient>

                    {/* シルバー縁のグラデーション */}
                    <linearGradient
                      id="silverEdge"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />{" "}
                      {/* 上部ハイライト */}
                      <stop
                        offset="30%"
                        stopColor="#aaaaaa"
                        stopOpacity="0.8"
                      />
                      <stop offset="100%" stopColor="#555555" stopOpacity="1" />{" "}
                      {/* 下部シャドウ感 */}
                    </linearGradient>

                    <radialGradient id="glowLight" cx="50%" cy="50%" r="100%">
                      <stop offset="0%" stopColor="#cceeff" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    {/* シャドウ・立体感 */}
                    <filter
                      id="buttonShadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="3"
                        floodColor="rgba(0,0,0,0.4)"
                      />
                      <feDropShadow
                        dx="0"
                        dy="-2"
                        stdDeviation="4"
                        floodColor="rgba(255,255,255,0.3)"
                      />
                    </filter>

                    <radialGradient
                      id="silverHighlight"
                      cx="50%"
                      cy="30%"
                      r="30%"
                    >
                      <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                    <filter
                      id="metalShadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="4"
                        floodColor="#000000"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </defs>

                  {/* 外円（背景） */}
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="url(#outerGradient)"
                    stroke="url(#borderGradient)"
                    strokeWidth="8"
                  />
                  {/* 下部の光の演出（オプション） */}
                  <ellipse
                    cx="200"
                    cy="310"
                    rx="100"
                    ry="30"
                    fill="url(#glowLight)"
                    opacity="0.3"
                  />

                  {/* クロスヘア線 */}
                  <line
                    x1="200"
                    y1="20"
                    x2="200"
                    y2="380"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <line
                    x1="20"
                    y1="200"
                    x2="380"
                    y2="200"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />

                  {/* 中央の縁（光沢リング） */}
                  <circle
                    cx="200"
                    cy="200"
                    r="96"
                    fill="url(#outerHighlight)"
                    stroke="url(#borderGradient)"
                    strokeWidth="9"
                  />

                  {/* 中央 */}
                  <circle
                    cx="200"
                    cy="200"
                    r="90"
                    fill="url(#silverGloss)"
                    stroke="none"
                  />

                  {/* 音符アイコン（少し小さめ・中央） */}
                  <g transform="translate(200, 200) scale(0.008, -0.008) translate(-4800, -6400)">
                    <path
                      d="M6060 11646 l-3125 -632 -3 -4047 c-1 -2226 -4 -4047 -7 -4047 -3 0
                        -29 20 -59 44 -141 114 -382 176 -689 176 -394 0 -806 -184 -1200 -534 -307
                        -273 -516 -606 -594 -947 -26 -113 -23 -368 5 -472 91 -334 353 -574 707 -648
                        104 -22 308 -26 425 -9 531 80 1068 424 1375 885 114 170 193 351 242 555 17
                        71 18 266 20 4085 l3 4011 2913 587 c1601 324 2915 588 2920 587 4 0 7 -1598
                        7 -3551 l0 -3550 -42 34 c-162 131 -372 189 -698 190 -144 0 -192 -3 -273 -21
                        -485 -107 -998 -471 -1302 -923 -71 -105 -155 -277 -194 -394 -86 -261 -79
                        -546 18 -760 119 -262 391 -459 704 -510 401 -65 955 117 1343 440 342 285
                        547 596 642 975 l27 105 2 4503 3 4502 -22 -1 c-13 0 -1429 -285 -3148 -633z"
                      fill="black"
                    />
                  </g>
                </svg>

                {/*============================================================
                                    SVG(END)
                =============================================================== */}
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
                  opacity-70
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
                  gap-2
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
