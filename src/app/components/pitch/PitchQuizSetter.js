"use client";

import React from "react";
import { PitchQuizButton } from "./PitchQuizButton";

// ✍️ 選択肢を表示するやつ（クイズ問題のボタン並べる）
export function PitchQuizSetter({ options = [], handleAnswer }) {
  // optionsが空だったらローディング表示（保険）
  if (options.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex gap-4">
      {/* 選択肢の分だけボタン生成（noteごと） */}
      {options.map((note, idx) => (
        <PitchQuizButton
          key={note} // 一応noteをキーにしてる（重複しない前提）
          note={note} // 表示する音名
          type="white"
          onPlay={() => handleAnswer(note, idx)} // 押されたら答え処理
        />
      ))}
    </div>
  );
}
