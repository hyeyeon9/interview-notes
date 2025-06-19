"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: {
    id?: string;
    category?: string;
    level?: string;
    text?: string;
  };
  success?: boolean;
};

export async function addQuestion(prevState: FormState, formData: FormData) {
  const text = formData.get("text") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;

  if (!text || !category || !level) {
    return {
      errors: {
        text: "카테고리 및 내용을 입력하세요",
      },
    };
  }

  await prisma.question.create({
    data: { text, category, level },
  });

  redirect("/questions");
}
