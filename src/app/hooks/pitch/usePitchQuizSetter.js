"use client"
import { useState } from "react";
import * as Tone from "tone";
// import { useVolumeControl } from "./useVolumeControl";

const NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]; // ランダムに選ぶ音

export const usePitchQuizSetter = () => {
    // const { volume, setVolume } = useVolumeControl();
    const [selectedNote, setSelectedNote] = useState(""); // ランダムで選んだ音を保存

    // 音を再生しつつ、ランダムな音を選択
    async function playRandomNote() {
        // ランダムな音を選択
        const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
        setSelectedNote(randomNote);

        // // localStorage から音量を取得
        // const savedVol = localStorage.getItem("quizVolume");
        // if (savedVol !== null) {
        //     setVolume(Number(savedVol));
        //     await new Promise((resolve) => setTimeout(resolve, 10)); // 状態更新待ち
        // }

        // Tone.js で音を再生
        await Tone.start();
        Tone.getDestination().volume.value = volume;

        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(randomNote, "8n");
    }

    return {
        playRandomNote,
        selectedNote,
    };
};
