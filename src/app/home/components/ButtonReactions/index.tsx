import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import pathIconHappy from "../../../../assets/happy-emoji-removebg-preview.png";
import pathIconKiss from "../../../../assets/kiss-emoji-removebg-preview.png";
import pathIconLove from "../../../../assets/love-emoji-removebg-preview.png";
import pathIconSmile from "../../../../assets/smile-emoji-removebg-preview.png";
import pathIconTense from "../../../../assets/tense-emoji-removebg-preview.png";
import pathIconYawning from "../../../../assets/yawning-emoji-removebg-preview.png";

export const ButtonReactions = () => {
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
            <Button variant="ghost" size="icon">
              <Image
                className="cursor-pointer"
                src={pathIconHappy}
                width={20}
                height={20}
                alt=""
              />
            </Button>

            <Button variant="ghost" size="icon">
              <Image
                className="cursor-pointer"
                src={pathIconKiss}
                width={20}
                height={20}
                alt=""
              />
            </Button>

            <Button variant="ghost" size="icon">
              <Image
                className="cursor-pointer"
                src={pathIconLove}
                width={20}
                height={20}
                alt=""
              />
            </Button>

            <Button variant="ghost" size="icon">
              <Image
                className="cursor-pointer"
                src={pathIconSmile}
                width={20}
                height={20}
                alt=""
              />
            </Button>

            <Button variant="ghost" size="icon">
              <Image
                className="cursor-pointer"
                src={pathIconTense}
                width={20}
                height={20}
                alt=""
              />
            </Button>

            <Button variant="ghost" size="icon">
              <Image
                className="cursor-pointer"
                src={pathIconYawning}
                width={20}
                height={20}
                alt=""
              />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
