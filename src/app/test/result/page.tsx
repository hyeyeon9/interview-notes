"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 타입 정의
interface QuestionScore {
  question: string;
  score: string;
}

interface Summary {
  good: string[];
  bad: string[];
  overall: string;
}

interface FeedbackResult {
  questionScores: QuestionScore[];
  summary: Summary;
}

function parseExamFeedback(raw: string): FeedbackResult {
  const [questionsPart, summaryPart] = raw.split(/-{3,}/);

  const questionBlocks = questionsPart
    .split(/\*\*Q\d+\./)
    .filter(Boolean)
    .map((block) => {
      const questionMatch = block.match(/(.+?)\*\*/);
      const scoreMatch = block.match(/점수:\s*(\d+)/);
      const question = questionMatch?.[1]?.trim() || "";
      const score = scoreMatch?.[1] || "";
      return { question, score };
    });

  const goodMatch = summaryPart.match(/\*\*🟢 잘한 점\*\*\s*\n((?:-.*\n?)*)/);
  const badMatch = summaryPart.match(/\*\*🔴 개선할 점\*\*\s*\n((?:-.*\n?)*)/);
  const overallMatch = summaryPart.match(/\*\*📝 종합 평가\*\*\s*\n([\s\S]+)/);

  const summary: Summary = {
    good:
      goodMatch?.[1]
        ?.trim()
        .split("\n")
        .map((line) => line.replace(/^-\s*/, "")) || [],
    bad:
      badMatch?.[1]
        ?.trim()
        .split("\n")
        .map((line) => line.replace(/^-\s*/, "")) || [],
    overall: overallMatch?.[1]?.trim().replace(/^-\s*/, "") || "",
  };

  return { questionScores: questionBlocks, summary };
}

export default function ResultPage() {
  const [result, setResult] = useState<FeedbackResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("gpt-exam-result");
    if (raw) {
      setResult(parseExamFeedback(raw));
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("gpt-exam-result");
  };

  const getScoreColor = (score: string) => {
    const numScore = Number.parseInt(score);
    if (numScore >= 80) return "text-green-600";
    if (numScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score: string) => {
    const numScore = Number.parseInt(score);
    if (numScore >= 80) return "bg-green-50 border-green-200";
    if (numScore >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const averageScore = result?.questionScores.length
    ? Math.round(
        result.questionScores.reduce(
          (acc, cur) => acc + parseInt(cur.score || "0"),
          0
        ) / result.questionScores.length
      )
    : 0;

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black text-lg font-medium">
            결과를 불러오는 중...
          </p>
          <p className="text-gray-500 text-sm mt-2">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-black">
            ← 홈으로
          </Link>
          <h1 className="text-2xl font-bold text-black">시험 결과</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* 평균 점수 */}
        <div
          className={`border rounded-lg p-6 ${getScoreBackground(
            averageScore.toString()
          )}`}
        >
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              <span className={getScoreColor(averageScore.toString())}>
                {averageScore}
              </span>
              <span className="text-gray-400 text-3xl">점</span>
            </div>
            <p className="text-gray-700 font-medium">전체 평균 점수</p>
          </div>
        </div>

        {/* 질문별 점수 */}
        <div className="space-y-4 border p-6 rounded-lg border-gray-200">
          <h2 className="text-lg font-semibold text-black mb-4">질문별 점수</h2>
          {result.questionScores.map((q, i) => (
            <div key={i} className="flex items-center gap-2 my-4">
              <span className="bg-black text-white px-3 py-1 rounded text-sm font-medium">
                질문 {i + 1}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    Number.parseInt(q.score) >= 80
                      ? "bg-green-500"
                      : Number.parseInt(q.score) >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${q.score}%` }}
                ></div>
              </div>
              <span className={`text-lg font-bold ${getScoreColor(q.score)}`}>
                {q.score}점
              </span>
            </div>
          ))}
        </div>

        {/* 종합 평가 */}

        <div className="space-y-2 border rounded-lg p-6 border-gray-200">
          <h3 className="font-bold text-black text-lg mb-4">✔️ 잘한 점</h3>
          <ul className="list-disc pl-5 text-gray-800 ">
            {result.summary.good.map((line, i) => (
              <li key={i} className="my-2">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 border rounded-lg p-6 border-gray-200">
          <h3 className="font-bold text-black text-lg mb-4">❗️ 개선할 점</h3>
          <ul className="list-disc pl-5 text-gray-800 ">
            {result.summary.bad.map((line, i) => (
              <li key={i} className="my-2">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2  rounded-lg p-6 bg-gray-50 text-lg">
          <h3 className="font-bold text-black  mb-4">종합 평가</h3>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {result.summary.overall}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <Link href="/test" className="flex-1">
            <button
              onClick={handleClick}
              className="cursor-pointer w-full border border-gray-300 text-gray-600 hover:border-black hover:text-black px-6 py-3 rounded-lg transition-colors"
            >
              다시 시험보기
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button
              onClick={handleClick}
              className=" cursor-pointer w-full bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
            >
              질문 연습하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
