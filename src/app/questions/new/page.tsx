import AddQuestionForm from "@/components/AddQuestionForm";
import BackButton from "@/components/BackButton";

export default function NewPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
      <BackButton />
      <h1 className="font-bold text-3xl  mt-4 pb-4">
        새 질문 추가
      </h1>
      <div className="border p-6 border-gray-300 rounded-[10px]">
        <AddQuestionForm />
      </div>
    </div>
  );
}
