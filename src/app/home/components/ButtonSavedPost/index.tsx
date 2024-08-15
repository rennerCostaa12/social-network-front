import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ButtonSavedPostProps } from "./types";

import { useButtonSavedPost } from "./useButtonSavedPost";

export const ButtonSavedPost = ({ isSaved, idPost }: ButtonSavedPostProps) => {
  const { handleRemovePost, handleSavePost } = useButtonSavedPost();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        isSaved ? handleRemovePost(idPost) : handleSavePost(idPost)
      }
      title="Salvar"
    >
      <Star
        className="w-5 h-5"
        fill={isSaved ? "#000000" : "none"}
        strokeWidth={isSaved ? "0px" : "2px"}
      />
    </Button>
  );
};
