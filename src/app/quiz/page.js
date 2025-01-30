'use client';
import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { useRouter } from 'next/navigation'; // Next.jsのルーティング用
import { motion, AnimatePresence } from 'framer-motion'; // Framer Motionをインポート

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
  const [usedScales, setUsedScales] = useState([]); // 出題済みのスケールを記録

  const router = useRouter(); // Next.jsのルーターを取得

  useEffect(() => {
    if (!isQuizFinished) generateQuestion();
  }, [isQuizFinished]);

  const generateQuestion = () => {
    // 未出題のスケールをフィルタリング
    const availableScales = scales.filter((scale) => !usedScales.includes(scale.name));

    // 未出題のスケールからランダムに選択
    const randomScale = availableScales[Math.floor(Math.random() * availableScales.length)];
    setCurrentScale(randomScale);

    // 出題済みリストに追加
    setUsedScales((prev) => [...prev, randomScale.name]);

    // 選択肢をシャッフル
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

    const speedFactor = 1.5; // 音楽の再生速度は1.5倍のまま
    const noteDuration = 0.5 / speedFactor; // 音の間隔を短縮

    currentScale.notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, '8n', Tone.now() + index * noteDuration);
    });
  };
  const [isAnswered, setIsAnswered] = useState(false); // 連打防止フラグを追加

  const handleAnswer = (answer, index) => {
    if (isAnswered) return; // すでに回答済みなら処理しない
    setIsAnswered(true); // 解答済みにする
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
          setIsAnswered(false); // 次の問題のためにフラグをリセット
    }, 500); // アニメーションの時間に合わせて調整
  };

  // クイズをリセット
  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setQuestionNumber(0);
    setUsedScales([]); // 出題済みリストをリセット
  };



  return (

    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.0 }} // アプリ全体のアニメーション速度を標準に戻す
    className="min-h-screen bg-cover bg-center bg-no-repeat dark:bg-gray-900 dark:text-white"
  >

      {isQuizFinished ? (
        <motion.main
  initial={{ y: 300, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1.0 }}
  className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
>

<h1 className="text-2xl font-bold mb-4 text-center">クイズ結果</h1>
  <p className="mb-4 text-lg text-center">スコア: {score} / {totalQuestions}</p>
  <p className="mb-8 text-lg text-center">正答率: {((score / totalQuestions) * 100).toFixed(2)}%</p>

  <div className="flex flex-col sm:flex-row gap-4 w-full">
    <button
      onClick={resetQuiz}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
    >
      もう一度プレイ
    </button>
    <button
      onClick={() => router.push('/')}
      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
    >
      トップに戻る
    </button>
  </div>
</motion.main>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={questionNumber} // 問題番号をキーとしてアニメーションをトリガー
            initial={{ opacity: 0 }} // 初期状態
            animate={{ opacity: 1 }} // 表示時のアニメーション
            exit={{ opacity: 0 }} // 画面遷移時のアニメーション
            transition={{ duration: 0.5 }} // アニメーションの速度
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
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
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option.name, index)}
                      className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ${
                        selectedOption === index ? 'selected' : ''
                      }`}
                      whileHover={{ scale: 1.02 }} // 小さな動きにして自然に
                      whileTap={{ scale: 0.98 }} // タップ時のエフェクトも最適化
                    >
                      {option.name}
                    </motion.button>
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
          </motion.main>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
