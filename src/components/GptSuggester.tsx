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
    <div className="max-w-4xl mx-auto px-6 py-8 ">
      <BackButton />
      <h2 className="text-2xl font-bold mt-4 pb-5 mb-6 border-b border-b-gray-400">GPT 질문 추천</h2>
      <div className=" flex justify-between items-center ">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="category" className="font-semibold">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded p-2 border-gray-400"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="level" className="font-semibold">
              경력
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border rounded p-2 border-gray-400"
            >
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={fetchQuestions}
          disabled={loading}
          className="mt-3 text-white bg-blue-500 px-4 py-3 font-bold text-lg rounded-xl h-fit"
        >
          {loading ? "질문 받는 중.. " : "질문 추천받기"}
        </button>
      </div>

      {questions.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-gray-600 text-lg">
            GPT가 생성한 면접 질문 3개에 답변해보세요
          </p>
          <p className="text-gray-500 text-sm mt-2">
            위의 질문 추천받기 버튼을 클릭해주세요
          </p>
        </div>
      )}

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
