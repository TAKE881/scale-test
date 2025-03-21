"use client";

import SettingToneSlider from "@/app/components/setting/SettingToneSlider";
import { useState, useEffect } from "react";
import Link from "next/link";

//  設定ページ（スケール表示切替とかボリュームとか）
export default function SettingsPage() {
  function handleVolumeChange(e) {
    const val = Number(e.target.value);
    setVolumeLevel(val);
    localStorage.setItem("quizVolumeLevel", val);
  }

  return (
    <main
      className="text-gray-600 flex flex-col items-center
    justify-center h-screen text-center text-stroke-sm text-stroke-white"
    >
      {/*  ページタイトル */}
      <h1 className="text-2xl mb-10">設定</h1>

      <div></div>

      {/*  表示ラベル（音名）の選択 */}
      <div className="mb-8">
        <h2 className="mb-2 text-stroke-sm text-stroke-gray-300">スケール</h2>
        <div className="mb-1">
          <label className=" text-stroke-sm text-stroke-gray-300">
            <input type="radio" name="noteLabel" value="alphabet" />
            (C, D, E)
          </label>
        </div>
        <div className="">
          <label>
            <input type="radio" name="noteLabel" value="japanese" />
            (ド,レ,ミ)
          </label>
        </div>
      </div>

      {/*  戻るボタン（モードセレクトへ） */}
      <div className="">
        <Link href="/mode-select">
          <button
            className="
                relative px-7 py-2 mb-6 text-lg
                text-white bg-gradient-to-r from-gray-500 to-gray-700
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
          >
            戻る
          </button>
        </Link>
      </div>

      {/*  タイトル画面に戻るボタン */}
      <div className="">
        <Link href="/">
          <button
            className="
                relative px-3 py-1 text-sm text-white bg-gradient-to-r from-gray-500 to-gray-700
                rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                border border-white border-opacity-30 hover:border-opacity-60
                hover:scale-105
                before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              "
          >
            タイトル
          </button>
        </Link>
      </div>
    </main>
  );
}
