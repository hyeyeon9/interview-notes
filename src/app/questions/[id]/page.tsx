import AnswerForm from "@/components/answer/AnswerForm";
import BackButton from "@/components/common/BackButton";
import DeleteButton from "@/components/common/DeleteButton";
import NextButton from "@/components/common/NextButton";
import PrevButton from "@/components/common/PrevButton";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: string;
  };
}

export default async function QuestionDetailPage({ params }: Props) {
  const question = await prisma.question.findUnique({
    where: { id: await params.id },
  });

  if (!question) {
    return <div>질문을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
      <BackButton />
      <h1 className="text-3xl font-bold mt-4 pb-4 ">질문 상세</h1>

      <div className="border border-gray-300 p-7 rounded-[5px] ">
        <div className="flex gap-2 mb-3">
          <div className="bg-black text-white px-4 py-1  font-bold">
            {question.category}
          </div>
          <div className="bg-white px-4 py-1 border border-gray-500 font-bold">
            {question.level}
          </div>
        </div>
        <p className="text-lg py-2">{question.text}</p>
      </div>

      <AnswerForm id={question.id} question={question.text} />

      <div className="flex justify-between">
        <DeleteButton id={question.id} />
        <div className="flex gap-4">
          <PrevButton id={question.id} />
          <NextButton id={question.id} />
        </div>
      </div>
    </div>
  );
}
