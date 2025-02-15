"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";


export function usePitchTrainingQuiz(totalQuestions = 4) {
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

    const shuffled = [...notes].sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffled.includes(randomNote)) {
      shuffled[0] = randomNote;
    }
    setOptions(shuffled.sort(() => 0.5 - Math.random()));
  };


  const playNote = async () => {
    if (!currentNote) return;
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(currentNote, "8n");
  };


  const handleAnswer = (answer, index) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(index);
    setTimeout(() => {
      if (answer === currentNote) {
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
  };

  return {
    currentNote,
    options,
    score,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    generatePitchTrainingQuestion,
    playNote,
    handleAnswer,
    resetQuiz,
  };
}
