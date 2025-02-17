"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * - 音量を -1 〜 +3 などの「任意の整数値」で管理
 * - 「C4 → ド」などの日本語表記モードをオン/オフ
 */
export default function SettingsPage() {
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
    <main className="p-4 text-white  min-h-screen">
      <h1 className="text-2xl mb-10">設定</h1>

      {/* ===== サウンド ===== */}
      <div className="mb-8">
        <label className="block mb-2">サウンド</label>
        <input
          type="range"
          min={-1}
          max={3}
          step="1"
          value={volumeLevel}
          onChange={handleVolumeChange}
          className="w-64 ml-5"
        />
        <span className="ml-2 text-lg">{volumeLevel}</span>
      </div>

      {/* ===== スケール ===== */}
      <div className="mb-8">
        <h2 className="mb-2">スケール</h2>
        <div className="mb-1 ml-5">
          <label className="mr-4">
            <input
              type="radio"
              name="noteLabel"
              value="alphabet"
              checked={noteLabelMode === "alphabet"}
              onChange={handleNoteLabelChange}
            />
            (C, D, E)
          </label>
        </div>
        <div className="ml-5">
          <label>
            <input
              type="radio"
              name="noteLabel"
              value="japanese"
              checked={noteLabelMode === "japanese"}
              onChange={handleNoteLabelChange}
            />
            (ド,レ,ミ)
          </label>
        </div>
      </div>
      <div>
        <Link href="/">
          <button className="
                relative px-8 py-3 text-lg font-semibold
                text-white bg-gradient-to-r from-gray-500 to-gray-700
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              ">
            戻る
          </button>
        </Link>
      </div>
    </main>
  );
}
