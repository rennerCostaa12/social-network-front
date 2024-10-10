"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonAddPost } from "../ButtonAddPost";

import { useFeed } from "./useFeed";

import { PostFeed } from "../PostFeed";

export const Feed = () => {
  const { dataPosts, loading } = useFeed();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[1000px] space-y-4">
        {!loading && (
          <>
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

            {dataPosts && dataPosts.data.length > 0 && (
              <div className="flex flex-col justify-center gap-4">
                {dataPosts.data.map((response) => {
                  return <PostFeed data={response} />;
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
