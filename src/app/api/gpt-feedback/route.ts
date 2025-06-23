import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { category, level } = await req.json();

  const prompt = `면접에서 자주 나오는 '${category}' 관련 질문을 ${level} 개발자 기준으로 3개 추천해줘.
질문은 실전 면접처럼 자연스럽게 써줘. 번호 없이 줄바꿈만으로 구분해줘. 대답없이 질문만 바로 보내.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const result = completion.choices[0].message.content;

  const questions = (result ?? "")
    .split("\n")
    .map((q) => q.trim())
    .filter((q) => q.length > 0);

  const createdQuestions = await Promise.all(
    questions?.map((text) =>
      prisma.question.create({
        data: {
          text,
          category,
          level,
        },
      })
    )
  );

  return NextResponse.json({ questions: createdQuestions });
}
