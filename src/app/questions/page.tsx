import GptSuggester from "@/components/gpt/GptSuggester";


export default async function QuestionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <GptSuggester />
    </div>
  );
}
