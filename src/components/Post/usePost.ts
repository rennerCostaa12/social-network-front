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

export const usePost = (data: PostsUserProps | undefined) => {
  const { datasUser } = useAuthContext();

  const extensionPicture = data && data?.picture.split(".").pop();

  const isVideo =
    data && videoExtensions.includes(`.${extensionPicture as string}`);


  return {
    datasUser,
    videoExtensions,
    isVideo
  };
};
