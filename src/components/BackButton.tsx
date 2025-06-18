"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="cursor-pointer" onClick={() => router.back()}>
      뒤로가기
    </div>
  );
}
