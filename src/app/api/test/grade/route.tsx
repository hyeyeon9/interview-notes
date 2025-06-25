import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type QAItem = {
  question: string;
  answers: string;
};

export async function POST(req: Request) {
  const { payload } = await req.json();

  const prompt = payload
    .map(
      (item: QAItem, index: number) => `
Q${index + 1}. ${item.question}
A${index + 1}. ${item.answers || "(미작성)"}
`
    )
    .join("\n");

  const fullPrompt = `
다음은 모의 면접 질문과 답변 목록입니다.

1. 각 질문에 대해 100점 만점 기준으로 점수만 부여해주세요.
   - 형식: **Q1. 질문 내용** → 점수: (숫자)

2. 이어서 종합 평가를 작성해주세요. 아래 형식을 지켜 주세요:
---
**🟢 잘한 점**
- 예시처럼 글머리표로 2~3가지 작성

**🔴 개선할 점**
- 예시처럼 글머리표로 2~3가지 작성

**📝 종합 평가**
- 2~3문장으로 요약된 전체 총평

---
${prompt}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: fullPrompt }],
    temperature: 0.7,
  });

  const result = completion.choices[0].message.content;

  return NextResponse.json({ result });
}
