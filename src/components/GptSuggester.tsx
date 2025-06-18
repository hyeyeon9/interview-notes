"use client";
import { useState } from "react";
import BackButton from "./BackButton";

const categories = ["협업", "기술", "자기소개"];
const levels = ["신입", "중고신입", "경력"];

export default function GptSuggester() {
  const [category, setCategory] = useState("협업");
  const [level, setLevel] = useState("신입");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    const res = await fetch("api/gpt-feedback", {
      method: "POST",
      body: JSON.stringify({ category, level }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  const questions = (result ?? "")
    .split("\n")
    .map((q) => q.trim())
    .filter((q) => q.length > 0);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <BackButton />
      <h2 className="text-2xl font-bold">GPT 질문 추천</h2>
      <div className="flex gap-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <button onClick={fetchQuestions} disabled={loading}>
        {loading ? "질문 받는 중.. " : "질문 추천받기"}
      </button>
      {result && (
        <div className="whitespace-pre-line">
          {questions.map((q) => (
            <div key={q}>{q}</div>
          ))}
        </div>
      )}
    </div>
  );
}
