// app/hooks/pitch/PitchQuizLogic.js
"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useCorrectSound } from "./useCorrectSound";

export function usePitchQuizLogic(totalQuestions = 2) {
  const { playCorrectSound, playIncorrectSound } = useCorrectSound();

  const [pitchQuizNote, setPitchQuizNote] = useState(null);
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

  const generatePitchTrainingQuestion = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setPitchQuizNote(randomNote);

    let shuffled = [...notes].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffled.includes(randomNote)) {
      shuffled[0] = randomNote;
    }
    shuffled = shuffled.sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const playNote = async () => {
    if (!pitchQuizNote) return;
    await Tone.start();

    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(pitchQuizNote, "4n");
  };

  const handleAnswer = (answer, index) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(answer);

    setTimeout(() => {
      if (answer === pitchQuizNote) {
        playCorrectSound();
        setScore((prev) => prev + 1);
      } else {
        playIncorrectSound
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

  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setQuestionNumber(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return {
    pitchQuizNote,
    correctAnswer: pitchQuizNote,
    options,
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    playNote,
    handleAnswer,
    resetQuiz,
  };
}
