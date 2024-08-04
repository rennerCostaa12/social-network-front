"use client";

import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuthContext } from "@/context/auth";

export const ButtonReactions = () => {
  const { datasUser } = useAuthContext();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" title="Reagir">
          <HeartIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center" side="top">
        <div className="grid gap-4 scroll-smooth snap-x overflow-x-scroll">
          <div className="min-w-min flex items-center gap-4 my-2">
            {datasUser?.emoticons_drivers?.map((value) => {
              return (
                <Button variant="ghost" size="icon">
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
