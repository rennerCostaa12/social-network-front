import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useRecorderMic = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<any>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event: any) => {
      audioChunksRef.current.push(event.data as any);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      convertBlobToFile(audioBlob, `audio-post-${uuidv4()}.wav`);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const convertBlobToFile = (blob: Blob, fileName: string) => {
    const file = new File([blob], fileName, { type: blob.type });
    setAudioFile(file);
  };

  const resetAll = () => {
    setRecording(false);
    setAudioUrl(null);
    setAudioFile(null);
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
  };

  return {
    startRecording,
    stopRecording,
    recording,
    audioUrl,
    audioFile,
    resetAll,
  };
};
