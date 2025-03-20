"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { waterBrush } from "@/app/layout";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { useSoundName } from "@/app/hooks/pitch/useSoundName";

export const mplus = M_PLUS_Rounded_1c({
  weight: ["700"],
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

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
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

  const variants = {
    hidden: {
      opacity: 0,
      y: 0,
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
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  const getScoreColor = (scorePercentage) => {
    if (scorePercentage < 20) return "text-red-700";
    if (scorePercentage < 40) return "text-red-700";
    if (scorePercentage < 60) return "text-red-700";
    if (scorePercentage < 80) return "text-azure-blue";
    return "text-deep-sapphire";
  };

  const { convertSoundName } = useSoundName();

  const scorePercentage = ((score / totalQuestions) * 100).toFixed();
  const handleModeSelect = () => {
    setTimeout(() => {
      router.push("/mode-select");
    }, 400);
  };

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
              className={`${waterBrush.className} text-9xl mb-4 ${getScoreColor(
                scorePercentage
              )}`}
            >
              {scorePercentage}
            </h1>
          </div>

          <div className=" text-xl text-left w-[65vw] mx-auto">
            <p className="mb-5">
              ▪️正解数: {score} / {totalQuestions}
            </p>
            <p className="mb-2">
              ▪️pitchレベル: {((score / totalQuestions) * 100).toFixed()}点
            </p>
            <p className="text-sm font-bold mb-4">【一口辛口コメント】</p>
            <p className="mb-8 text-gray-800 text-sm">
              {scorePercentage >= 100
                ? "完璧すぎて逆に怖い。あなたはもうチートですか？ ー 大谷の親レベル。"
                : scorePercentage >= 80
                ? "なかなかやるじゃないですか。でも満点取ってからドヤってください。 ー サイ・ヤング賞レベル"
                : scorePercentage >= 60
                ? "中途半端にできる人って、一番伸び悩むタイプですよね。 ー 奪三振王レベル"
                : scorePercentage >= 40
                ? "うーん…こういう点数が一番コメントに困るんだよなあ。 ー 新人王レベル"
                : scorePercentage >= 20
                ? "音感？なにそれ美味しいの？ ー マイナーリーグレベル"
                : "これは逆にすごい。全問外す才能、ある意味レア。 ー 近所の公園でボール遊びレベル。"}
            </p>
            {bonusPoint > 0 && (
              <>
                <p className="">
                  ▪️BP:{" "}
                  {totalQuestions > 0
                    ? (((bonusPoint || 0) / totalQuestions) * 100).toFixed()
                    : 0}
                  ポイント
                </p>
                {totalQuestions > 0 ? (
                  <p className="text-sm font-bold mb-4">【一口甘口コメント】</p>
                ) : (
                  0
                )}
                <p className="text-gray-800 text-sm">
                  {((bonusPoint || 0) / totalQuestions) * 100 >= 100
                    ? "あなたは超人的な直感の持ち主です！是非このアプリの続きを作っていただきたい！null2025@gmial.com"
                    : ((bonusPoint || 0) / totalQuestions) * 100 >= 80
                    ? "驚異的な感覚です！直感だけでここまで当てるなんて、天性の才能ですね！"
                    : ((bonusPoint || 0) / totalQuestions) * 100 >= 60
                    ? "直感の冴えが光ってます！あなたには音を超えたセンスがあります✨"
                    : ((bonusPoint || 0) / totalQuestions) * 100 >= 40
                    ? "直感力、着実に育ってきています！潜在能力が開花し始めてます！"
                    : ((bonusPoint || 0) / totalQuestions) * 100 >= 20
                    ? "少しの直感でも未来の大きな力になります！このまま磨きましょう！"
                    : ""}
                </p>
              </>
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
          <div className="text-left w-[80%] mx-auto">
            {answerHistory && answerHistory.length > 0 ? (
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
        <div className="min-h-screen flex justify-center items-center z-50 relative">
          <div className="transform -translate-y-50 flex flex-col  gap-6">
            <button
              onClick={resetQuiz}
              className="
                  relative px-14 py-5 text-xs font-semibold text-white
                  bg-gradient-to-r from-royal-blue to-midnight-blue
                  rounded-full shadow-lg hover:shadow-xl
                  transition-all duration-300
                  border border-white border-opacity-30 hover:border-opacity-60 hover:scale-105
                  before:absolute before:inset-0 before:bg-white/10 before:rounded-full
                  before:opacity-0 before:transition-opacity hover:before:opacity-100
            "
            >
              もう一度プレイ
            </button>
            <button
              onClick={handleModeSelect}
              className="
                  relative px-14 py-5 text-xs font-semibold text-white
                  bg-gradient-to-r from-gray-500 to-gray-700
                  rounded-full shadow-lg hover:shadow-xl
                  transition-all duration-300
                  border border-white border-opacity-30 hover:border-opacity-60 hover:scale-105
                  before:absolute before:inset-0 before:bg-white/10 before:rounded-full
                  before:opacity-0 before:transition-opacity hover:before:opacity-100
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
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0 pointer-events-none"
        style={{ backgroundImage: `url('/image-bg-Result/bggakki.webp')` }}
      ></div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6 text-center bg-white/70 backdrop-blur-sm shadow-lg rounded-lg min-h-[80vh]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={variants}
            initial="hidden"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <h2 className="text-4xl font-bold mb-4 text-deep-sapphire">
              {pages[pageIndex].title}
            </h2>
            {pages[pageIndex].content}
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-0 right-0 top-80 flex justify-between h-20 z-50">
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
