"use client";

import QuizPageContent from "../components/QuizPageContent";

export default function QuizPage({ mode }) {
  return (
    <div className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/ruthvik-chandramouli-AHrljF0Zwog-unsplash.jpg')" }}>
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
