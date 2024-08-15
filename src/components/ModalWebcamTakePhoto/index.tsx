"use client";

import { Camera, Check, X } from "lucide-react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { ModalDialog } from "../ModalDialog";
import { useModalWebcamTakePhoto } from "./useModalWebcamTakePhoto";

import { ModalWebcamTakePhotoProps } from "./types";

export const ModalWebcamTakePhoto = ({
  setImgCaptured,
}: ModalWebcamTakePhotoProps) => {
  const {
    handleAcceptPhoto,
    handleNoAcceptPhoto,
    handleTakePhoto,
    webcamRef,
    imageCaptured,
    visibleModal,
    setVisibleModal,
  } = useModalWebcamTakePhoto();

  return (
    <div>
      <ModalDialog
        open={visibleModal}
        setOpen={setVisibleModal}
        title="Tirar foto"
        elementStart={
          <Button className="w-full flex gap-2">
            <Camera />
            Tirar Foto
          </Button>
        }
        elementContent={
          <div className="relative flex flex-col items-center justify-center">
            {imageCaptured ? (
              <Image
                className="rounded-full"
                src={imageCaptured}
                alt="img"
                quality={100}
                width={400}
                height={400}
              />
            ) : (
              <Webcam
                className="rounded-full"
                ref={webcamRef}
                audio={false}
                width={400}
                height={400}
                screenshotFormat="image/png"
                mirrored
                videoConstraints={{
                  width: 680,
                  height: 680,
                  facingMode: "user",
                }}
              />
            )}

            <div className="w-full flex justify-center mt-2 gap-2">
              {imageCaptured && (
                <Button
                  onClick={() => handleAcceptPhoto(setImgCaptured)}
                  variant="default"
                >
                  <Check />
                </Button>
              )}

              <Button
                onClick={imageCaptured ? handleNoAcceptPhoto : handleTakePhoto}
                title={imageCaptured ? "Tirar outra foto" : "Tirar foto"}
                variant={imageCaptured ? "destructive" : "default"}
              >
                {imageCaptured ? <X /> : <Camera />}
              </Button>
            </div>
          </div>
        }
        elementFooter={<></>}
      />
    </div>
  );
};
