import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useRecorderMic } from "@/hooks/useRecorderMic";
import { ServicesGeneral } from "@/services/index";

import { useAuthContext } from "@/context/auth";

import { ListCommentsProps } from "./types";

export const useButtonComments = (idPost: string) => {
  const {
    audioFile,
    audioUrl,
    recording,
    startRecording,
    resetAll,
    stopRecording,
  } = useRecorderMic();

  const { datasUser } = useAuthContext();

  const router = useRouter();

  const handlePlayAndStopRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [visibleModalComments, setVisibleModalComments] =
    useState<boolean>(false);
  const [listComments, setListComments] = useState<ListCommentsProps[]>([]);

  const handleAddCommentPost = async () => {
    setLoading(true);

    const responseCommentAdd = await ServicesGeneral.commentPost(
      audioFile as File,
      datasUser?.id as string,
      idPost
    );

    if (responseCommentAdd?.status) {
      toast.success("Sucesso", {
        description: responseCommentAdd.message,
      });
      setVisibleModalComments(false);
      resetAll();
      router.refresh();
    } else {
      toast.error("Error", {
        description: responseCommentAdd?.message,
      });
    }

    setLoading(false);
  };

  const getAllComments = async () => {
    const responseAllComments = await ServicesGeneral.findCommentsByPost(
      idPost
    );

    setListComments(responseAllComments?.data);
  };

  useEffect(() => {
    if (visibleModalComments) {
      getAllComments();
    }
  }, [visibleModalComments]);

  return {
    handlePlayAndStopRecording,
    recording,
    audioUrl,
    audioFile,
    resetAll,
    handleAddCommentPost,
    loading,
    setVisibleModalComments,
    visibleModalComments,
    listComments
  };
};
