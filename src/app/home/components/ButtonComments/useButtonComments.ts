import { useState } from "react";

export const useButtonComments = () => {
    const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);

    const handlePlayAndStopRecording = () => {
      setIsRecordingAudio(!isRecordingAudio);
    };
  
    return {
        handlePlayAndStopRecording,
        isRecordingAudio
    }
}