import { Question } from "@prisma/client";
import Link from "next/link";

interface QuestionsListProps {
  questions: Question[];
}

export default function QuestionsList({ questions }: QuestionsListProps) {
  return (
    <div className="space-y-4">
      {questions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <p>아직 등록된 질문이 없습니다.</p>
          <p>첫 번째 면접 질문을 추가해보세요!</p>
        </div>
      ) : (
        questions.map((q) => (
          <Link key={q.id} href={`/questions/${q.id}`} className="block">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-lg transition-all duration-200 cursor-pointer">
              {/* Category and Level */}
              <div className="flex gap-2 mb-3">
                <div className="bg-black text-white px-4 py-1  font-bold">
                  {q.category}
                </div>
                <div className="bg-white px-4 py-1 border border-gray-500 font-bold">
                  {q.level}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-black text-[18px] leading-relaxed mb-4">
                <p className="line-clamp-2 overflow-hidden  pt-2">
                  {q.text.length > 100
                    ? `${q.text.substring(0, 100)}...`
                    : q.text}
                </p>
              </div>

              {/* Created Date */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">
                  {new Date(q.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
