// components/scales/ScaleQuizPlayer.js
"use client";

import React from "react";

export function ScaleQuizPlayer({ currentScale, playScaleNotes }) {
  if (!currentScale) {
    return <div className="text-white">Loading scale...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mb-2 text-white">現在のスケール: {currentScale.name}</p>
      <button
        onClick={playScaleNotes}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        スケールを再生
      </button>
    </div>
  );
}
