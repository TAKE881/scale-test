"use client";

import React from "react";

// スケールクイズ用のボタン出すやつ（再生ボタンだけのシンプル版）
export function ScaleQuizSetter({ currentScale, playScaleNotes }) {
  // currentScaleがまだ取れてないときの表示（保険）
  if (!currentScale) {
    return <div className="text-white">Loading scale...</div>;
  }

  return (
    // ボタンとスケール名を中央寄せで出してる
    <div className="flex flex-col items-center mt-4">
      {/* スケール名の表示（今どれの問題か） */}
      <p className="mb-2 text-white">現在のスケール: {currentScale.name}</p>

      {/* 再生ボタン。押すとスケール音流す */}
      <button
        onClick={playScaleNotes}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        スケールを再生
      </button>
    </div>
  );
}
