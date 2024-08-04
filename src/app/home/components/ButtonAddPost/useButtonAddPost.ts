import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { ChangeEvent, useState } from "react";
import { ResizeImage } from "@/utils/resizeImage";
import { useRecorderMic } from "@/hooks/useRecorderMic";
import { useAuthContext } from "@/context/auth";

import { TransformBase64ToFile } from "@/utils/transformBase64ToFile";

import { PostsService } from "./services";

export const useButtonAddPost = () => {
  const [urlImg, setUrlImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const {
    audioUrl,
    recording,
    startRecording,
    stopRecording,
    audioFile,
    resetAll,
  } = useRecorderMic();

  const { datasUser } = useAuthContext();

  const handlePlayAndStopRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleChooseFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      const image = await ResizeImage(
        file[0],
        800,
        600,
        "PNG",
        100,
        0,
        "base64"
      );
      setUrlImg(image as string);
    }
  };

  const handleCloseModalAndReset = () => {
    resetAll();
    setUrlImg(null);
    setIsOpenModal(false);
  };

  const handleSavePost = async () => {
    if (!urlImg) {
      toast.warning("Alerta", {
        description: "Você precisa escolher uma foto para realizar um post!",
      });

      return;
    }

    const urlImgConvertedFile = TransformBase64ToFile(
      urlImg as string,
      uuidv4()
    );

    setLoading(true);
    const responsePost = await PostsService.addPost(
      datasUser?.id as string,
      audioFile as File,
      urlImgConvertedFile,
      756
    );
    setLoading(false);

    if (responsePost?.status) {
      toast.success("Sucesso", {
        description: responsePost?.message,
      });

      handleCloseModalAndReset();
    } else {
      toast.error("Error", {
        description: responsePost?.message,
      });
    }
  };

  return {
    handleChooseFile,
    urlImg,
    handlePlayAndStopRecording,
    recording,
    audioUrl,
    loading,
    handleSavePost,
    isOpenModal,
    setIsOpenModal,
  };
};
