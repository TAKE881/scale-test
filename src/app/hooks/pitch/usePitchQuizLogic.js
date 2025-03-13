// app/hooks/pitch/PitchQuizLogic.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { useCorrectSound } from "./useCorrectSound";
// import "@/tone/setupCustomSynths";
import { customSynthMap } from "@/tone/customSynthMap";

export function usePitchQuizLogic(totalQuestions = 4) {
  const { playCorrectSound, playIncorrectSound } = useCorrectSound();

  const [pitchQuizNote, setPitchQuizNote] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [instrument, setInstrument] = useState("Synth");

  // ✅ シンセを保持するuseRef（Synthインスタンスを再利用）
  const synthRef = useRef(null);

  useEffect(() => {
    createSynthInstance();

    return () => {
      // ✅ 楽器切り替え時にVoiceSynthを適切に解放
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

    // ✅ synth を明確にここで定義する
    const synth = instance.synth || instance;

    // ✅ Tone.Synth系のみ toDestination() を実行
    if (typeof synth.toDestination === "function") {
      synth.toDestination();
    }

    // ✅ synthRefに格納
    synthRef.current = synth;
  };

  {
    /*============================================================
                                    出題
            =============================================================== */
  }

  useEffect(() => {
    if (!isQuizFinished) {
      generatePitchTrainingQuestion();
    }
  }, [isQuizFinished]);

  const resetQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
    setQuestionNumber(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  {
    /*============================================================
                                    再生ボタン
            =============================================================== */
  }

  // 再生ボタンロジック
  useEffect(() => {
    console.log("🎵 pitchQuizNote が更新！！！！！！！:", pitchQuizNote);
  }, [pitchQuizNote]);

  const handleInstrumentToggle = (name) => {
    const newInstrument = instrument === name ? "Synth" : name;
    setInstrument(newInstrument);
    console.log(" 選択された楽器！！！！！！:", newInstrument);
    // alert(` 現在の楽器！！！！！！: ${newInstrument}`);
  };

  const playNote = async () => {
    if (!pitchQuizNote || !synthRef.current) return;
    await Tone.start();

    // ✅ 以前の音が残らないようにする
    synthRef.current.triggerRelease?.();

    synthRef.current.triggerAttackRelease(pitchQuizNote, "4n");
  };

  const generatePitchTrainingQuestion = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setPitchQuizNote(randomNote);

    {
      /*============================================================
                                    選択ボタン
            =============================================================== */
    }

    let shuffled = [...notes].sort(() => Math.random() - 0.5).slice(0, 4);
    // ランダムノートの有無により、ランダムノートを選択肢に追加
    if (!shuffled.includes(randomNote)) {
      shuffled[0] = randomNote;
    }
    // ランダムノートが追加された場合またシャッフルされる
    shuffled = shuffled.sort(() => Math.random() - 0.5);
    // 配列を設定＆保存した
    setOptions(shuffled);
    // ユーザーの選択履歴をリセット
    setSelectedOption(null);
    // 答えた後、答えていない状態に戻す
    setIsAnswered(false);
  };
  // 選択肢をクリックしたときの起こるイベント
  const handleAnswer = (answer, index) => {
    // 連打防止
    if (isAnswered) return;
    // もう選びました
    setIsAnswered(true);
    // どのボタンを選択したか
    setSelectedOption(answer);

    {
      /*============================================================
                                    画面効果と制御
            =============================================================== */
    }

    // コレクトサウンドとインコレクトサウンドの設定
    if (answer === pitchQuizNote) {
      playCorrectSound();
      setScore((prev) => prev + 1);
    } else {
      playIncorrectSound();
    }
    {
      /*============================================================
                                    次の問題
            =============================================================== */
    }
    // 実行を遅らせる関数
    setTimeout(() => {
      // 次の問題に進むか、クイズ終了か？
      if (questionNumber + 1 < totalQuestions) {
        setQuestionNumber((prev) => prev + 1);
        generatePitchTrainingQuestion();
      } else {
        setIsQuizFinished(true);
      }
      // 選択履歴削除
      setSelectedOption(null);
      // 1問ごとにユーザーが1回選んだら true次の問題が出たらfalse に戻す
      setIsAnswered(false);
    }, 500);
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
    instrument,
    setInstrument,
    handleInstrumentToggle,
    playNote,
    handleAnswer,
    resetQuiz,
  };
}
