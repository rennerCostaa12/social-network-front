"use client";

import { Camera, Check, X } from "lucide-react";
import Webcam from "react-webcam";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

import { WebcamProps } from "./types";

export const WebcamCapture = ({
  onAcceptPhoto,
  imageCaptured,
  setImageCaptured,
  onNoAcceptPhoto,
  loading,
}: WebcamProps) => {
  const webcamRef = useRef<any>(null);

  const handleTakePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageCaptured(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <div className="relative">
        {imageCaptured ? (
          <Image
            className="rounded-full w-[250px] h-[250px]"
            src={imageCaptured}
            alt="img"
            quality={100}
            width={400}
            height={400}
          />
        ) : (
          <Webcam
            className="rounded-full max-sm:w-[250px] max-sm:h-[250px]"
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
            <Button onClick={onAcceptPhoto} variant="default" loading={loading}>
              <Check />
            </Button>
          )}

          <Button
            onClick={imageCaptured ? onNoAcceptPhoto : handleTakePhoto}
            title={imageCaptured ? "Tirar outra foto" : "Tirar foto"}
            variant={imageCaptured ? "destructive" : "default"}
            disabled={loading}
          >
            {imageCaptured ? <X /> : <Camera />}
          </Button>
        </div>
      </div>
    </div>
  );
};
