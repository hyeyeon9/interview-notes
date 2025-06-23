import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function NextButton({ id }: { id: string }) {

  const current = await prisma.question.findUnique({ where: { id } });

  const nextQuestion = await prisma.question.findFirst({
    where: { order: { lt: current?.order } },
    orderBy: { order: "desc" },
  });



  if (!nextQuestion) return <></>;
  return (
    <Link href={`/questions/${nextQuestion?.id}`}>
      <div
        className="cursor-pointer rounded-[10px] text-lg
              px-4 py-2
    bg-blue-500 text-white font-semibold"
      >
        다음 질문으로
      </div>
    </Link>
  );
}
