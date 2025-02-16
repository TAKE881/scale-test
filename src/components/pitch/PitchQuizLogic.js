// app/components/pitch/PitchQuizLogic.js
"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";

export function usePitchQuiz(totalQuestions = 4) {
  const [currentNote, setCurrentNote] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (!isQuizFinished) {
      generatePitchTrainingQuestion();
    }
  }, [isQuizFinished]);

  // --- 1) クイズ問題(4択)を作る ---
  const generatePitchTrainingQuestion = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);

    const shuffled = [...notes].sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffled.includes(randomNote)) {
      shuffled[0] = randomNote;
    }
    setOptions(shuffled.sort(() => 0.5 - Math.random()));
  };

  // --- 2) 問題の音を再生 ---
  const playNote = async () => {
    if (!currentNote) return;
    await Tone.start(); // ユーザー操作後に呼ばれるのが望ましい
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(currentNote, "8n");
  };

  // --- 3) 正解時に“ピンポン”2音を鳴らす関数 ---
  const playPinponEffect = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();

    // C5 をすぐ再生、その0.2秒後に E5 を再生
    synth.triggerAttackRelease("A#5", "8n", now);
    synth.triggerAttackRelease("F#5", "8n", now + 0.1);
  };

  // --- 4) 回答の処理 (正解なら “ピンポン” 再生 + スコア加算) ---
  const handleAnswer = (answer, index) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(index);

    setTimeout(() => {
      if (answer === currentNote) {
        // 正解 → “ピンポン”
        playPinponEffect();
        setScore((prev) => prev + 1);
      }

      if (questionNumber + 1 < totalQuestions) {
        setQuestionNumber((prev) => prev + 1);
        generatePitchTrainingQuestion();
      } else {
        setIsQuizFinished(true);
      }
      setSelectedOption(null);
      setIsAnswered(false);
    }, 500);
  };

  // --- 5) リセット ---
  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setQuestionNumber(0);
  };

  // フックから返す値
  return {
    currentNote,
    options,
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    playNote, // 問題の音を鳴らす
    handleAnswer, // 回答処理
    resetQuiz,
  };
}
