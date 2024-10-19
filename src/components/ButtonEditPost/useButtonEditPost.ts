import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { useAuthContext } from "@/context/auth";
import { useRecorderMic } from "@/hooks/useRecorderMic";

import { TransformBase64ToFile } from "@/utils/transformBase64ToFile";

import { ServicesGeneral } from "@/services";

export const useButtonEditPost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [fileVideo, setFileVideo] = useState<File | null>(null);

  const {
    audioUrl,
    recording,
    startRecording,
    stopRecording,
    audioFile,
    resetAll,
  } = useRecorderMic();

  const { datasUser } = useAuthContext();
  const router = useRouter();

  const handleEditPost = async (
    idPost: string,
    picture: string,
    audioPost: string
  ) => {
    try {
      setLoading(true);
      const responseEditPost = await ServicesGeneral.editPost(
        idPost,
        datasUser?.id as string,
        audioFile as File,
        fileVideo as File
      );
      setLoading(false);

      if (responseEditPost?.status) {
        // toast.success("Sucesso", {
        //   description: responseEditPost?.message,
        // });
        resetAll();
        setIsOpenModal(false);
        router.refresh();
        window.location.reload();
      } else {
        toast.error("Error", {
          description: responseEditPost?.message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayAndStopRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return {
    loading,
    handleEditPost,
    datasUser,
    isOpenModal,
    setIsOpenModal,
    recording,
    audioUrl,
    handlePlayAndStopRecording,
    setFileVideo,
    fileVideo,
    setShowCamera,
    showCamera,
    audioFile,
  };
};
