"use client";

import Error from "@/app/error";
import { useEffect, useState } from "react";

export default function AnswerForm({
  id,
  question,
}: {
  id: string;
  question: string;
}) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{
    score: string;
    improvement: string;
    suggestedAnswer: string;
  } | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // 댓글 불러오기
  useEffect(() => {
    const fetchAnswer = async () => {
      const res = await fetch(`/api/comments?questionId=${id}`);
      const data = await res.json();

      if (data?.text) {
        setAnswer(data.text);
      }
      setLoading(false);
    };

    fetchAnswer();
  }, [id]);

  // 로컬스토리지에서 저장된 피드백 가져오기
  useEffect(() => {
    const saved = localStorage.getItem(`gpt-feedback-${id}`);
    if (saved) {
      setFeedback(JSON.parse(saved));
    }
  }, [id]);

  // 댓글 저장
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

  // 지피티 피드백 받기
  const fetchFeedback = async () => {
    setFeedbackLoading(true);
    const res = await fetch("/api/comments/gpt-feedback", {
      method: "POST",
      body: JSON.stringify({ answer, question }),
    });
    const data = await res.json();
    const parsed = parseFeedback(data.result);
    localStorage.setItem(`gpt-feedback-${id}`, JSON.stringify(parsed));

    setFeedback(parsed);
    setFeedbackLoading(false);
  };

  // 피드백 포맷에 맞춰서 렌더링
  function parseFeedback(raw: string) {
    const scoreMatch = raw.match(/점수:\s*(\d+)/);
    const improvementMatch = raw.match(/개선할 점:\s*([\s\S]*?)추천 답변:/);
    const suggestedMatch = raw.match(/추천 답변:\s*([\s\S]*)/);

    const score = scoreMatch ? scoreMatch[1] : "N/A";
    const improvement = improvementMatch
      ? improvementMatch[1].trim()
      : "개선 항목 없음";
    const suggestedAnswer = suggestedMatch
      ? suggestedMatch[1].trim().replace(/^"|"$/g, "")
      : "추천 답변 없음";

    return { score, improvement, suggestedAnswer };
  }

  if (loading) return <div>불러오는 중...</div>;

  return (
    <>
      <div className="border border-gray-300 p-7 rounded-[10px]">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="font-bold text-[22px]">답변</h2>
          <button
            className="px-4 py-3 rounded-[10px] bg-blue-500 text-white cursor-pointer min-w-[125px]"
            onClick={fetchFeedback}
          >
            {feedbackLoading ? "검사중 .." : "GPT 검사받기"}
          </button>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
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
            border border-gray-300 cursor-pointer"
            >
              초기화
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-[10px] text-lg cursor-pointer"
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
      {feedbackLoading && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg ">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">GPT가 답변을 검사하고 있습니다...</p>
              <p className="text-gray-500 text-sm mt-1">잠시만 기다려주세요</p>
            </div>
          </div>
        </div>
      )}
      {feedback && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg ">
          <div className="flex gap-5 items-center mb-4">
            <h3 className="font-semibold text-[20px] ">GPT 피드백</h3>
            <p>
              <span className="text-2xl font-bold text-blue-500">
                {feedback.score}
              </span>
              <span className="text-[20px] text-gray-800"> / 100점</span>
            </p>
          </div>

          <h3 className="font-semibold mb-2">❗️ 개선할 점</h3>
          <pre className="whitespace-pre-wrap mb-6 text-gray-700">
            {feedback.improvement}
          </pre>

          <h3 className="font-semibold mb-2">✅ GPT 추천 답변</h3>
          <blockquote className="italic text-gray-800 border-l-4 border-blue-500 pl-4">
            {feedback.suggestedAnswer}
          </blockquote>
        </div>
      )}
    </>
  );
}
