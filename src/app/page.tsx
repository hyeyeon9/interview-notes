import FilteredQuestions from "@/components/question/FilteredQuestions";
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

            <Link href="/test">
              <button
                className="bg-black  
              text-[18px] cursor-pointer
              text-white px-5 py-3 rounded-lg font-bold transition-colors duration-200"
              >
                🎯 모의 면접 시험
              </button>
            </Link>

            <Link href="/questions/new">
              <button className="border-2 border-blue-600   cursor-pointer text-[18px] text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-lg font-bold transition-colors duration-200">
                + 새 질문 추가
              </button>
            </Link>
          </div>
        </div>

        <FilteredQuestions questions={questions} />
      </div>
    </div>
  );
}
