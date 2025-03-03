"use client";

import { useState, useEffect } from "react";

export function PitchQuizKey({ note, isCorrect = false, onClick }) {
  console.log("PitchQuizKey に渡された note:", note);
  console.log("isCorrect:", isCorrect);

  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      console.log("✅ エフェクトを表示！");
      setShowEffect(true);

      const timeout = setTimeout(() => {
        setShowEffect(false);
        console.log("❌ エフェクトを消去！");
      }, 1000); // 1秒後にエフェクトを消す

      return () => clearTimeout(timeout); // ⬅️ タイマーのキャンセル
    }
  }, [isCorrect]);

  // showEffect の状態が変わったらログを出す（デバッグ用）
  useEffect(() => {
    console.log("showEffect has changed:", showEffect);
  }, [showEffect]);

  const handleClick = () => {
    if (onClick) {
      onClick(note);
    }
  };

  return (
    <div
      className="
    w-10 h-20 bg-gradient-to-b from-white to-gray-300 text-black
    border border-black
    rounded-md
    shadow-lg
    transition-transform
    ease-in-out
    duration-200
    transform
    active:translate-y-1
    cursor-pointer
    flex
    relative
    overflow-hidden
    items-center
    justify-center
  "
      onClick={handleClick}
    >
      <span className="text-xs text-center text-black mb-1 z-10">{note}</span>
      {/* 🎨 手書き風の円エフェクト */}
      {showEffect && (
        <svg
          className="absolute w-16 h-16"
          viewBox="0 0 100 100"
          fill="none"
          stroke="green"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="
              M 10,50
              Q 25,5 50,10
              Q 75,15 90,50
              Q 75,85 50,90
              Q 25,95 10,50
            "
            strokeDasharray="400"  /* 👈 修正: 400 に統一 */
            strokeDashoffset="400"  /* 👈 修正: 400 に統一 */
          >
            <animate
              attributeName="stroke-dashoffset"
              from="400"  /* 👈 修正: 必ず 400 に統一 */
              to="0"
              dur="0.8s"
              fill="freeze"
              keyTimes="0; 1"
              attributeType="XML"
              begin="0s" /* 👈 修正: 確実に開始 */
            />
          </path>
        </svg>
      )}
    </div>
  );
}
