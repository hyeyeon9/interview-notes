"use client";

import Error from "@/app/error";
import { useState } from "react";

export default function AnswerForm({ id }: { id: string }) {
  const [answer, setAnswer] = useState("");

  const handleSave = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: answer,
        questionId: id,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return <Error />;
    }
  };
  return (
    <div className="border border-gray-300 p-7 rounded-[5px]">
      <h2 className="font-bold text-[22px] mb-4">답변</h2>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={10}
        placeholder="답변을 작성하세요."
        className="border p-4 border-gray-300 w-full"
      />
      <div className="flex justify-between mt-2 items-center font-bold">
        <p className="text-gray-400 text-sm">{answer.length} 글자</p>
        <div className="flex gap-4">
          <button
            onClick={() => setAnswer("")}
            className="bg-white text-gray-500 px-4 py-2 rounded-[10px]
            text-lg
            border border-gray-300"
          >
            초기화
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-[10px] text-lg"
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
