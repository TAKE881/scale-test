"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { waterBrush } from "@/app/layout"; // waterBrush を適切な場所から import
import { M_PLUS_Rounded_1c } from "next/font/google";
import { useSoundName } from "@/app/hooks/pitch/useSoundName";

export const mplus = M_PLUS_Rounded_1c({
  weight: ["700"], // お好みで
  subsets: ["latin"],
});

export default function PitchQuizResult({
  score,
  bonusPoint,
  totalQuestions,
  resetQuiz,
  answerHistory,
}) {
  console.log("渡ってきたスコア:", score);
  console.log("渡ってきたボーナス:", bonusPoint);
  console.log("渡ってきた履歴:", answerHistory);
  // const {
  //   score,
  //   bonusPoint,
  //   questionNumber,
  //   totalQuestions,
  //   // isQuizFinished,
  //   // selectedOption,
  //   correctAnswer,
  //   options,
  //   playNote,
  //   handleAnswer,
  //   resetQuiz,
  //   instrument,
  //   setInstrument,
  //   handleInstrumentToggle,

  // } = usePitchQuizLogic();

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: 左へ, +1: 右へ
  const router = useRouter();

  const handleNext = () => {
    if (pageIndex < pages.length - 1) {
      setDirection(1);
      setPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      setPageIndex((prev) => prev - 1);
    }
  };

  // const variants = {
  //   enter: (dir) => ({
  //     x: dir > 0 ? 300 : -300,
  //     opacity: 0,
  //   }),
  //   center: {
  //     x: 0,
  //     opacity: 1,
  //   },
  //   exit: (dir) => ({
  //     x: dir > 0 ? -300 : 300,
  //     opacity: 0,
  //   }),
  // };

  const variants = {
    hidden: {
      opacity: 0,
      y: 0, // ← 下からふわっと登場させたいならここ
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 0, // ← 上にフェードアウトしたいならここ
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // 色を決める関数を追加
  // const getScoreColor = (scorePercentage) => {
  //   if (scorePercentage < 20) return "text-red-500";
  //   if (scorePercentage < 40) return "text-red-500";
  //   if (scorePercentage < 60) return "text-metallic-bronze";
  //   if (scorePercentage < 80) return "text-metallic-silver";
  //   return "text-metallic-gold"; // 80〜100
  // };
  const getScoreColor = (scorePercentage) => {
    if (scorePercentage < 20) return "text-red-700";
    if (scorePercentage < 40) return "text-red-700";
    if (scorePercentage < 60) return "text-red-700";
    if (scorePercentage < 80) return "text-azure-blue";
    return "text-deep-sapphire"; // 80〜100
  };

  const { convertSoundName } = useSoundName();

  const scorePercentage = ((score / totalQuestions) * 100).toFixed();

  const pages = [
    /* ============================================================
     *                          ページ１
     * ============================================================ */
    {
      title: "結果",
      content: (
        <>
          <div className="text-xl font-bold text-left w-[70vw] mx-auto mb-3">
            <h1 className="">あなたのpitchレベルは...</h1>
          </div>
          <div>
            <h1
              className={`${
                waterBrush.className
              } text-9xl mb-10 ${getScoreColor(scorePercentage)}`}
            >
              {scorePercentage}
            </h1>
          </div>

          <div className=" text-xl text-left w-[65vw] mx-auto">
            <p className="mb-5">
              ▪️正解数: {score} / {totalQuestions}
            </p>
            <p className="mb-14">
              ▪️pitchレベル: {((score / totalQuestions) * 100).toFixed()}点
            </p>
            {bonusPoint > 0 && (
              <p className="">
                ▪️BP:{" "}
                {totalQuestions > 0
                  ? (((bonusPoint || 0) / totalQuestions) * 100).toFixed()
                  : 0}
                ポイント
              </p>
            )}
          </div>
        </>
      ),
    },
    /* ============================================================
     *                          ページ２
     * ============================================================ */
    {
      title: "結果一覧",
      content: (
        <>
          <h2 className="text-2xl font-bold mb-2">正解とあなたの回答</h2>
          <div className="text-left w-[70vw] mx-auto">
            {answerHistory && answerHistory.length > 0 ? (
              // <ul className="list-disc list-inside text-md">
              //   {answerHistory.map((item, index) => (
              //     <li key={index} className="mb-2">
              //       第 {item.questionNumber} 問：
              //       {item.isCorrect ? "⭕️" : "❌"}
              //       <div className="">
              //         正解 ➤ {item.correctAnswer} ／
              //         選択 ➤ {item.selectedAnswer} </div>

              //     </li>
              //   ))}
              // </ul>
              <ul className="space-y-4">
                {answerHistory.map((item, index) => (
                  <li
                    key={index}
                    className="p-1 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold mb-2 text-md">
                      第 {item.questionNumber} 問：
                      <span
                        className={`${
                          item.isCorrect ? "text-deep-sapphire" : "text-red-700"
                        } ${mplus.className} text-md`}
                      >
                        {item.isCorrect ? "〇" : "✕"}
                      </span>
                    </p>
                    <div className="flex gap-6 text-sm">
                      <p>
                        正解　
                        <span className="text-deep-sapphire">
                          {convertSoundName(item.correctAnswer)}　
                        </span>
                      </p>
                      <p>
                        あなたの回答　{" "}
                        <span
                          className={
                            item.isCorrect
                              ? "text-deep-sapphire"
                              : "text-red-700"
                          }
                        >
                          {convertSoundName(item.selectedAnswer)}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>履歴データがありません。</p>
            )}
          </div>
        </>
      ),
    },
    /* ============================================================
     *                          ページ３
     * ============================================================ */
    {
      title: "操作メニュー",
      content: (
        <div className="min-h-screen flex justify-center items-center z-20 relative">
          <div className="transform -translate-y-50 flex flex-col  gap-6">
            <button
              onClick={resetQuiz}
              className="
              relative
              px-14 py-5
              text-xs font-semibold text-white
              bg-gradient-to-r
              from-royal-blue to-midnight-blue
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
              もう一度プレイ
            </button>
            <button
              onClick={() => router.push("/mode-select")}
              className="
              relative
              px-14 py-5
              text-xs font-semibold text-white
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
          </div>
        </div>
      ),
    },
  ];

  return (
    // <div className="bg[url('/image-bg-Result/bggakki.webp')] bg-cover-center bg-no-repeat">
    //   <div className="relative inset-0  bg-cover bg-center bg-no-repeat  opacity-30 z-0 w-full max-w-md mx-auto p-6 text-center bg-white shadow-lg rounded-lg min-h-[80vh]">
    <div className="bg[url('/image-bg-Result/bggakki.webp')] bg-cover-center bg-no-repeat">
      <div className="relative inset-0  bg-cover bg-center bg-no-repeat z-0 w-full max-w-md mx-auto p-6 text-center bg-white shadow-lg rounded-lg min-h-[80vh]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={variants}
            initial="hidden"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className={`absolute top-0 left-0 w-full z-0 ${
              pageIndex === 2 ? "z-10" : "z-0"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-deep-sapphire">
              {pages[pageIndex].title}
            </h2>
            {pages[pageIndex].content}
          </motion.div>
        </AnimatePresence>

        {/* ナビゲーション矢印 */}
        <div className="absolute left-0 right-0 top-70 flex justify-between h-20 z-50">
          <button
            onClick={handlePrev}
            disabled={pageIndex === 0}
            className="text-5xl text-metallic-blue disabled:opacity-20"
          >
            ◀︎
          </button>
          <button
            onClick={handleNext}
            disabled={pageIndex === pages.length - 1}
            className="text-5xl text-metallic-blue disabled:opacity-20"
          >
            ▶︎
          </button>
        </div>
      </div>
    </div>
  );
}
