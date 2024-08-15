"use client";

import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ButtonReactionsProps } from "./types";

import { useButtonReactions } from "./useButtonReactions";

export const ButtonReactions = ({
  idPost,
  isReacted,
}: ButtonReactionsProps) => {
  const {
    handleRegisterReaction,
    handleUnregisterReaction,
    datasUser,
    visibleModalReactions,
    setVisibleModalReactions,
  } = useButtonReactions();

  return (
    <Popover
      open={visibleModalReactions}
      onOpenChange={(currentState) =>
        setVisibleModalReactions(isReacted ? false : currentState)
      }
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => isReacted && handleUnregisterReaction(idPost)}
        >
          <HeartIcon
            fill={isReacted ? "red" : "none"}
            strokeWidth={isReacted ? "0px" : "2px"}
            className="w-5 h-5"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center" side="top">
        <div className="grid gap-4 scroll-smooth snap-x overflow-x-scroll">
          <div className="min-w-min flex items-center gap-4 my-2">
            {datasUser?.emoticons_drivers?.map((value) => {
              return (
                <Button
                  variant="ghost"
                  size="icon"
                  title={value?.category?.name}
                  key={value.id}
                  onClick={() => handleRegisterReaction(value.id, idPost)}
                >
                  <Image
                    className="cursor-pointer rounded-full"
                    src={value.image}
                    width={50}
                    height={50}
                    alt={`ícone-${value.category.name}`}
                  />
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
