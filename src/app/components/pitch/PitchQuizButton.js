// PitchQuizButton.js (一例)
"use client";

export function PitchQuizButton({ label, value, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className="
        bg-white border border-gray-300
        shadow-md rounded-lg p-4 text-center hover:bg-gray-200
        transition-all duration-300
        m-2
      "
    >
      {label}
    </button>
  );
}
