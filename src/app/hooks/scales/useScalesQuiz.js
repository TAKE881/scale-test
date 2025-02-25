"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const scales = [
    {
        name: "メジャースケール",
        notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
    },
    {
        name: "ナチュラルマイナー",
        notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"],
    },
    {
        name: "ハーモニックマイナー",
        notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4"],
    },
    {
        name: "メロディックマイナー",
        notes: ["A3", "B3", "C4", "D4", "E4", "F#4", "G#4", "A4"],
    },
    {
        name: "メジャーペンタトニック",
        notes: ["C4", "D4", "E4", "G4", "A4", "C5"],
    },
    {
        name: "マイナーペンタトニック",
        notes: ["A3", "C4", "D4", "E4", "G4", "A4"],
    },
    {
        name: "ブルーススケール",
        notes: ["A3", "C4", "D4", "D#4", "E4", "G4", "A4"],
    },
    { name: "ドリアン", notes: ["D4", "E4", "F4", "G4", "A4", "B4", "C4", "D5"] },
    {
        name: "リディアン",
        notes: ["F4", "G4", "A4", "B4", "C4", "D4", "E4", "F5"],
    },
    {
        name: "ミクソリディアン",
        notes: ["G4", "A4", "B4", "C4", "D4", "E4", "F4", "G5"],
    },
];

export function useScaleQuiz(totalQuestions = 4) {
    const [currentScale, setCurrentScale] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [usedScales, setUsedScales] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        if (!isQuizFinished) {
            generateScaleQuestion();
        }
    }, [isQuizFinished]);

    const generateScaleQuestion = () => {
        const availableScales = scales.filter((s) => !usedScales.includes(s.name));
        if (availableScales.length === 0) {
            setIsQuizFinished(true);
            return;
        }

        const randomScale =
            availableScales[Math.floor(Math.random() * availableScales.length)];
        setCurrentScale(randomScale);
        setUsedScales((prev) => [...prev, randomScale.name]);

        const shuffled = [...scales].sort(() => 0.5 - Math.random()).slice(0, 4);
        if (!shuffled.includes(randomScale)) {
            shuffled[0] = randomScale;
        }
        setOptions(shuffled.sort(() => 0.5 - Math.random()));
    };

    const playScaleNotes = async () => {
        if (!currentScale) return;
        await Tone.start();
        const synth = new Tone.Synth().toDestination();

        const speedFactor = 1.5;
        const noteDuration = 0.5 / speedFactor;

        currentScale.notes.forEach((note, index) => {
            synth.triggerAttackRelease(note, "8n", Tone.now() + index * noteDuration);
        });
    };

    const handleAnswer = (answer, index) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedOption(index);
        setTimeout(() => {
            if (answer === currentScale.name) {
                setScore((prev) => prev + 1);
            }
            if (questionNumber + 1 < totalQuestions) {
                setQuestionNumber((prev) => prev + 1);
                generateScaleQuestion();
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
        setUsedScales([]);
    };

    return {
        currentScale,
        options,
        score,
        questionNumber,
        totalQuestions,
        isQuizFinished,
        selectedOption,
        generateScaleQuestion,
        playScaleNotes,
        handleAnswer,
        resetQuiz,
    };
}
