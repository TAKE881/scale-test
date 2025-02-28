// "use client";

// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
// import * as Tone from 'tone';

// // SSRを無効化してクライアント側でのみ実行
// const DynamicSEPlayer = dynamic(
//     () => Promise.resolve(SEPlayer),
//     { ssr: false, loading: () => <p>読み込み中...</p> }
// );

// export default function IndoorOutdoorSEPage() {
//     return <DynamicSEPlayer />;
// }

// const SEPlayer = () => {
//     const [audioStarted, setAudioStarted] = useState(false);
//     const [hoveredButton, setHoveredButton] = useState(null);

//     const handleEnableAudio = async () => {
//         await Tone.start();
//         setAudioStarted(true);
//     };

//     // 🔊 音を鳴らす関数（Tone.js）
//     const playBeep = (freq) => {
//         const synth = new Tone.Synth().toDestination();
//         synth.triggerAttackRelease(freq, "0.5s");
//     };

//     return (
//         <div style={{
//             padding: '2rem',
//             maxWidth: '1200px',
//             margin: '0 auto',
//             backgroundColor: '#f5f5f5',
//             minHeight: '100vh'
//         }}>
//             <h1 style={{
//                 textAlign: 'center',
//                 color: '#333',
//                 fontSize: '2.5rem',
//                 marginBottom: '2rem',
//                 textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
//             }}>
//                 🎧 環境音シミュレーター
//             </h1>

//             {!audioStarted ? (
//                 <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//                     <button
//                         onClick={handleEnableAudio}
//                         style={{
//                             padding: '15px 30px',
//                             fontSize: '1.2rem',
//                             borderRadius: '8px',
//                             border: 'none',
//                             backgroundColor: '#2196F3',
//                             color: 'white',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease'
//                         }}
//                         onMouseEnter={() => setHoveredButton('enable')}
//                         onMouseLeave={() => setHoveredButton(null)}
//                     >
//                         サウンドを有効にする
//                     </button>
//                     <p style={{ marginTop: '1rem', color: '#666' }}>
//                         ※最初にボタンをクリックして音声を有効化してください
//                     </p>
//                 </div>
//             ) : (
//                 <div>
//                     <Section title="🏠 屋内の音">
//                         <SoundButton name="電子レンジ" onClick={() => playBeep(600)} />
//                         <SoundButton name="洗濯機終了" onClick={() => playBeep(500)} />
//                         <SoundButton name="PCシステム音" onClick={() => playBeep(700)} />
//                         <SoundButton name="電話発信音" onClick={() => playBeep(800)} />
//                     </Section>
//                     <Section title="🌳 屋外の音">
//                         <SoundButton name="車のクラクション" onClick={() => playBeep(300)} />
//                         <SoundButton name="電車の警笛" onClick={() => playBeep(400)} />
//                         <SoundButton name="バス降車ベル" onClick={() => playBeep(450)} />
//                         <SoundButton name="自転車のベル" onClick={() => playBeep(350)} />
//                     </Section>
//                 </div>
//             )}
//         </div>
//     );
// };

// // セクションコンポーネント
// const Section = ({ title, children }) => (
//     <section style={{ marginBottom: '3rem' }}>
//         <h2 style={{
//             color: '#444',
//             fontSize: '1.8rem',
//             marginBottom: '1.5rem',
//             paddingBottom: '0.5rem',
//             borderBottom: '3px solid #2196F3'
//         }}>
//             {title}
//         </h2>
//         <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//             gap: '1rem',
//             padding: '1rem'
//         }}>
//             {children}
//         </div>
//     </section>
// );

// // 音を鳴らすボタンコンポーネント
// const SoundButton = ({ name, onClick }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <button
//             onClick={onClick}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             style={{
//                 padding: '12px 16px',
//                 borderRadius: '8px',
//                 border: 'none',
//                 backgroundColor: isHovered ? '#4CAF50' : '#2196F3',
//                 color: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 transform: isHovered ? 'translateY(-2px)' : 'none',
//                 boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 textAlign: 'left',
//                 whiteSpace: 'nowrap'
//             }}
//         >
//             {name}
//         </button>
//     );
// };
/* pages/indoor-outdoor-se.tsx */
"use client";
import React, { useState } from 'react'
import * as Tone from 'tone'

