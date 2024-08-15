import { useCallback, useRef, useState } from "react";
import { TransformBase64ToFile } from "@/utils/transformBase64ToFile";

import { v4 as uuidv4 } from "uuid";

export const useModalWebcamTakePhoto = (
  
) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [imageCaptured, setImageCaptured] = useState<string | null>(null);
  const webcamRef = useRef<any>(null);

  const handleAcceptPhoto = (setImgCaptured: (data: File | null) => void) => {

    const responseFile = TransformBase64ToFile(imageCaptured as string, uuidv4());
    
    setImgCaptured(responseFile);
    setVisibleModal(false);
    setImageCaptured(null);
  };

  const handleNoAcceptPhoto = () => {
    setImageCaptured(null);
  };

  const handleTakePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageCaptured(imageSrc);
  }, [webcamRef]);

  return {
    imageCaptured,
    handleAcceptPhoto,
    handleNoAcceptPhoto,
    handleTakePhoto,
    webcamRef,
    setVisibleModal,
    visibleModal
  };
};
