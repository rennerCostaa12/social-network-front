"use client";

import { ClockIcon, EllipsisVertical } from "lucide-react";
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
import { ButtonSavedPost } from "@/app/home/components/ButtonSavedPost";

import { getNameInitials } from "@/utils/getNamesInitials";

import { usePost } from "./usePost";
import { ButtonEditPost } from "../ButtonEditPost";

import { PostProps } from "./types";

export const Post = ({ data }: PostProps) => {
  const { datasUser, isVideo } = usePost(data);
  return (
    <Card className="max-w-[900px] relative self-center">
      <CardHeader className="flex items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] min-w-[300px]">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={
                data
                  ? data?.user?.photo_profile
                  : "/img-default-profile-man.png"
              }
            />
            <AvatarFallback>
              {getNameInitials(data?.user?.name as string)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-bold">{data?.user?.name}</h3>
            <p className="text-xs text-muted-foreground">
              @{data?.user?.username}
            </p>
          </div>
          <audio
            className="w-full"
            controls
            src={data?.comment}
            typeof="audio/mpeg"
          />
        </div>
        {datasUser?.id === data?.user?.id && (
          <div className="absolute right-2" title="Opções">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <ButtonEditPost data={data} />
                <ButtonDeletePost idPost={data?.id as string} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isVideo && (
          <video className="rounded-lg w-[500px] h-[600px]" controls>
            <source src={data?.picture as string} type={`video/mp4`} />
          </video>
        )}

        {!isVideo && (
          <img
            src={data ? data.picture : "/img-post-default.svg"}
            alt={data?.user?.photo_profile ?? ""}
            className="w-[500px] h-[600px] w-min-[500px] h-min-[600px] max-sm:w-[300px] max-sm:h-[400px] rounded-lg object-cover"
          />
        )}

        {data?.tags && data?.tags?.length > 0 && (
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
            <ButtonReactions
              idPost={data?.id as string}
              isReacted={data?.is_reacted as boolean}
            />
            <span>{data?.reactions}</span>
          </div>

          <div className="flex flex-col items-center">
            <ButtonComments idPost={data?.id as string} />
            <span>{data?.comments}</span>
          </div>

          <div className="self-start">
            <ButtonSavedPost
              isSaved={data?.is_saved as boolean}
              idPost={data?.id as string}
            />
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
