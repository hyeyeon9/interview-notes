import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/">
      <div className="cursor-pointer">← 뒤로가기</div>
    </Link>
  );
}
