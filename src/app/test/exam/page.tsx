"use client";

import { useAnswerStore } from "@/stores/testAnswers";
import { Question } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const { answers, setAnswer } = useAnswerStore();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("test-questions");
    try {
      if (data && data !== "undefined") {
        const parsed = JSON.parse(data);
        setQuestions(parsed);
      }
    } catch (error) {
      console.error("로컬스토리지 파싱 오류:", error);
    }
  }, []);

  const question = questions[current];

  const fetchGrade = async () => {
    const payload = questions.map((q, idx) => ({
      question: q.text,
      answers: answers[idx + 1] || "",
    }));

    const res = await fetch(`/api/test/grade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    const data = await res.json();

    localStorage.setItem("gpt-exam-result", data.result);
    router.push("/test/result");
  };

  if (!question) return <div>질문을 불러오는 중..</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
      <div className="flex gap-4 items-center">
        <h2 className="text-2xl font-bold">모의 면접 시험</h2>
        <span className="text-gray-600 text-lg">
          {current + 1} / {questions.length}
        </span>
      </div>

      <div className="mt-8 mb-8 bg-gray-200 h-3 w-full rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-3 transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex gap-3 text-lg mt-6 mb-6">
        {questions.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`cursor-pointer rounded-[10px] w-10 py-1 flex justify-center items-center
                ${
                  current === idx
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
          >
            {" "}
            {idx + 1}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 p-6 rounded-[10px] border border-gray-300">
        <div className="bg-blue-500 px-3 py-1 w-fit text-white font-bold">
          질문 {current + 1}
        </div>
        <div className="text-[20px] ">{question.text}</div>
      </div>

      <div className="p-6 rounded-[10px] border border-gray-300 mt-6">
        <h2 className="font-bold text-[20px] mb-4"> 답변 작성</h2>
        <textarea
          placeholder="여기에 답변을 작성해주세요..."
          rows={5}
          value={answers[current + 1] || ""}
          onChange={(e) => setAnswer(`${current + 1}`, e.target.value)}
          className="p-4 border border-gray-300 rounded-[10px] w-full
          text-lg"
        />
      </div>

      <div className="flex justify-between text-lg">
        <button
          onClick={() => {
            if (current > 0) setCurrent((prev) => prev - 1);
          }}
          className={`cursor-pointer px-4 py-2 rounded-[10px] ${
            current === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          이전 질문
        </button>
        <button
          onClick={() => {
            if (current != questions.length - 1) setCurrent((prev) => prev + 1);
            else if (current === questions.length - 1) fetchGrade();
          }}
          className={`cursor-pointer px-4 py-2 rounded-[10px] ${
            current === questions.length - 1
              ? "bg-green-600 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {current === questions.length - 1
            ? "시험 완료하고 채점받기"
            : " 다음 질문"}
        </button>
      </div>
    </div>
  );
}