export default function IndoorOutdoorSEPage() {
    const [audioStarted, setAudioStarted] = useState(false)

    // ユーザーアクションで1度だけ Tone.start() を呼び出し、オーディオが再生可能な状態にする
    const handleEnableAudio = async () => {
        await Tone.start()
        setAudioStarted(true)
        console.log('Audio Context started')
    }

    /* ------------------------------------------------

    - 屋内で聞こえる音（サンプル10種類）
    - ----------------------------------------------- */

    // 1. 電子レンジの「ピッ！」音 (C4 付近)
    const playMicrowaveBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 },
        }).toDestination()
        synth.triggerAttackRelease('C4', 0.2)
    }

    // 2. 洗濯機の終了音の「ピー！」(D4 付近に設定)
    const playWashingMachineBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.2 },
        }).toDestination()
        synth.triggerAttackRelease('D4', 0.3)
    }

    // 3. PC のシステム音 (E4 付近)
    const playPCSystemBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 },
        }).toDestination()
        synth.triggerAttackRelease('E4', 0.2)
    }

    // 4. 電話の発信音（プーッ）(C4)
    const playPhoneDialBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.4, sustain: 0.2, release: 0.3 },
        }).toDestination()
        synth.triggerAttackRelease('C4', 0.5)
    }

    // 5. 冷蔵庫のアラート音（C4付近）
    const playFridgeAlert = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 },
        }).toDestination()
        // 2回ピピッと鳴らすイメージ
        synth.triggerAttackRelease('C4', 0.2)
        setTimeout(() => {
            synth.triggerAttackRelease('C4', 0.2)
        }, 300)
    }

    // 6. 炊飯器の終了音（電子音タイプ, A4 にしてみる）
    const playRiceCookerBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 },
        }).toDestination()
        // 簡易的に3音くらい上昇させる例
        synth.triggerAttackRelease('F4', 0.2)
        setTimeout(() => synth.triggerAttackRelease('G4', 0.2), 200)
        setTimeout(() => synth.triggerAttackRelease('A4', 0.3), 400)
    }

    // 7. 火災報知器の警告音（ピー！）(C5付近にしてみる)
    const playFireAlarm = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 0.4 },
        }).toDestination()
        // 長めに鳴らすイメージ
        synth.triggerAttackRelease('C5', 1)
    }

    // 8. 目覚まし時計の電子音（C5 を短く連続で）
    const playAlarmClockBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
        }).toDestination()
        // 連続で数回鳴らす
        let time = 0
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                synth.triggerAttackRelease('C5', 0.15)
            }, time)
            time += 300
        }
    }

    // 9. ドアベル（シンプルな1音タイプ, D5）
    const playDoorBell = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.5 },
        }).toDestination()
        synth.triggerAttackRelease('D5', 0.5)
    }

    // 10. エアコンのリモコンのボタン音 (E5)
    const playAirconRemoteBeep = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 },
        }).toDestination()
        synth.triggerAttackRelease('E5', 0.2)
    }

    /* ------------------------------------------------

    - 屋外で聞こえる音（サンプル10種類）
    - ----------------------------------------------- */

    // 1. 車のクラクション（低め, MembraneSynth 使用, G2 付近）
    const playCarHorn = () => {
        const horn = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 2,
            envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.4 },
        }).toDestination()
        horn.triggerAttackRelease('G2', 0.5)
    }

    // 2. 電車の警笛（C3付近, MembraneSynth）
    const playTrainHorn = () => {
        const horn = new Tone.MembraneSynth({
            pitchDecay: 0.1,
            octaves: 2,
            envelope: { attack: 0.02, decay: 0.6, sustain: 0, release: 0.5 },
        }).toDestination()
        // 少し長めに
        horn.triggerAttackRelease('C3', 1)
    }

    // 3. バスの降車ベル（ピー音, Synth）
    const playBusBell = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.2 },
        }).toDestination()
        synth.triggerAttackRelease('C4', 0.3)
    }

    // 4. 自転車のベル（チリン♪ MetalSynth で簡易的に）
    const playBicycleBell = () => {
        const metal = new Tone.MetalSynth({
            frequency: 700,
            envelope: { attack: 0.001, decay: 1.0, release: 0.5 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5,
        }).toDestination()
        metal.triggerAttackRelease('16n')
    }

    // 5. 鳥の鳴き声（ハトの「ホーホー」風を超簡易的に）
    //     const playBirdCall = () => {
    //         const synth = new Tone.Synth({
    //             oscillator: { type: 'sine' },
    //             envelope: { attack: 0.05, decay: 0.4, sustain: 0.2, release: 0.3 },
    //         }).toDestination()

    //             ```
    // // 2音を適度な間隔で
    // synth.triggerAttackRelease('C3', 0.5)
    // setTimeout(() => {
    //   synth.triggerAttackRelease('C3', 0.5)
    // }, 700)

    // ```

    //     }
    const playBirdCall = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.05, decay: 0.4, sustain: 0.2, release: 0.3 },
        }).toDestination()

        // 2音を適度な間隔で
        synth.triggerAttackRelease('C3', 0.5)
        setTimeout(() => {
            synth.triggerAttackRelease('C3', 0.5)
        }, 700)
    };

    // 6. 鐘の音（学校や教会のシンプルな鐘, MetalSynth）
    const playChurchBell = () => {
        const metal = new Tone.MetalSynth({
            frequency: 300,
            envelope: { attack: 0.001, decay: 3, release: 2 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 1000,
            octaves: 1,
        }).toDestination()
        metal.triggerAttackRelease('8n')
    }

    // 7. 踏切の「カンカンカン」風 (C3付近で繰り返し)
    const playRailroadCrossing = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 },
        }).toDestination()
        // 3回程度「カンカンカン」っぽく鳴らす
        let time = 0
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                synth.triggerAttackRelease('C3', 0.2)
            }, time)
            time += 400
        }
    }

    // 8. 船の汽笛（低音タイプ, F2）
    const playShipHorn = () => {
        const horn = new Tone.MembraneSynth({
            pitchDecay: 0.2,
            octaves: 2,
            envelope: { attack: 0.02, decay: 1.2, sustain: 0, release: 0.6 },
        }).toDestination()
        horn.triggerAttackRelease('F2', 1)
    }

    // 9. 風鈴の音（MetalSynth + 高め + 短い複数発音）
    const playWindChime = () => {
        const metal = new Tone.MetalSynth({
            frequency: 1200,
            envelope: { attack: 0.001, decay: 2, release: 0.5 },
            harmonicity: 5,
            modulationIndex: 32,
            resonance: 3000,
            octaves: 1.5,
        }).toDestination()

            ```
// ちょっとランダムに2～3回鳴らしてみる
metal.triggerAttackRelease('8n')
setTimeout(() => metal.triggerAttackRelease('16n'), 500)
setTimeout(() => metal.triggerAttackRelease('16n'), 900)

```

    }

    // 10. 遠くで聞こえるチャイム音 (C4) + リバーブ
    const playDistantChime = () => {
        const synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1.5 },
        })

            ```
// 大きめのリバーブ
const reverb = new Tone.Reverb({
  decay: 4,
  wet: 0.5,
}).toDestination()

synth.connect(reverb)
synth.triggerAttackRelease('C4', 1)

```

    }
    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h1>屋内／屋外で聞こえる音を Tone.js で簡易再現</h1>

            {!audioStarted ? (
                <button onClick={handleEnableAudio}>サウンドを有効にする</button>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    <h2>🏡 屋内で聞こえる音</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button onClick={playMicrowaveBeep}>電子レンジ</button>
                        <button onClick={playWashingMachineBeep}>洗濯機終了</button>
                        <button onClick={playPCSystemBeep}>PCシステム音</button>
                        <button onClick={playPhoneDialBeep}>電話発信音</button>
                        <button onClick={playFridgeAlert}>冷蔵庫警告</button>
                        <button onClick={playRiceCookerBeep}>炊飯器終了</button>
                        <button onClick={playFireAlarm}>火災報知器</button>
                        <button onClick={playAlarmClockBeep}>目覚まし時計</button>
                        <button onClick={playDoorBell}>ドアベル</button>
                        <button onClick={playAirconRemoteBeep}>エアコンリモコン</button>
                    </div>

                    <h2 style={{ marginTop: '40px' }}>🌳 屋外で聞こえる音</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button onClick={playCarHorn}>車のクラクション</button>
                        <button onClick={playTrainHorn}>電車の警笛</button>
                        <button onClick={playBusBell}>バス降車ベル</button>
                        <button onClick={playBicycleBell}>自転車のベル</button>
                        <button onClick={playBirdCall}>鳥の鳴き声</button>
                        <button onClick={playChurchBell}>鐘の音</button>
                        <button onClick={playRailroadCrossing}>踏切</button>
                        <button onClick={playShipHorn}>船の汽笛</button>
                        <button onClick={playWindChime}>風鈴</button>
                        <button onClick={playDistantChime}>遠くのチャイム</button>
                    </div>
                </div>
            )}
        </div>
    )
}
