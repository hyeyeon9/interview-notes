const categories = ["협업", "기술", "자기소개"];
const levels = ["신입", "주니어", "시니어"];

export default function FilterButtons() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="category" className="font-semibold">
          카테고리
        </label>
        <select
          name="category"
          id="category"
          className="border rounded p-2 border-gray-400"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="level" className="font-semibold">
          경력
        </label>
        <select
          name="level"
          id="level"
          className="border rounded p-2 border-gray-400"
        >
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
