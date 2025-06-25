"use client";
import { useState } from "react";
import BackButton from "../common/BackButton";
import AnswerForm from "../answer/AnswerForm";

const categories = ["협업", "기술", "자기소개"];
const levels = ["신입", "주니어", "시니어"];

export default function GptSuggester() {
  const [category, setCategory] = useState("협업");
  const [level, setLevel] = useState("신입");
  const [result, setResult] = useState<
    {
      id: string;
      text: string;
      category: string;
      level: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(0);

  const fetchQuestions = async () => {
    setLoading(true);
    const res = await fetch("api/gpt-feedback", {
      method: "POST",
      body: JSON.stringify({ category, level }),
    });
    const data = await res.json();

    setResult(data.questions);
    setLoading(false);
  };

  const current = result[order];
  console.log("order", order);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 ">
      <BackButton />
      <h2 className="text-2xl font-bold mt-4 pb-5 mb-6 border-b border-b-gray-400">
        GPT 질문 추천
      </h2>
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
          className="mt-3 text-white bg-blue-500 px-4 py-3 font-bold text-lg rounded-xl h-fit cursor-pointer"
        >
          {loading ? "질문 받는 중.. " : "질문 추천받기"}
        </button>
      </div>

      {result.length === 0 && (
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

      {result.length > 0 && current && (
        <>
          <div className="flex gap-2 mt-10 mb-8">
            {result.map((_, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-full w-9 h-9 flex items-center justify-center
                font-semibold ${
                  order === idx
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="border p-6 rounded-[10px] border-gray-300">
              <div className="text-lg font-bold mb-2">질문 {order + 1}</div>

              <div className="whitespace-pre-line text-[20px] ">
                <div>{current.text}</div>
              </div>
            </div>

            <AnswerForm id={current.id} question={current.text} />
          </div>

          <div className="flex justify-between mt-5">
            <div
              onClick={() => {
                if (order > 0) setOrder((order) => order - 1);
              }}
              className={`cursor-pointer px-4 py-2 rounded-[10px] ${
                order === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              이전 질문
            </div>
            <div
              onClick={() => {
                if (order !== result.length - 1) setOrder((order) => order + 1);
              }}
              className={`cursor-pointer px-4 py-2 rounded-[10px] ${
                order === result.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              다음 질문
            </div>
          </div>
        </>
      )}
    </div>
  );
}
