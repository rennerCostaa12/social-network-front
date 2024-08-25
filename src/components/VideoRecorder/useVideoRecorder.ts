import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

export const useVideoRecorder = (setFileVideo: (data: File | null) => void) => {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [isMute, setIsMute] = useState<boolean>(false);

  const handleStartCaptureClick = () => {
    if (urlVideo) {
      URL.revokeObjectURL(urlVideo);
      setUrlVideo(null);
    }

    setRecordedChunks([]);
    setCapturing(true);

    const stream =
      webcamRef.current.stream || webcamRef.current.video.srcObject;

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/mp4",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }: any) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  };

  const handleReset = () => {
    setRecordedChunks([]);
    setUrlVideo(null);
    setCapturing(false);
    setFileVideo(null);
  };

  useEffect(() => {
    if (recordedChunks.length && !capturing) {
      const blobFile = new Blob(recordedChunks, {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blobFile);
      const file = new File([blobFile], `${uuidv4()}.mp4`, { type: blobFile.type });
      setUrlVideo(url);
      setFileVideo(file);
    }
  }, [capturing, recordedChunks]);

  return {
    handleStartCaptureClick,
    handleStopCaptureClick,
    handleReset,
    isMute,
    setIsMute,
    webcamRef,
    capturing,
    urlVideo,
  };
};
