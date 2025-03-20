"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { useCorrectSound } from "./useCorrectSound";

import { customSynthMap } from "@/tone/customSynthMap";

export function usePitchQuizLogic(totalQuestions = 5) {
  const { playCorrectSound, playIncorrectSound } = useCorrectSound();

  const [pitchQuizNote, setPitchQuizNote] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [bonusPoint, setBonusPoint] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [instrument, setInstrument] = useState("Synth");
  const [answerHistory, setAnswerHistory] = useState([]);

  const synthRef = useRef(null);

  useEffect(() => {
    createSynthInstance();

    return () => {
      if (typeof synthRef.current?.dispose === "function") {
        synthRef.current.dispose();
      }
    };
  }, [instrument]);

  const createSynthInstance = () => {
    if (synthRef.current?.triggerRelease) {
      synthRef.current.triggerRelease();
    }
    if (typeof synthRef.current?.dispose === "function") {
      synthRef.current.dispose();
    }

    const SynthClass = customSynthMap[instrument] || Tone.Synth;
    const instance = new SynthClass();

    const synth = instance.synth || instance;

    if (typeof synth.toDestination === "function") {
      synth.toDestination();
    }

    synthRef.current = synth;
  };

  useEffect(() => {
    if (!isQuizFinished && typeof window !== "undefined") {
      generatePitchTrainingQuestion();
    }
  }, [isQuizFinished]);

  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setBonusPoint(0);
    setQuestionNumber(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswerHistory([]);
  };

  useEffect(() => {
    console.log("🎵 pitchQuizNote が更新！！！！！！！:", pitchQuizNote);
  }, [pitchQuizNote]);

  useEffect(() => {
    console.log("📈 score state updated →", score);
  }, [score]);

  useEffect(() => {
    console.log("🎁 bonusPoint state updated →", bonusPoint);
  }, [bonusPoint]);

  const handleInstrumentToggle = (name) => {
    const newInstrument = instrument === name ? "Synth" : name;

    setInstrument(newInstrument);

    console.log(" 選択された楽器！！！！！！:", newInstrument);
  };

  const playNote = async () => {
    if (!pitchQuizNote || !synthRef.current) return;

    await Tone.start();

    synthRef.current.triggerRelease?.();

    synthRef.current.triggerAttackRelease(pitchQuizNote, "4n");
    setHasPlayed(true);
  };

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

  const handleAnswer = (answer, index) => {
    console.log("💥 handleAnswer called!", answer);

    if (isAnswered) return;

    setIsAnswered(true);

    setSelectedOption(answer);

    console.log("選択されたnote！！！！！！！！！:", answer);
    console.log("正解note！！！！！！！！！:", pitchQuizNote);
    console.log("isCorrect！！！！！！！！！:", answer === pitchQuizNote);
    console.log("hasPlayed！！！！！！！！！:", hasPlayed);

    const isCorrect = answer === pitchQuizNote;

    setAnswerHistory((prev) => [
      ...prev,
      {
        questionNumber: questionNumber + 1,
        correctAnswer: pitchQuizNote,
        selectedAnswer: answer,
        isCorrect: isCorrect,
        bonusEarned: isCorrect && !hasPlayed,
      },
    ]);

    if (isCorrect) {
      console.log("✅ 正解！hasPlayed =", hasPlayed);

      playCorrectSound();

      setScore((prev) => {
        const updated = prev + 1;
        console.log("🎯 スコア加算:", updated);
        return updated;
      });

      if (!hasPlayed) {
        setBonusPoint((prev) => {
          const updated = prev + 1;
          console.log("🎁 ボーナス加算:", updated);
          return updated;
        });
        console.log("score（リアルタイム）:", score);
      }
    } else {
      console.log("❌ 不正解");
      playIncorrectSound();
    }

    setTimeout(() => {
      if (questionNumber + 1 < totalQuestions) {
        setQuestionNumber((prev) => prev + 1);
        generatePitchTrainingQuestion();
      } else {
        setTimeout(() => {
          setIsQuizFinished(true);
        }, 100);
      }
      setSelectedOption(null);
      setIsAnswered(false);
      setHasPlayed(false);
    }, 500);
  };

  return {
    pitchQuizNote,
    correctAnswer: pitchQuizNote,
    options,
    score,
    bonusPoint,
    questionNumber,
    totalQuestions,
    isQuizFinished,
    selectedOption,
    instrument,
    setInstrument,
    handleInstrumentToggle,
    playNote,
    handleAnswer,
    resetQuiz,
    hasPlayed,
    setHasPlayed,
    answerHistory,
  };
}
