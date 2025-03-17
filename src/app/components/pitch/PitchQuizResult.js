"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { waterBrush } from "@/app/layout"; // waterBrush を適切な場所から import

export default function PitchQuizResult({
  score, bonusPoint, totalQuestions, resetQuiz, answerHistory
}) {
  console.log("📊 渡ってきたスコア:", score);
  console.log("🎁 渡ってきたボーナス:", bonusPoint);
  console.log("📚 渡ってきた履歴:", answerHistory);
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
  const getScoreColor = (scorePercentage) => {
    if (scorePercentage < 20) return "text-red-500";
    if (scorePercentage < 40) return "text-red-500";
    if (scorePercentage < 60) return "text-metallic-bronze";
    if (scorePercentage < 80) return "text-metallic-silver";
    return "text-metallic-gold"; // 80〜100
  };

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
            <h1 className="">
              あなたのpitchレベルは...
            </h1>
          </div>
          <div>
            <h1
              className={`${waterBrush.className} text-9xl mb-10 ${getScoreColor(
                scorePercentage
              )}`}
            >
              {scorePercentage}
            </h1>
          </div>

          <div
            className=" text-xl text-left w-[40vw] mx-auto">
            <p className="mb-5">
              ▪️正解数: {score} / {totalQuestions}
            </p>
            <p className="mb-14">
              ▪️pitchレベル: {((score / totalQuestions) * 100).toFixed()}
            </p>
            <p className="">
              ▪️BP: {totalQuestions > 0 ? ((bonusPoint || 0) / totalQuestions * 100).toFixed() : 0}
            </p>
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
          <h2 className="text-2xl font-bold mb-2">問題の答えとあなたの回答</h2>
          <div
            className=" text-xl text-left w-[60vw] mx-auto">
            {answerHistory && answerHistory.length > 0 ? (
              <ul className="list-disc list-inside text-md">
                {answerHistory.map((item, index) => (
                  <li key={index} className="mb-2">
                    第 {item.questionNumber} 問：
                    {item.isCorrect ? "⭕️" : "❌"}
                    <div>
                      正解 ➤ {item.correctAnswer} ／
                      選択 ➤ {item.selectedAnswer} </div>

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
        <div className="min-h-screen flex justify-center items-center">
          <div className="transform -translate-y-50 flex flex-col sm:flex-row gap-6">
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto text-center"
            >
              再チャレンジ
            </button>
            <button
              onClick={() => router.push("/mode-select")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto text-center"
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
            className="absolute top-0 left-0 w-full"
          >
            <h2 className="text-4xl font-bold mb-4 text-deep-sapphire">
              {pages[pageIndex].title}
            </h2>
            {pages[pageIndex].content}
          </motion.div>
        </AnimatePresence>

        {/* ナビゲーション矢印 */}
        <div className="absolute left-0 right-0 top-70 flex justify-between h-20">
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
