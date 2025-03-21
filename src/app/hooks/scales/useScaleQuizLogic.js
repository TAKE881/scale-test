"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//  スケール一覧
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

export function useScaleQuizLogic(totalQuestions = 4) {

    const [currentScale, setCurrentScale] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [usedScales, setUsedScales] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    // クイズ開始時・リセット時に新しい問題出す
    useEffect(() => {
        if (!isQuizFinished) {
            generateScaleQuestion();
        }
    }, [isQuizFinished]);

    // 新しいスケール問題を出題（かぶり防止あり）
    const generateScaleQuestion = () => {
        const availableScales = scales.filter((s) => !usedScales.includes(s.name));
        if (availableScales.length === 0) {
            // もう出せるスケールなかったら終わり
            setIsQuizFinished(true);
            return;
        }

        // ランダムで1つ選んで出題スケールに
        const randomScale =
            availableScales[Math.floor(Math.random() * availableScales.length)];
        setCurrentScale(randomScale);
        setUsedScales((prev) => [...prev, randomScale.name]);

        // 選択肢を4つに絞ってランダム配置
        const shuffled = [...scales].sort(() => 0.5 - Math.random()).slice(0, 4);
        if (!shuffled.includes(randomScale)) {
            shuffled[0] = randomScale; // 確実に正解を含める（保険）
        }
        setOptions(shuffled.sort(() => 0.5 - Math.random()));
    };

    //  スケールを順に再生
    const playScaleNotes = async () => {
        if (!currentScale) return;
        await Tone.start();
        const synth = new Tone.Synth().toDestination();

        const speedFactor = 1.5; // ← ここでテンポ調整してる（好みでいじれる）
        const noteDuration = 0.5 / speedFactor;

        currentScale.notes.forEach((note, index) => {
            synth.triggerAttackRelease(note, "8n", Tone.now() + index * noteDuration);
        });
    };

    // ユーザーが選択したときの処理
    const handleAnswer = (answer, index) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedOption(index);

        setTimeout(() => {
            if (answer === currentScale.name) {
                setScore((prev) => prev + 1); // 正解ならスコア加算
            }

            if (questionNumber + 1 < totalQuestions) {
                setQuestionNumber((prev) => prev + 1);
                generateScaleQuestion();
            } else {
                setIsQuizFinished(true); // ラスト問題だったら終了
            }

            setSelectedOption(null);
            setIsAnswered(false);
        }, 500);
    };

    //  クイズ初期化（再プレイ用）
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
