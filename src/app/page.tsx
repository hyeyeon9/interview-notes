import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const questions = await prisma.question.findMany({
    orderBy: { order: "desc" },
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8 ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-6">
            면접 질문 목록
          </h1>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8 pt-4">
            <Link href="/questions">
              <button
                className="bg-blue-600 hover:bg-blue-700 
              text-[18px] cursor-pointer
              text-white px-5 py-3 rounded-lg font-bold transition-colors duration-200"
              >
                GPT 질문받기
              </button>
            </Link>

            <Link href="/questions/new">
              <button className="border-2 border-blue-600   cursor-pointer text-[18px] text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-lg font-bold transition-colors duration-200">
                + 새 질문 추가
              </button>
            </Link>
          </div>

          <div className="font-bold text-2xl">
            저장된 질문 {questions.length}
          </div>
        </div>

        {/* Questions List */}
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
      </div>
    </div>
  );
}
