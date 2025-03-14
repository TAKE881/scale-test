"use client";

import { useSoundName } from "@/app/hooks/pitch/useSoundName";
import { useState, useEffect } from "react";


export function PitchQuizButton({ note, correctNote, onClick }) {
  const { convertSoundName } = useSoundName();

  const [effectType, setEffectType] = useState(null); // "correct" or "wrong" or null

  const handleClick = () => {
    const isCorrect = note === correctNote;

    //  即時エフェクト表示
    setEffectType(isCorrect ? "correct" : "wrong");

    //  親に通知（必要なら）
    if (onClick) {
      onClick(note, isCorrect);
    }

    //  一定時間後にエフェクト消去
    setTimeout(() => {
      setEffectType(null);
    }, 1000);
  };

  return (
    <>
      {/*============================================================
                                    クイズ選択肢
            =============================================================== */}

      <div
        className="
          w-14 h-28 bg-gradient-to-b mb-1 from-white to-gray-300 text-black
          border border-metallic-gray-light rounded-md shadow-lg transition-transform
          ease-in-out duration-200 transform active:translate-y-1 cursor-pointer
          flex relative overflow-hidden items-center justify-center
        "
        onClick={handleClick}
      >
        {/*============================================================
                                    テキストシャドウとテキストストロークが入らない
            =============================================================== */}

        <span className="text-xl text-shadow text-center text-metallic-gray-dark text-stroke-sm text-stroke-gray mb-1 z-10">
          {convertSoundName(note)}
        </span>
      </div>
      {/*============================================================
                                    正解・不正解エフェクト
            =============================================================== */}
      {/*  正解エフェクト（赤丸） */}
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

      {/*  不正解エフェクト（青） */}
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
        // ============================================================

        // ===============================================================
      )}
    </>
  );
}
