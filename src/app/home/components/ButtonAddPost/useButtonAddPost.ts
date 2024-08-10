import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { ChangeEvent, useState } from "react";
import { ResizeImage } from "@/utils/resizeImage";
import { useRecorderMic } from "@/hooks/useRecorderMic";
import { useAuthContext } from "@/context/auth";

import { TransformBase64ToFile } from "@/utils/transformBase64ToFile";

import { ServicesGeneral } from "@/services/index";

export const useButtonAddPost = () => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [urlFile, setUrlFile] = useState<string | null>(null);
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
    setUrlFile(null);
    const file: FileList | null = event.target.files;

    if (file) {
      if (!file[0].type.includes("video")) {
        const image = await ResizeImage(
          file[0],
          800,
          600,
          "PNG",
          100,
          0,
          "base64"
        );

        const urlImgConvertedFile = TransformBase64ToFile(
          image as string,
          uuidv4()
        );

        setUrlFile(image as string);
        setFileSelected(urlImgConvertedFile);
      } else {
        const url = URL.createObjectURL(file[0]);
        setUrlFile(url);
        setFileSelected(file[0]);
      }
    }
  };

  const handleCloseModalAndReset = () => {
    resetAll();
    setFileSelected(null);
    setIsOpenModal(false);
  };

  const handleSavePost = async () => {
    if (!fileSelected) {
      toast.warning("Alerta", {
        description: "Você precisa escolher um arquivo para realizar um post!",
      });

      return;
    }

    setLoading(true);
    const responsePost = await ServicesGeneral.addPost(
      datasUser?.id as string,
      audioFile as File,
      fileSelected,
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

  const isVideo = fileSelected?.type.includes("video");
  const extensionVideo = isVideo ? fileSelected?.name.split(".").pop() : null;

  return {
    handleChooseFile,
    handlePlayAndStopRecording,
    recording,
    audioUrl,
    loading,
    handleSavePost,
    isOpenModal,
    setIsOpenModal,
    urlFile,
    fileSelected,
    extensionVideo,
    isVideo
  };
};
