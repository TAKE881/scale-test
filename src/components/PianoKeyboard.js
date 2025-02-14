"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { PianoKey } from "./PianoKey";

export function PianoKeyboard() {
  const synthRef = useRef(null);
  const [randomNotes, setRandomNotes] = useState([]);

  useEffect(() => {
    Tone.start();
    synthRef.current = new Tone.Synth().toDestination();

    //  ランダム4
    const shuffled = notes.sort(() => 0.5 - Math.random()); // シャッフル
    setRandomNotes(shuffled.slice(0, 4)); // 最初の4
  }, []);

  const notes = [
    { note: "C4", label: "ド", type: "white" },
    { note: "D4", label: "レ", type: "white" },
    { note: "E4", label: "ミ", type: "white" },
    { note: "F4", label: "ファ", type: "white" },
    { note: "G4", label: "ソ", type: "white" },
    { note: "A4", label: "ラ", type: "white" },
    { note: "B4", label: "シ", type: "white" },
  ];

  const playNote = (note) => {
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(note, "8n");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex relative bg-gray-900 p-4 rounded-lg mt-[-250px] gap-5">
        {randomNotes.map(({ note, label, type }) => (
          <PianoKey key={note} note={label} type={type} onPlay={() => playNote(note)} />
        ))}
      </div>
    </div>
  );
}
