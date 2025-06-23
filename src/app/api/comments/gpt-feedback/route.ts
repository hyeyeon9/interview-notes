import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { answer, question } = await req.json();

  const prompt = `다음은 면접 질문과 그에 대한 지원자의 답변입니다.

질문: "${question}"

답변: "${answer}"

이 답변을 100점 만점으로 평가해주세요.
- 점수 (숫자만)
- 개선할 점 2가지
- GPT가 추천하는 예시 답변 (30초 이내 답변 길이)

구분할 수 있게 점수, 개선할 점, 추천 답변 3가지로 구분해줘. 
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const result = completion.choices[0].message.content;

  return NextResponse.json({ result });
}
