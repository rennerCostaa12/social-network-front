"use client";

import { Check, Circle, MessageCircleIcon, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ModalDialog } from "@/components/ModalDialog";
import { ListCommentsFeed } from "../ListCommentsFeed";

import { useButtonCommentsFeed } from "./useButtonCommentsFeed";

import { ButtonCommentsProps } from "./types";

export const ButtonCommentsFeed = ({
  idPost,
  setCountComments,
}: ButtonCommentsProps) => {
  const {
    handlePlayAndStopRecording,
    recording,
    audioUrl,
    resetAll,
    handleAddCommentPost,
    loading,
    visibleModalComments,
    setVisibleModalComments,
    listComments,
  } = useButtonCommentsFeed({ idPost, setCountComments });

  return (
    <div>
      <ModalDialog
        open={visibleModalComments}
        setOpen={setVisibleModalComments}
        title="Comentários"
        elementStart={
          <Button variant="ghost" size="icon" title="Comentar">
            <MessageCircleIcon className="w-5 h-5" />
          </Button>
        }
        elementContent={
          <ListCommentsFeed
            data={listComments}
            setVisibleModalComments={setVisibleModalComments}
            setCountComments={setCountComments}
          />
        }
        elementFooter={
          <div className="w-full flex items-center gap-4 max-sm:flex-col">
            {audioUrl && audioUrl.length > 1 && (
              <audio
                className="w-full"
                controls
                src={audioUrl}
                typeof="audio/mpeg"
                key={audioUrl}
              />
            )}

            {audioUrl && (
              <div className="flex items-center gap-2">
                <Button
                  title="Enviar"
                  onClick={handleAddCommentPost}
                  loading={loading}
                >
                  <Check />
                </Button>

                <Button
                  variant="destructive"
                  title="Não enviar"
                  onClick={resetAll}
                  disabled={loading}
                >
                  <X />
                </Button>
              </div>
            )}

            {!audioUrl && (
              <div className="w-full flex justify-end max-sm:justify-center">
                <Button
                  title="Comentar"
                  variant={recording ? "destructive" : "default"}
                  onClick={handlePlayAndStopRecording}
                >
                  {recording ? (
                    <Circle className="w-5 h-5 mr-2" />
                  ) : (
                    <Mic className="w-5 h-5 mr-2" />
                  )}
                  Comentar
                </Button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};
