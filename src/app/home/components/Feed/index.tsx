import { PlusIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";

import { ButtonAddPost } from "../ButtonAddPost";
import { Post } from "@/components/Post";

export const Feed = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[1000px] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Feed</h2>
          <ButtonAddPost
            buttonElement={
              <Button variant="default" className="max-md:hidden">
                <PlusIcon className="w-5 h-5 mr-2" />
                Adicionar Postagem
              </Button>
            }
          />
        </div>
        <div className="flex flex-col justify-center grid gap-4">
          <Post width={900} heigth={1200} />
        </div>
      </div>
    </div>
  );
};
