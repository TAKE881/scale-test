"use client";
import { useState, useEffect } from "react";

/**
 * - 音量を -1 〜 +3 などの「任意の整数値」で管理
 * - 「C4 → ド」などの日本語表記モードをオン/オフ
 */
export default function SettingPage() {
  // 音量を -1 ~ +3 の範囲にする例
  const [volumeLevel, setVolumeLevel] = useState(0);

  // 英語表記 / 日本語表記 のモード切替
  const [noteLabelMode, setNoteLabelMode] = useState("alphabet");
  // 例: "alphabet" or "japanese" で管理

  useEffect(() => {
    // マウント時に保存された音量・表記モードを読み出す
    const savedVolume = localStorage.getItem("quizVolumeLevel");
    if (savedVolume !== null) {
      setVolumeLevel(Number(savedVolume));
    }

    const savedLabelMode = localStorage.getItem("noteLabelMode");
    if (savedLabelMode !== null) {
      setNoteLabelMode(savedLabelMode);
    }
  }, []);

  // 音量スライダーの変更 (例: -1 ~ +3)
  function handleVolumeChange(e) {
    const val = Number(e.target.value);
    setVolumeLevel(val);
    localStorage.setItem("quizVolumeLevel", val);
  }

  // 表記モードの変更
  function handleNoteLabelChange(e) {
    const mode = e.target.value;
    setNoteLabelMode(mode);
    localStorage.setItem("noteLabelMode", mode);
  }

  return (
    <main className="p-4 text-white bg-gray-800 min-h-screen">
      <h1 className="text-2xl mb-4">設定ページ</h1>

      {/* ===== 音量設定 ===== */}
      <div className="mb-8">
        <label className="block mb-2">音量 (最小: -1 〜 最大: +3):</label>
        <input
          type="range"
          min={-1}
          max={3}
          step="1"
          value={volumeLevel}
          onChange={handleVolumeChange}
          className="w-64"
        />
        <span className="ml-2 text-lg">{volumeLevel}</span>
      </div>

      {/* ===== ノート表記設定 ===== */}
      <div className="mb-8">
        <h2 className="mb-2">音名の表記:</h2>
        <label className="mr-4">
          <input
            type="radio"
            name="noteLabel"
            value="alphabet"
            checked={noteLabelMode === "alphabet"}
            onChange={handleNoteLabelChange}
          />
          英語 (C, D, E...)
        </label>
        <label>
          <input
            type="radio"
            name="noteLabel"
            value="japanese"
            checked={noteLabelMode === "japanese"}
            onChange={handleNoteLabelChange}
          />
          日本語 (ド, レ, ミ...)
        </label>
      </div>
    </main>
  );
}
