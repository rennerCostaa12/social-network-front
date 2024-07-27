"use client";

import { useState } from "react";
import { Circle, MessageCircleIcon, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ModalDialog } from "@/components/ModalDialog";
import { ListComments } from "../ListComments";

import { useButtonComments } from "./useButtonComments";

export const ButtonComments = () => {
  const { handlePlayAndStopRecording, isRecordingAudio } = useButtonComments();
  
  return (
    <div>
      <ModalDialog
        title="Comentários"
        elementStart={
          <Button variant="ghost" size="icon" title="Comentar">
            <MessageCircleIcon className="w-5 h-5" />
          </Button>
        }
        elementContent={<ListComments />}
        elementFooter={
          <Button
            title="Comentar"
            variant={isRecordingAudio ? "destructive" : "default"}
            onClick={handlePlayAndStopRecording}
          >
            {isRecordingAudio ? (
              <Circle className="w-5 h-5 mr-2" />
            ) : (
              <Mic className="w-5 h-5 mr-2" />
            )}
            Comentar
          </Button>
        }
      />
    </div>
  );
};
