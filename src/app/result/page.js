// "use client";

// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { waterBrush } from "@/app/layout"; // waterBrush を適切な場所から import

// export default function PitchQuizResult({ score, totalQuestions, resetQuiz }) {
//     const [pageIndex, setPageIndex] = useState(0);
//     const [direction, setDirection] = useState(0); // -1: 左へ, +1: 右へ
//     const router = useRouter();

//     const handleNext = () => {
//         if (pageIndex < pages.length - 1) {
//             setDirection(1);
//             setPageIndex((prev) => prev + 1);
//         }
//     };

//     const handlePrev = () => {
//         if (pageIndex > 0) {
//             setDirection(-1);
//             setPageIndex((prev) => prev - 1);
//         }
//     };

//     const variants = {
//         enter: (dir) => ({
//             x: dir > 0 ? 300 : -300,
//             opacity: 0,
//         }),
//         center: {
//             x: 0,
//             opacity: 1,
//         },
//         exit: (dir) => ({
//             x: dir > 0 ? -300 : 300,
//             opacity: 0,
//         }),
//     };

//     const pages = [
//         {
//             title: "PitchQuizResult",
//             content: (
//                 <>
//                     <div>
//                         <h1 className={`${waterBrush.className} text-9xl`}>
//                             {((score / totalQuestions) * 100).toFixed()}
//                         </h1>
//                     </div>
//                     <div>
//                         <h1 className="text-2xl font-bold mb-9 text-center">あなたのpitchレベル</h1>
//                     </div>
//                     <div className="w-300">
//                         <p className="mb-1 text-lg text-left">
//                             pitch 正解数: {score} / {totalQuestions}
//                         </p>
//                         <p className="mb-8 text-lg text-left">
//                             pitch レベル: Lv.{((score / totalQuestions) * 100).toFixed()}
//                         </p>
//                     </div>
//                 </>
//             ),
//         },
//         {
//             title: "PitchQuizDetail",
//             content: (
//                 <>
//                     <h2 className="text-xl font-bold mb-2">詳細な結果</h2>
//                     <ul className="list-disc list-inside text-left text-md">
//                         <li>問題別の結果を表示したり</li>
//                         <li>間違った音の確認</li>
//                         <li>分析コメントなど</li>
//                     </ul>
//                 </>
//             ),
//         },
//         {
//             title: "操作メニュー",
//             content: (
//                 <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
//                     <button
//                         onClick={resetQuiz}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
//                     >
//                         再チャレンジ
//                     </button>
//                     <button
//                         onClick={() => router.push("/mode-select")}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
//                     >
//                         モードセレクトに戻る
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="bg[url('/image-bg-Result/bggakki.webp')] bg-cover-center bg-no-repeat">
//             <div className="relative inset-0 bg-[url('/image-bg-Result/moonlightInstrument.webp')] bg-cover bg-center bg-no-repeat  opacity-30 z-0 w-full max-w-md mx-auto p-6 text-center bg-white shadow-lg rounded-lg min-h-[80vh]">
//                 <AnimatePresence custom={direction} mode="wait">
//                     <motion.div
//                         key={pageIndex}
//                         custom={direction}
//                         variants={variants}
//                         initial="enter"
//                         animate="center"
//                         exit="exit"
//                         transition={{ duration: 0.4 }}
//                         className="absolute top-0 left-0 w-full"
//                     >
//                         <h2 className="text-2xl font-bold mb-4">{pages[pageIndex].title}</h2>
//                         {pages[pageIndex].content}
//                     </motion.div>
//                 </AnimatePresence>

//                 //                 <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
//                     <button
//                         onClick={handlePrev}
//                         disabled={pageIndex === 0}
//                         className="text-2xl text-gray-600 hover:text-black disabled:opacity-30"
//                     >
//                         ←
//                     </button>
//                     <button
//                         onClick={handleNext}
//                         disabled={pageIndex === pages.length - 1}
//                         className="text-2xl text-gray-600 hover:text-black disabled:opacity-30"
//                     >
//                         →
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
