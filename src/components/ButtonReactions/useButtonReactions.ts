import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthContext } from "@/context/auth";
import { ReactionsPostsServices } from "@/services/reactions-posts";

export const useButtonReactions = () => {
  const { datasUser } = useAuthContext();

  const [visibleModalReactions, setVisibleModalReactions] = useState<boolean>(false);
  const [showDescriptionReact, setShowDescriptionReact] = useState<boolean>(false);

  const router = useRouter();

  const handleRegisterReaction = async (
    emoticonsDriver: number,
    idPost: string
  ) => {
    const responseRegister = await ReactionsPostsServices.registerReaction(
      emoticonsDriver,
      idPost
    );

    if (responseRegister?.status) {
      router.refresh();
      setVisibleModalReactions(false);
    } else {
      toast.error("Error", {
        description: responseRegister?.message,
      });
    }
  };

  const handleUnregisterReaction = async (idPost: string) => {
    const responseUnregister = await ReactionsPostsServices.unregisterRegister(
      idPost
    );

    if (responseUnregister?.status) {
      router.refresh();
      setVisibleModalReactions(false);
    } else {
      toast.error("Error", {
        description: responseUnregister?.message,
      });
    }
  };

  return {
    handleRegisterReaction,
    handleUnregisterReaction,
    datasUser,
    visibleModalReactions,
    setVisibleModalReactions,
    setShowDescriptionReact,
    showDescriptionReact
  };
};
