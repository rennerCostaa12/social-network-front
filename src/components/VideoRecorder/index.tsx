"use client";

import { CircleStop, Mic, MicOff, Video, X } from "lucide-react";
import Webcam from "react-webcam";

import { Button } from "../ui/button";

import { useVideoRecorder } from "./useVideoRecorder";

import { VideoRecorderProps } from "./types";

export const VideoRecorder = ({ setFileVideo }: VideoRecorderProps) => {
  const {
    handleReset,
    handleStartCaptureClick,
    handleStopCaptureClick,
    isMute,
    setIsMute,
    capturing,
    webcamRef,
    urlVideo,
  } = useVideoRecorder(setFileVideo);

  return (
    <div>
      <div>
        {urlVideo && !capturing && (
          <video
            width={600}
            height={400}
            controls
            key={urlVideo}
            className="rounded-md"
          >
            <source src={urlVideo} type="video/mp4" />
          </video>
        )}

        {!urlVideo && (
          <Webcam
            className="rounded-md"
            key={isMute as any}
            ref={webcamRef}
            audio={!isMute}
            width={600}
            height={400}
            mirrored
            videoConstraints={{
              width: 400,
              height: 400,
              facingMode: "user",
            }}
          />
        )}
      </div>
      <div className="flex justify-center my-2 gap-2">
        {capturing && (
          <Button
            variant="destructive"
            onClick={handleStopCaptureClick}
            title="Parar"
          >
            <CircleStop />
          </Button>
        )}

        {!urlVideo && !capturing && (
          <Button
            variant="outline"
            onClick={handleStartCaptureClick}
            title="Gravar"
          >
            <Video />
          </Button>
        )}

        {urlVideo && (
          <Button
            onClick={handleReset}
            variant="destructive"
            title="Apagar vídeo"
          >
            <X />
          </Button>
        )}

        {!urlVideo && !capturing && (
          <Button
            variant="outline"
            onClick={() => setIsMute(!isMute)}
            title={isMute ? "Ligar áudio" : "Desligar áudio"}
          >
            {!isMute ? <Mic color="green" /> : <MicOff color="red" />}
          </Button>
        )}
      </div>
    </div>
  );
};
