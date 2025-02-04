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
    { note: "C4", type: "white" },
    { note: "C#4", type: "black" },
    { note: "D4", type: "white" },
    { note: "D#4", type: "black" },
    { note: "E4", type: "white" },
    { note: "F4", type: "white" },
    { note: "F#4", type: "black" },
    { note: "G4", type: "white" },
    { note: "G#4", type: "black" },
    { note: "A4", type: "white" },
    { note: "A#4", type: "black" },
    { note: "B4", type: "white" },
  ];

  // 🎶 音を鳴らす関数
  const playNote = (note) => {
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(note, "8n"); // ✅ `useRef` から `synth` を呼び出す
    }
  };

  return (
    <div
      className="piano"
      style={{
        display: "flex",
        position: "relative",
        width: "520px",
        height: "200px",
        marginBottom: "1rem",
      }}
    >
      {notes.map(({ note, type }) => (
        <PianoKey key={note} note={note} type={type} onPlay={playNote} />
      ))}
    </div>
  );
}
