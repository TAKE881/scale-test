"use client";

import { useSoundName } from "@/app/hooks/pitch/useSoundName";
import { useState, useEffect } from "react";

export function PitchQuizButton({ note, correctNote, onClick }) {
  const { convertSoundName } = useSoundName();

  const [effectType, setEffectType] = useState(null);

  const handleClick = () => {
    const isCorrect = note === correctNote;

    setEffectType(isCorrect ? "correct" : "wrong");

    if (onClick) {
      onClick(note);
    }

    setTimeout(() => {
      setEffectType(null);
    }, 1000);
  };

  return (
    <>
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
            <radialGradient id="bgGradient" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#66ccff" />{" "}
              <stop offset="60%" stopColor="#1e3a8a" />{" "}
              <stop offset="100%" stopColor="#0a1a40" />{" "}
            </radialGradient>

            <radialGradient id="highlight" cx="50%" cy="25%" r="30%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            <linearGradient
              id="borderGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />{" "}
              <stop offset="30%" stopColor="#aaaaaa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#555555" stopOpacity="1" />{" "}
            </linearGradient>

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

          <circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#bgGradient)"
            stroke="#D4AF37"
            strokeWidth="4"
            filter="url(#buttonShadow)"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="4"
          />
          <circle cx="50" cy="35" r="25" fill="url(#highlight)" />

          <text x="50" y="55" textAnchor="middle" className="textStroke">
            {convertSoundName(note)}
          </text>
        </svg>
      </div>
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
      )}
    </>
  );
}
