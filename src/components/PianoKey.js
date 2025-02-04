import React from "react";

export function PianoKey({ note, type, onPlay }) {
  const handleClick = () => {
    if (onPlay) {
      onPlay(note);
    }
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
        marginLeft: type === "black" ? "-15px" : "0",
        zIndex: type === "black" ? 2 : 1, // ✅ 黒鍵を前面に表示
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      <span style={{ fontSize: "12px", marginBottom: "5px" }}>{note}</span>
    </div>
  );
}
