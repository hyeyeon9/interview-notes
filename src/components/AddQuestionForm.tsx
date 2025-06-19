"use client";

import { addQuestion, FormState } from "@/app/actions/actions";
import { useActionState } from "react";
import FilterButtons from "./FilterButtons";

export default function AddQuestionForm() {
  const [formState, formAction] = useActionState<FormState, FormData>(
    addQuestion,
    {
      errors: {},
    }
  );

  return (
    <form className="flex flex-col space-y-4" action={formAction}>
      <FilterButtons />
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="text" className="font-semibold">
          질문 내용
        </label>
        <textarea
          id="text"
          name="text"
          rows={4}
          placeholder="질문을 입력하세요."
          className="p-4 border rounded-[10px] border-gray-400"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="border px-4 py-2 rounded-[10px]
        text-white bg-black w-fit
        text-lg font-bold 
        cursor-pointer"
        >
          질문 추가
        </button>
      </div>
      {formState.errors?.text && <div>{formState.errors.text}</div>}
    </form>
  );
}
