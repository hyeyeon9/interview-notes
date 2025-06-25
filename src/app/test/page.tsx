"use client";

import BackButton from "@/components/common/BackButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = ["협업", "기술", "자기소개"];
const levels = ["신입", "주니어", "시니어"];
const counts = [3, 5];

export default function TestPage() {
  const router = useRouter();
  const [category, setCategory] = useState("전체");
  const [level, setLevel] = useState("전체");
  const [count, setCount] = useState(3);

  const handleStart = async () => {
    const res = await fetch(`/api/test`, {
      method: "POST",
      body: JSON.stringify({ category, level, count }),
    });
    const data = await res.json();

    localStorage.setItem("test-questions", JSON.stringify(data.selected));
    router.push("/test/exam");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
      <div className="flex gap-4 items-center border-b-2 border-gray-200">
        <BackButton />
        <h1 className="text-3xl font-bold mt-4 pb-4 ">모의 면접 시험</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 -mt-7 ">
        <div className="text-[65px]"> 🎯 </div>
        <div className="text-2xl font-bold">실전 면접 시뮬레이션 </div>
        <div className="text-gray-600">
          실제 면접처럼 시간 제한을 두고 여러 질문에 답변해보세요{" "}
        </div>
      </div>

      <div
        className="mt-4 flex flex-col gap-4 w-full border border-gray-300 rounded-[10px] 
      max-w-3xl m-auto
      px-10 py-6 "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="level" className="font-bold">
            경력 수준
          </label>
          <div className="flex justify-center gap-4">
            {levels.map((l) => (
              <button
                id="level"
                className={`p-2 py-3 cursor-pointer border w-1/3 text-lg rounded-[10px] ${
                  level === l ? "bg-black text-white" : "border-gray-400"
                }`}
                key={l}
                onClick={() => setLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-bold ">
            카테고리 선택
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-4 text-lg border-gray-400 rounded-[10px]"
          >
            {categories.map((c) => (
              <option key={c}>{c} </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold" htmlFor="count">
            질문 개수
          </label>
          <div className="flex justify-center gap-4">
            {counts.map((n) => (
              <button
                id="count"
                className={`p-2 py-3 cursor-pointer border w-1/2 text-lg rounded-[10px] ${
                  count === n ? "bg-black text-white" : "border-gray-400"
                }`}
                key={n}
                onClick={() => setCount(n)}
              >
                {n}개
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-gray-100 rounded-[10px] p-4">
          <h2 className="font-bold">시험 설정 요약</h2>
          <span>• 경력 : {level}</span>
          <span>• 카테고리 : {category}</span>
          <span>• 질문 수 : {count}개</span>
        </div>

        <button
          onClick={handleStart}
          className="cursor-pointer px-4 py-3 text-lg text-white bg-black rounded-[10px]"
        >
          시험 시작하기
        </button>
      </div>
    </div>
  );
}
