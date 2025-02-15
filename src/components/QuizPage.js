"use client";

import QuizPageContent from "../components/QuizPageContent";

export default function QuizPage({ mode }) {
  return (
    <div>
      <QuizPageContent mode={mode} /> {/* ✅ `mode` を渡す */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const mode = query.mode || "default";

  return {
    props: {
      mode,
    },
  };
}
