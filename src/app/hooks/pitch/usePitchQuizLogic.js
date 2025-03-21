"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { useCorrectSound } from "./useCorrectSound"; // ←SE用のhook

import { customSynthMap } from "@/tone/customSynthMap";

//  ピッチクイズのメインロジック（状態管理〜音再生〜）
export function usePitchQuizLogic(totalQuestions = 5) {
  // 効果音のhook呼び出し（正解/不正解）
  const { playCorrectSound, playIncorrectSound } = useCorrectSound();


  const [pitchQuizNote, setPitchQuizNote] = useState(null);  // 出題された音
  const [options, setOptions] = useState([]);  // 選択肢（4択）
  const [score, setScore] = useState(0);  // スコア（正解数）
  const [bonusPoint, setBonusPoint] = useState(0);  // ボーナスポイント（音聞かずに正解したら+1）
  const [hasPlayed, setHasPlayed] = useState(false);  // 音を再生したかどうか
  const [questionNumber, setQuestionNumber] = useState(0);  // 今何問目
  const [isQuizFinished, setIsQuizFinished] = useState(false);  // クイズ終わったか
  const [selectedOption, setSelectedOption] = useState(null);  // 選んだ選択肢
  const [isAnswered, setIsAnswered] = useState(false);  // 回答済みフラグ
  const [instrument, setInstrument] = useState("Synth");  // 選んでる楽器（デフォはSynth）
  const [answerHistory, setAnswerHistory] = useState([]);  // 解答履歴（あとで詳細画面で使う）
  const synthRef = useRef(null);  // 現在のsynth（Toneインスタンス）をrefで保持

  // 楽器が変わったら synth 作り直し
  useEffect(() => {
    createSynthInstance();

    return () => {
      // synth使い終わったら破棄
      if (typeof synthRef.current?.dispose === "function") {
        synthRef.current.dispose();
      }
    };
  }, [instrument]);

  //  synth作成処理（customSynthMapにあるクラスを使う）
  const createSynthInstance = () => {
    // 一応前のsynth止めとく
    if (synthRef.current?.triggerRelease) {
      synthRef.current.triggerRelease();
    }
    if (typeof synthRef.current?.dispose === "function") {
      synthRef.current.dispose();
    }

    // 楽器がcustomにあればそっち使う、なければ普通のSynth
    const SynthClass = customSynthMap[instrument] || Tone.Synth;
    const instance = new SynthClass();

    // customSynthはsynthプロパティに包んでることがあるので分岐
    const synth = instance.synth || instance;

    // 出力先セット
    if (typeof synth.toDestination === "function") {
      synth.toDestination();
    }

    synthRef.current = synth;
  };

  // クイズ開始時（orリセット後）に問題生成
  useEffect(() => {
    if (!isQuizFinished && typeof window !== "undefined") {
      generatePitchTrainingQuestion();
    }
  }, [isQuizFinished]);

  // クイズリセット（状態を新規に戻す）
  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setBonusPoint(0);
    setQuestionNumber(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswerHistory([]);
  };

  // デバッグ
  useEffect(() => {
    console.log(" pitchQuizNote が更新！！！！！！！:", pitchQuizNote);
  }, [pitchQuizNote]);

  useEffect(() => {
    console.log(" score state updated →", score);
  }, [score]);

  useEffect(() => {
    console.log(" bonusPoint state updated →", bonusPoint);
  }, [bonusPoint]);

  //  楽器変更のトグル（同じの押したら戻る）
  const handleInstrumentToggle = (name) => {
    const newInstrument = instrument === name ? "Synth" : name;
    setInstrument(newInstrument);
    console.log(" 選択された楽器！！！！！！:", newInstrument);
  };

  //  音を再生する関数（Note再生だけ）
  const playNote = async () => {
    if (!pitchQuizNote || !synthRef.current) return;

    await Tone.start(); // 定型分

    // 一応前の音止めとく
    synthRef.current.triggerRelease?.();

    synthRef.current.triggerAttackRelease(pitchQuizNote, "4n");
    setHasPlayed(true);
  };

  // 出題のランダムロジック（問題と選択肢セット）
  const generatePitchTrainingQuestion = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setPitchQuizNote(randomNote);

    // シャッフルして4つ選ぶ
    let shuffled = [...notes].sort(() => Math.random() - 0.5).slice(0, 4);

    // 正解が入ってなかったらねじ込む
    if (!shuffled.includes(randomNote)) {
      shuffled[0] = randomNote;
    }

    // 再シャッフル（選択肢の位置ランダムに）
    shuffled = shuffled.sort(() => Math.random() - 0.5);

    setOptions(shuffled);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  //  回答処理（選択肢タップ時）
  const handleAnswer = (answer, index) => {
    console.log(" handleAnswer called!", answer);

    if (isAnswered) return; // 多重回答防止

    setIsAnswered(true);
    setSelectedOption(answer);

    const isCorrect = answer === pitchQuizNote;

    // 解答履歴にpush（正誤＋ボーナスも記録）
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
      console.log(" 正解！hasPlayed =", hasPlayed);
      playCorrectSound();

      // スコア加算
      setScore((prev) => {
        const updated = prev + 1;
        console.log(" スコア加算:", updated);
        return updated;
      });

      // 再生してなかったらボーナス
      if (!hasPlayed) {
        setBonusPoint((prev) => {
          const updated = prev + 1;
          console.log(" ボーナス加算:", updated);
          return updated;
        });
      }
    } else {
      console.log(" 不正解");
      playIncorrectSound();
    }

    //  次の問題へorクイズ終了
    setTimeout(() => {
      if (questionNumber + 1 < totalQuestions) {
        setQuestionNumber((prev) => prev + 1);
        generatePitchTrainingQuestion();
      } else {
        setTimeout(() => {
          setIsQuizFinished(true);
        }, 100);
      }

      // 状態リセット（次問用）
      setSelectedOption(null);
      setIsAnswered(false);
      setHasPlayed(false);
    }, 500);
  };

  //  外部で使うやつ全部return
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
