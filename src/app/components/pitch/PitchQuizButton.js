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
      onClick(note);
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

      <div>
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer transition-transform duration-200 ease-in-out active:translate-y-1 hover:brightness-110"
          onClick={handleClick}
        >
          <defs>
            {/* ツヤ感を強調したグラデーション */}
            <radialGradient id="bgGradient" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#66ccff" />{" "}
              {/* 明るいハイライトブルー */}
              <stop offset="60%" stopColor="#1e3a8a" /> {/* 深いブルー */}
              <stop offset="100%" stopColor="#0a1a40" /> {/* 濃紺に近い外縁 */}
            </radialGradient>

            {/* 内部ハイライトの反射光層 */}
            <radialGradient id="highlight" cx="50%" cy="25%" r="30%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            {/* 外周リング用のグラデーション（上に光、下に影） */}
            <linearGradient
              id="borderGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />{" "}
              {/* 上部ハイライト */}
              <stop offset="30%" stopColor="#aaaaaa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#555555" stopOpacity="1" />{" "}
              {/* 下部シャドウ感 */}
            </linearGradient>

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

            {/* テキストストローク用スタイル */}
            <style>
              {`
        .textStroke {
          font-weight: bold;
          font-size: 20px;
          fill: white;
          stroke: gray;
          stroke-width: 0.7px;
          paint-order: stroke fill;
        }
      `}
            </style>
          </defs>

          {/* ボタン本体 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#bgGradient)"
            stroke="#D4AF37" // 渋めグレー
            strokeWidth="4" // 細めリング
            filter="url(#buttonShadow)"
          />
          {/* 外周リング（細め＋ハイライト付き） */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="4"
          />
          {/* 光の反射ハイライト（上部） */}
          <circle cx="50" cy="35" r="25" fill="url(#highlight)" />

          {/* テキスト（中央表示） */}
          <text x="50" y="55" textAnchor="middle" className="textStroke">
            {convertSoundName(note)}
          </text>
        </svg>
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
          className="fixed top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-[65%] z-50"
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
