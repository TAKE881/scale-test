import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { waterBrush } from "@/app/layout"; // waterBrush を適切な場所から import する


export default function PitchQuizResult({ score, totalQuestions, resetQuiz }) {
    const router = useRouter();


    return (
        <motion.main
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
            className="flex flex-col items-center justify-center min-h-[90vh] p-6 w-full max-w-sm mx-auto  bg-white shadow-lg rounded-lg"
        >
            <div>
                <h1 className={`${waterBrush.className} text-9xl`}>
                    {((score / totalQuestions) * 100).toFixed()}
                </h1>
            </div>
            <h1 className="text-2xl font-bold mb-9 text-center">あなたの音感レベル</h1>
            <div className="w-300">
                <p className="mb-1 text-lg text-left">
                    正解数: {score} / {totalQuestions}
                </p>
                <p className="mb-8 text-lg text-left">
                    音感レベル: Lv.{((score / totalQuestions) * 100).toFixed()}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                    onClick={resetQuiz}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
                >
                    再チャレンジ
                </button>
                <button
                    onClick={() => router.push("/")}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
                >
                    トップに戻る
                </button>
            </div>
        </motion.main>
    );
}
