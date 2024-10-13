"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonAddPost } from "../ButtonAddPost";

import { useFeed } from "./useFeed";

import { PostFeed } from "../PostFeed";

export const Feed = () => {
  const { dataPosts, loading, totalPage, pageFeed, handlePaginate } = useFeed();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-[1000px] space-y-4">
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

            {dataPosts && dataPosts.length === 0 && (
              <div>
                <h1 className="text-xl text-center">Nenhum Post Encontrado</h1>
              </div>
            )}

            {dataPosts && dataPosts.length > 0 && (
              <div className="flex flex-col justify-center gap-4">
                {dataPosts.map((response) => {
                  return <PostFeed data={response} />;
                })}
              </div>
            )}
          </>
        )}
      </div>

      {pageFeed < (totalPage as number) && (
        <div className="my-4">
          <Button onClick={handlePaginate}>Carregar Mais</Button>
        </div>
      )}
    </div>
  );
};
