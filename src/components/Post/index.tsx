import { ClockIcon, EllipsisVertical, FilePenIcon, Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ButtonDeletePost } from "@/app/home/components/ButtonDeletePost";
import { ButtonReactions } from "@/app/home/components/ButtonReactions";
import { ButtonComments } from "@/app/home/components/ButtonComments";

import { PostProps } from "./types";

export const Post = ({ data }: PostProps) => {
  return (
    <Card className="max-w-[900px] relative self-center">
      <CardHeader className="flex items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] min-w-[300px]">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={data ? data.photo_profile : "/img-default-profile-man.png"}
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-bold">{data?.name_user}</h3>
            <p className="text-xs text-muted-foreground">@{data?.username}</p>
          </div>
          <audio
            className="w-full"
            controls
            src={"/audio-default.mp3"}
            typeof="audio/mpeg"
          />
        </div>
        <div className="absolute right-2" title="Opções">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button
                title="Editar"
                className="w-full cursor-pointer"
                variant="ghost"
              >
                <FilePenIcon className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <ButtonDeletePost />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <img
          src={data ? data.picture : "/img-post-default.svg"}
          alt="Design"
          className="w-[500px] h-[600px] w-min-[500px] h-min-[600px] max-sm:w-[300px] max-sm:h-[400px] rounded-lg object-cover"
        />

        {data && data.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 max-h-[px] overflow-auto">
            <small className="bg-black text-white p-1 rounded-lg">
              #futebol
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #cozinha
            </small>
            <small className="bg-black text-white p-1 rounded-lg">#anime</small>
            <small className="bg-black text-white p-1 rounded-lg">#acdc</small>
            <small className="bg-black text-white p-1 rounded-lg">
              #rounded-lg
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #futebol
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #cozinha
            </small>
            <small className="bg-black text-white p-1 rounded-lg">#anime</small>
            <small className="bg-black text-white p-1 rounded-lg">#acdc</small>
            <small className="bg-black text-white p-1 rounded-lg">
              #rounded-lg
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #futebol
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #cozinha
            </small>
            <small className="bg-black text-white p-1 rounded-lg">#anime</small>
            <small className="bg-black text-white p-1 rounded-lg">#acdc</small>
            <small className="bg-black text-white p-1 rounded-lg">
              #bgrounded-lg
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #futebol
            </small>
            <small className="bg-black text-white p-1 rounded-lg">
              #cozinha
            </small>
            <small className="bg-black text-white p-1 rounded-lg">#anime</small>
            <small className="bg-black text-white p-1 rounded-lg">#acdc</small>
            <small className="bg-black text-white p-1 rounded-lg">#red</small>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <ButtonReactions />
            <span>{data?.reactions}</span>
          </div>

          <div className="flex flex-col items-center">
            <ButtonComments />
            <span>{data?.comments}</span>
          </div>

          <div className="self-start">
            <Button variant="ghost" size="icon" title="Salvar">
              <Star className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="w-4 h-4" />
          <span>{new Date(data?.created_at as string).toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
