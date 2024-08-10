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

export const usePost = () => {
  const { datasUser } = useAuthContext();

  return {
    datasUser,
    videoExtensions
  };
};
