import { useState, useEffect } from 'react'

export const useVolumeControl = () => {
    // ①「現在の音量」を管理する state
    const [volume, setVolume] = useState(0);

    // ② ページのマウント時に localStorage を読み込む
    useEffect(() => {
        const savedVol = localStorage.getItem("quizVolume");
        if (savedVol !== null) {
            setVolume(Number(savedVol));
        }
    }, []);
    return {
        volume, setVolume
    };
};
