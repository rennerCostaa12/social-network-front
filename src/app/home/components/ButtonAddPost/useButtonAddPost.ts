import { ChangeEvent, useState } from "react";
import { ResizeImage } from "@/utils/resizeImage";

export const useButtonAddPost = () => {
  const [urlImg, setUrlImg] = useState<string | null>(null);
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const [isExistsAudio, setIsExistsAudio] = useState<boolean>(false);

  const handlePlayAndStopRecording = () => {
    setIsRecordingAudio(!isRecordingAudio);
    if(isExistsAudio){
      setIsExistsAudio(false);
    }else{
      setIsExistsAudio(true);
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

  return {
    handleChooseFile,
    urlImg,
    handlePlayAndStopRecording,
    isRecordingAudio,
    isExistsAudio
  };
};
