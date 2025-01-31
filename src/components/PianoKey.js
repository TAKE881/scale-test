import React from "react"
import * as Tone from "tone";

// PianoKey: Represents one key (white or black) on the piano
// Props:
//   note (string) : e.g. "C4", "D#4"
//   type ("white" | "black") : to style the key
//   onPlay (function) : function to call when key is clicked

export function PianoKey({ note, type, onPlay }) {
  const handleClick = () => {
    onPlay(note);
  };

  return (
    <div
      className={`key ${type}`}
      onClick={handleClick}
      style={{
        width: type === "white" ? "40px" : "30px",
        height: type === "white" ? "150px" : "100px",
        backgroundColor: type === "white" ? "#fff" : "#000",
        color: type === "white" ? "#000" : "#fff",
        border: "1px solid #333",
        position: type === "black" ? "absolute" : "relative",
        marginLeft: type === "black" ? "-15px" : 0,
        zIndex: type === "black" ? 1 : 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: "10px", marginBottom: "5px" }}>{note}</span>
    </div>
  );
}
