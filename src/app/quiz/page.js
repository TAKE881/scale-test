'use client';
import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { useRouter } from 'next/navigation'; // Next.jsのルーティング用

// スケールのリスト
const scales = [
  { name: 'メジャースケール', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] },
  { name: 'ナチュラルマイナー', notes: ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'] },
  { name: 'ハーモニックマイナー', notes: ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G#4', 'A4'] },
  { name: 'メロディックマイナー', notes: ['A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G#4', 'A4'] },
  { name: 'メジャーペンタトニック', notes: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'] },
  { name: 'マイナーペンタトニック', notes: ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'] },
  { name: 'ブルーススケール', notes: ['A3', 'C4', 'D4', 'D#4', 'E4', 'G4', 'A4'] },
  { name: 'ドリアン', notes: ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C4', 'D5'] },
  { name: 'リディアン', notes: ['F4', 'G4', 'A4', 'B4', 'C4', 'D4', 'E4', 'F5'] },
  { name: 'ミクソリディアン', notes: ['G4', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G5'] },
];

export default function QuizPage() {
  const [currentScale, setCurrentScale] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const totalQuestions = 4;
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const router = useRouter(); // Next.jsのルーターを取得

  useEffect(() => {
    if (!isQuizFinished) generateQuestion();
  }, [isQuizFinished]);

  const generateQuestion = () => {
    const randomScale = scales[Math.floor(Math.random() * scales.length)];
    setCurrentScale(randomScale);

    const shuffled = [...scales].sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffled.includes(randomScale)) {
      shuffled[0] = randomScale;
    }
    setOptions(shuffled.sort(() => 0.5 - Math.random()));
  };

  const playScale = async () => {
    if (!currentScale) return;
    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    currentScale.notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, '8n', Tone.now() + index * 0.5);
    });
  };

  const handleAnswer = (answer, index) => {
    setSelectedOption(index);
    setTimeout(() => {
      if (answer === currentScale.name) {
        setScore((prev) => prev + 1);
      }
      if (questionNumber + 1 < totalQuestions) {
        setQuestionNumber((prev) => prev + 1);
        generateQuestion();
      } else {
        setIsQuizFinished(true);
      }
      setSelectedOption(null); // アニメーション後に状態をリセット
    }, 500); // アニメーションの時間に合わせて調整
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat dark:bg-gray-900 dark:text-white"
      style={{
        backgroundImage: "url('/andrik-langfield-ITQVgbjG-q4-unsplash.jpg')", // 背景画像URLを指定
      }}
    >
      {isQuizFinished ? (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">クイズ結果</h1>
          <p className="mb-4 text-lg">スコア: {score} / {totalQuestions}</p>
          <p className="mb-8 text-lg">正答率: {((score / totalQuestions) * 100).toFixed(2)}%</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsQuizFinished(false);
                setScore(0);
                setQuestionNumber(0);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              もう一度プレイ
            </button>
            <button
              onClick={() => router.push('/')} // トップ画面に遷移
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              トップに戻る
            </button>
          </div>
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">スケールクイズ</h1>
          {currentScale && (
            <>
              <p className="mb-4 text-lg text-center">スコア: {score}</p>
              <p className="mb-4 text-lg text-center">問題: {questionNumber + 1} / {totalQuestions}</p>
              <button
                onClick={playScale}
                className="flex items-center justify-center bg-[#1DB954] hover:bg-[#1ED760] text-white rounded-full w-16 h-16 shadow-md transition-colors duration-200"
                aria-label="再生"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-play-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                </svg>
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.name, index)}
                    className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ${
                      selectedOption === index ? 'selected' : ''
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => router.push('/')} // トップ画面に遷移
                className="mt-8 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
              >
                トップに戻る
              </button>
            </>
          )}
        </main>
      )}
    </div>
  );
}
