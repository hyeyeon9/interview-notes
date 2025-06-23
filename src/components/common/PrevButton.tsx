import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PrevButton({ id }: { id: string }) {
  const current = await prisma.question.findUnique({ where: { id } });

  const prevQuestion = await prisma.question.findFirst({
    where: { order: { gt: current?.order } },
    orderBy: { order: "asc" },
  });

  if (!prevQuestion) return <></>;
  return (
    <Link href={`/questions/${prevQuestion?.id}`}>
      <div
        className="cursor-pointer rounded-[10px] text-lg
              px-4 py-2
    bg-blue-500 text-white font-semibold"
      >
        이전 질문으로
      </div>
    </Link>
  );
}
