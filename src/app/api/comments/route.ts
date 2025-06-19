import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, questionId } = await req.json();

    if (!text || !questionId) {
      return NextResponse.json(
        { success: false, message: "필수 데이터 누락" },
        { status: 400 }
      );
    }

    await prisma.answer.create({
      data: {
        text,
        questionId,
      },
    });

    return NextResponse.json({ success: true, message: "성공" });
  } catch (error) {
    console.error("답뱐 저장 실패 : ", error);
    return NextResponse.json(
      { success: false, message: "답변 저장 중 오류 발생" },
      { status: 500 }
    );
  }
}
