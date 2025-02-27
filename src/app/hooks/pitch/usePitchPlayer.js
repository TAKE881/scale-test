import { useState, useEffect } from "react";
import { Tone } from "tone/build/esm/core/Tone";
import { useVolumeControl } from "./useVolumeControl";

export const usePitchPlayer = () => {
    const { volume, setVolume } = useVolumeControl();
    // ③ 再生ボタン押下時の処理 (音量再取得 & 音再生)
    async function handlePlayNote(C4) {
        // 再度 localStorage から読み込み (設定ページから戻ってきた直後など想定)
        const savedVol = localStorage.getItem("quizVolume");
        if (savedVol !== null) {
            setVolume(Number(savedVol));
        }
        await Tone.start();
        Tone.getDestination().volume.value = volume;
        const synth = new Tone.Synth().toDestination();
        // synth.triggerAttackRelease("C4", "8n");
        synth.triggerAttackRelease(note, "8n");
    }
    return {
        handlePlayNote
    };
};
