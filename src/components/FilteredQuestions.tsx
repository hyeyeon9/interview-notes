"use client";

import { useState } from "react";
import QuestionsList from "./QuestionsList";
import { Question } from "@prisma/client";

interface QuestionsListProps {
  questions: Question[];
}

const categories = ["전체", "협업", "기술", "자기소개"];
const levels = ["전체", "신입", "중고신입", "경력"];

export default function FilteredQuestions({ questions }: QuestionsListProps) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedLevel, setSelectedLevel] = useState("전체");

  const filtered = questions.filter((q) => {
    const categoryMatch =
      selectedCategory === "전체" || q.category === selectedCategory;
    const levelMatch = selectedLevel === "전체" || q.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="font-bold text-2xl">저장된 질문 {filtered.length}</div>

        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <QuestionsList questions={filtered} />
    </div>
  );
}
