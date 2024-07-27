import { Feed } from "@/app/home/components/Feed";
import { CardSuggestionUsers } from "@/app/home/components/CardSuggestionsUsers";

export default function Home() {
  return (
    <main className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] p-4 md:p-6 max-md:pb-24">
      <div className="hidden md:block">
        <div className="sticky top-4 space-y-4">
          <CardSuggestionUsers />
        </div>
      </div>
      <Feed />
    </main>
  );
}
