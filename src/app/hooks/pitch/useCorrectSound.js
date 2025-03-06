
import { useCallback } from 'react';
import * as Tone from "tone";


export const useCorrectSound = () => {
    const playCorrectSound = useCallback(async () => {
        await Tone.start();
        const synth = new Tone.Synth().toDestination();
        const now = Tone.now();
        synth.triggerAttackRelease("A#5", "8n", now);
        synth.triggerAttackRelease("F#5", "8n", now + 0.1);
    }, []);

    const playIncorrectSound = useCallback(async () => {
        await Tone.start();
        const synth = new Tone.Synth().toDestination();
        const now = Tone.now();
        synth.triggerAttackRelease("C3", "8n", now);
        synth.triggerAttackRelease("C3", "8n", now + 0.1);
    }, []);
    return {
        playCorrectSound,
        playIncorrectSound
    };
};
