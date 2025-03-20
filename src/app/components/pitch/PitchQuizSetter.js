"use client";

import React from "react";
import { PitchQuizButton } from "./PitchQuizButton";

export function PitchQuizSetter({ options = [], handleAnswer }) {
  if (options.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex gap-4">
      {options.map((note, idx) => (
        <PitchQuizButton
          key={note}
          note={note}
          type="white"
          onPlay={() => handleAnswer(note, idx)}
        />
      ))}
    </div>
  );
}
