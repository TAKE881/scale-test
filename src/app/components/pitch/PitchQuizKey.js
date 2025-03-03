"use client"

export function PitchQuizKey({ note, type, onClick }) {
  console.log("PitchQuizKey に渡された note:", note);

  const handleClick = () => {
    if (onClick) {
      onClick(note);
    }
  };

  return (
    <div
      className="
    w-10 h-20 bg-gradient-to-b from-white to-gray-300 text-black
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
    items-center
    justify-center
  "
      onClick={handleClick}
    >
      <span className="text-xs text-center text-black mb-1 z-10">{note}</span>
    </div>
  );
}
