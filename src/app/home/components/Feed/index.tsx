"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";

import { ButtonAddPost } from "../ButtonAddPost";
import { Post } from "@/components/Post";
import { useFeed } from "./useFeed";
import { useEffect } from "react";

export const Feed = () => {
  const { verifyAllEmoticonsDriverRegistered, datasUser } = useFeed();

  // useEffect(() => {
  //   if (datasUser) {
  //     verifyAllEmoticonsDriverRegistered();
  //   }
  // }, [datasUser]);

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
        <div className="flex flex-col justify-center gap-4">
          <Post />
        </div>
      </div>
    </div>
  );
};