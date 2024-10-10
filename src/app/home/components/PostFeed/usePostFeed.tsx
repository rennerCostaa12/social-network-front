import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/context/auth";

const videoExtensions = [
  ".mp4",
  ".webm",
  ".ogv",
  ".avi",
  ".mov",
  ".mkv",
  ".flv",
  ".mpg",
  ".wmv",
];

export const usePostFeed = (data: PostsUserProps) => {
  const [isReacted, setIsReacted] = useState<boolean>(false);
  const [isSavedPost, setIsSavedPost] = useState<boolean>(false);
  const [countReactions, setCountReactions] = useState<number>(0);
  const [countComments, setCountComments] = useState<number>(0);

  const { datasUser } = useAuthContext();

  const extensionPicture = useMemo(() => {
    return data?.picture.split(".").pop();
  }, [data]);

  const isVideo = useMemo(() => {
    return data && videoExtensions.includes(`.${extensionPicture as string}`);
  }, [extensionPicture, data]);

  useEffect(() => {
    if (data) {
      setIsReacted(data.is_reacted);
      setCountReactions(data.reactions);
      setIsSavedPost(data.is_saved);
      setCountComments(data.comments);
    }
  }, []);

  return {
    isReacted,
    setIsReacted,
    countReactions,
    setCountReactions,
    isSavedPost,
    setIsSavedPost,
    setCountComments,
    countComments,
    isVideo,
    datasUser
  };
};
