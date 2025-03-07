import { useState } from "react";
import * as Tone from "tone";

const NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

export const usePitchQuizSetter = () => {
    const [selectedNote, setSelectedNote] = useState("");

    function setRandomNote() {
        if (!selectedNote) {
            const newNote = NOTES[Math.floor(Math.random() * NOTES.length)];

            setSelectedNote(newNote);
            console.log("選択された音", newNote);
        }
    }

    async function playSelectedNote() {
        if (!selectedNote) {
            console.warn("⚠️ selectedNote が設定されていません！");
            return;
        }

        console.log("🎵 再生する音:", selectedNote);
        await Tone.start();
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(selectedNote, "8n");
    }

    return {
        setRandomNote,
        playSelectedNote,
        selectedNote,
    };
};
