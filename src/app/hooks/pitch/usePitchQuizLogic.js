// app/hooks/pitch/PitchQuizLogic.js
"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";

export function usePitchQuizLogic(totalQuestions = 2) {
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

  const generatePitchTrainingQuestion = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);

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
    if (!currentNote) return;
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(currentNote, "8n");
  };

  const playPinponEffect = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("A#5", "8n", now);
    synth.triggerAttackRelease("F#5", "8n", now + 0.1);
  };

  const handleAnswer = (answer, index) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(answer);

    setTimeout(() => {
      if (answer === currentNote) {
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

  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setQuestionNumber(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return {
    currentNote,
    correctAnswer: currentNote,
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
