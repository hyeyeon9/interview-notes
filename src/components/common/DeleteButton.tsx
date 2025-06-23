"use client";

export default function DeleteButton({ id }: { id: string }) {
  const deleteQuestion = async () => {
    const res = await fetch(`/api/questions/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      alert("삭제 완료!");
      window.location.href = "/";
    } else {
      alert("삭제 실패");
    }
  };
  return (
    <div
      className="cursor-pointer rounded-[10px] text-lg
      px-4 py-2
     text-red-500 border border-red-400 font-semibold "
      onClick={deleteQuestion}
    >
      질문 삭제
    </div>
  );
}
