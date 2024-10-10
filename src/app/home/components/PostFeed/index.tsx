import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ClockIcon, EllipsisVertical } from "lucide-react";

import { PostFeedProps } from "./types";
import { ButtonReactionsFeed } from "../ButtonReactionsFeed";
import { ButtonCommentsFeed } from "../ButtonCommentsFeed";
import { ButtonSavedPostFeed } from "../ButtonSavedPostFeed";

import { usePostFeed } from "./usePostFeed";
import { ButtonDeletePost } from "@/components/ButtonDeletePost";
import { Button } from "@/components/ui/button";

export const PostFeed = ({ data }: PostFeedProps) => {
  const {
    isReacted,
    setIsReacted,
    countReactions,
    setCountReactions,
    isSavedPost,
    setIsSavedPost,
    countComments,
    setCountComments,
    isVideo,
    datasUser,
  } = usePostFeed(data);

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
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-bold">{data.user.name}</h3>
            <p className="text-xs text-muted-foreground">
              @{data.user.username}
            </p>
          </div>
          <audio
            className="w-full"
            controls
            src={"/audio-default.mp3"}
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
                {/* <ButtonEditPost data={data} /> */}
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
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <ButtonReactionsFeed
              idPost={data?.id as string}
              isReacted={isReacted}
              setIsReacted={setIsReacted}
              setCountReactions={setCountReactions}
            />
            <span>{countReactions}</span>
          </div>

          <div className="flex flex-col items-center">
            <ButtonCommentsFeed
              idPost={data?.id as string}
              setCountComments={setCountComments}
            />
            <span>{countComments}</span>
          </div>

          <div className="self-start">
            <ButtonSavedPostFeed
              isSaved={isSavedPost}
              idPost={data?.id as string}
              setIsSavedPost={setIsSavedPost}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="w-4 h-4" />
          <span>{new Date(data.created_at).toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
