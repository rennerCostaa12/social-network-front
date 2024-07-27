import { CardProfile } from "@/components/CardProfile";
import { Post } from "@/components/Post";

export default function UserDetails({ params }: { params: { id: string } }) {
  return (
    <main className="p-5 max-md:pb-24">
      <div className="flex justify-center">
        <CardProfile />
      </div>
      <div className="mx-10">
        <h1 className="text-2xl my-8 font-bold text-center">
          Minhas Publicações
        </h1>
        <div className="my-5 flex flex-wrap justify-center gap-6">
          <div className="max-w-[500px]">
            <Post />
          </div>
          <div className="max-w-[500px]">
            <Post />
          </div>
          <div className="max-w-[500px]">
            <Post />
          </div>
          <div className="max-w-[500px]">
            <Post />
          </div>
        </div>
      </div>
    </main>
  );
}
