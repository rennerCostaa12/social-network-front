import { toast } from "sonner";
import { useState } from "react";

import { useAuthContext } from "@/context/auth";
import { ReactionsPostsServices } from "@/services/reactions-posts";

export const useButtonReactions = ({
  setIsReacted,
  setCountReactions,
}: any) => {
  const { datasUser } = useAuthContext();

  const [visibleModalReactions, setVisibleModalReactions] =
    useState<boolean>(false);
  const [showDescriptionReact, setShowDescriptionReact] =
    useState<boolean>(false);

  const handleRegisterReaction = async (
    emoticonsDriver: number,
    idPost: string
  ) => {
    const responseRegister = await ReactionsPostsServices.registerReaction(
      emoticonsDriver,
      idPost
    );

    if (responseRegister?.status) {
      setIsReacted(true);
      setCountReactions((currentValue: number) => currentValue + 1);
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
      setIsReacted(false);
      setCountReactions((currentValue: number) => currentValue - 1);
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
    showDescriptionReact,
  };
};
