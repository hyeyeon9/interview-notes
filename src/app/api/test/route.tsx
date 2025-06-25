import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { category, level, count } = await req.json();

  console.log(category, level, count);

  const where: Prisma.QuestionWhereInput = {};

  if (category !== "전체") where.category = category;
  if (level !== "전체") where.level = level;

  const res = await prisma.question.findMany({
    where,
  });

  const shuffled = res.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  console.log("selected", selected);

  return NextResponse.json({ selected });
}
