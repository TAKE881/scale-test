"use client"; // ✅ クライアントコンポーネントに指定

import React, { useEffect, useRef } from "react";
import * as Tone from "tone"; // ✅ `Tone.js` をインポート
import { PianoKey } from "./PianoKey";

// 🎹 PianoKeyboard: ピアノのキーボード全体
export function PianoKeyboard() {
  const synthRef = useRef(null); // ✅ `synth` を `useRef` で管理

  useEffect(() => {
    Tone.start(); // ✅ ユーザーアクション後に `AudioContext` を開始
    synthRef.current = new Tone.Synth().toDestination(); // ✅ `useEffect` 内で `synth` を作成
  }, []);

  // 🎵 一オクターブの音 (C4-B4)
  const notes = [
    { note: "ド", type: "white" },
    { note: "レ", type: "white" },
    { note: "ミ", type: "white" },
    { note: "ファ", type: "white" },
    { note: "ソ", type: "white" },
    { note: "ラ", type: "white" },
    { note: "シ", type: "white" },
  ];

  // 🎶 音を鳴らす関数
  const playNote = (note) => {
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(note, "8n"); // ✅ `useRef` から `synth` を呼び出す
    }
  };

  return (
    <div className="flex relative w-[520px] h-[200px] mb-4">
      {notes.map(({ note, type }) => (
        <PianoKey key={note} note={note} type={type} onPlay={playNote} />
      ))}
    </div>
  );
}
