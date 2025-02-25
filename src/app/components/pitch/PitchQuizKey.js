import React from "react";

export function PitchQuizKey({ note, type, onPlay }) {
  const handleClick = () => {
    if (onPlay) {
      onPlay(note);
    }
  };

  return (
    <div
      className={`
        key
        ${type === "white"
          ? "w-10 h-20 bg-gradient-to-b from-white to-gray-300 text-black"
          : "w-12 h-20 bg-white text-black -ml-4 z-20"
        }
        border border-black
        rounded-md
        shadow-lg
        transition-transform
        ease-in-out
        duration-200
        transform
        active:translate-y-1
        cursor-pointer
        flex
        relative
        overflow-hidden
      `}
      onClick={handleClick}
    >
      {type === "white" && (
        <div className="absolute top-0 left-0 w-full h-5/6 bg-white bg-opacity-80 pointer-events-none" />
      )}
      <span className="text-xs mb-1 z-10">{note}</span>
    </div>
  );
}
