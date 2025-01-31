import React from "react"
import { PianoKey } from "./PianoKey";

// PianoKeyboard: Entire keyboard component
// Schedules note playback using Tone.js
// Renders multiple PianoKey components

export function PianoKeyboard() {
  const synth = new Tone.Synth().toDestination();

  // One octave worth of notes (C4-B4)
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

  const playNote = async (note) => {
    await Tone.start(); // iOS等では音を出す前にユーザーアクション必要
    synth.triggerAttackRelease(note, "8n");
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
        <PianoKey
          key={note}
          note={note}
          type={type}
          onPlay={playNote}
        />
      ))}
    </div>
  );
}
