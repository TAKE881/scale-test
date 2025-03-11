"use client";

import { useSoundName } from "@/app/hooks/pitch/useSoundName";
import { useState, useEffect } from "react";

// export function PitchQuizButton({ note, isCorrect = null, onClick }) {
export function PitchQuizButton({ note, correctNote, onClick }) {
  const { convertSoundName } = useSoundName();

  // console.log("PitchQuizButton に渡された note:", note);

  // console.log("isCorrect:", isCorrect);
  // console.log(`🎹 クイズボタン 表示: note=${note}, isCorrect=${isCorrect}`);

  // const [showEffect, setShowEffect] = useState(false);
  const [effectType, setEffectType] = useState(null); // "correct" or "wrong" or null

  // useEffect(() => {
  //   console.log(" useEffect が実行された: isCorrect =", isCorrect);

  // if (isCorrect) {
  //   console.log(" エフェクトを表示！");
  //   setShowEffect(true);

  // if (isCorrect === true) {
  //   console.log("✅ 正解 → 赤丸エフェクト");
  //   setEffectType("correct");
  // } else if (isCorrect === false) {
  //   console.log("❌ 不正解 → バッテンエフェクト");
  //   setEffectType("wrong");
  // } else {
  //   return; // nullならスルー
  // }

  // const timeout = setTimeout(() => {
  //   setShowEffect(false);
  //   console.log(" エフェクトを消去！");
  // }, 1000); // 1秒後にエフェクトを消す

  // const timeout = setTimeout(() => {
  //   setEffectType(null);
  //   console.log("🎬 エフェクトを消去！");
  // }, 1000);

  const handleClick = () => {
    const isCorrect = note === correctNote;

    // ✅ 即時エフェクト表示
    setEffectType(isCorrect ? "correct" : "wrong");

    // ✅ 親に通知（必要なら）
    if (onClick) {
      onClick(note, isCorrect);
    }

    // ✅ 一定時間後にエフェクト消去
    setTimeout(() => {
      setEffectType(null);
    }, 1000);
  };

  //   return () => {
  //     console.log(" タイマークリア");
  //     clearTimeout(timeout);
  //   };
  // }, [isCorrect]);

  // useEffect(() => {
  //   console.log(" showEffect の状態:", showEffect);
  // }, [showEffect]);
  // useEffect(() => {
  //   console.log("🎞 showEffectType の状態:", effectType);
  // }, [effectType]);

  // const handleClick = () => {
  //   if (onClick) {
  //     onClick(note);
  //   }
  // };

  return (
    <>
      {/* ボタン本体 */}
      <div
        className="
          w-14 h-28 bg-gradient-to-b mb-1 from-white to-gray-300 text-black
          border border-black rounded-md shadow-lg transition-transform
          ease-in-out duration-200 transform active:translate-y-1 cursor-pointer
          flex relative overflow-hidden items-center justify-center
        "
        onClick={handleClick}
      >
        <span className="text-lg text-center text-black mb-1 z-10">
          {convertSoundName(note)}
        </span>
      </div>
      {/* {showEffect && (
        <svg
          className="fixed top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 z-50"
          viewBox="0 0 100 100"
          fill="none"
          stroke="red"
          strokeWidth="8"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="red"
            strokeWidth="8"
            fill="none"
          >
            <animate
              attributeName="r"
              from="0"
              to="40"
              dur="0.3s"
              fill="freeze"
            />
          </circle>
        </svg>
      )} */}
      {/* ✅ 正解エフェクト（赤丸） */}
      {effectType === "correct" && (
        <svg
          className="fixed top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 z-50"
          viewBox="0 0 100 100"
          fill="none"
          stroke="red"
          strokeWidth="8"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="red"
            strokeWidth="8"
            fill="none"
          >
            <animate
              attributeName="r"
              from="0"
              to="40"
              dur="0.3s"
              fill="freeze"
            />
          </circle>
        </svg>
      )}

      {/* ❌ 不正解エフェクト（青） */}
      {effectType === "wrong" && (
        <svg
          className="fixed top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 z-50"
          viewBox="0 0 100 100"
          fill="none"
          stroke="blue"
          strokeWidth="8"
        >
          <line x1="20" y1="20" x2="80" y2="80">
            <animate
              attributeName="x2"
              from="20"
              to="80"
              dur="0.3s"
              fill="freeze"
            />
            <animate
              attributeName="y2"
              from="20"
              to="80"
              dur="0.3s"
              fill="freeze"
            />
          </line>
          <line x1="80" y1="20" x2="20" y2="80">
            <animate
              attributeName="x2"
              from="80"
              to="20"
              dur="0.3s"
              fill="freeze"
            />
            <animate
              attributeName="y2"
              from="20"
              to="80"
              dur="0.3s"
              fill="freeze"
            />
          </line>
        </svg>
      )}
    </>
  );
}
