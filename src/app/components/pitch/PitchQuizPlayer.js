// app/components/pitch/PitchQuizPlayer.js
"use client";

import React from "react";
import { PitchQuizKey } from "./PitchQuizKey";

/**
 * props:
 *   options: string[]  // 例: ["C4", "E4", "G4", "A4"] など4つ
 *   handleAnswer(note) // ユーザーが選んだ音を親に伝える
 */
export function PitchQuizPlayer({ options = [], handleAnswer }) {
  if (options.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  // options を "ド", "レ" 表記に変換したい場合はここで変換も可
  return (
    <div className="flex gap-4">
      {options.map((note, idx) => (
        <PitchQuizKey
          key={note}
          note={note}
          type="white"
          onPlay={() => handleAnswer(note, idx)}
        />
      ))}
    </div>
  );
}
