"use client";

import { Circle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/ModalDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoRecorder } from "@/components/VideoRecorder";

import { useButtonAddPost } from "./useButtonAddPost";

import { ButtonAddPostProps } from "./types";

import { useAuthContext } from "@/context/auth";

export const ButtonAddPost = ({ buttonElement }: ButtonAddPostProps) => {
  const {
    handlePlayAndStopRecording,
    recording,
    audioUrl,
    loading,
    handleSavePost,
    isOpenModal,
    setIsOpenModal,
    setFileVideo,
    fileVideo,
  } = useButtonAddPost();

  const { datasUser } = useAuthContext();

  return (
    <div>
      <ModalDialog
        open={isOpenModal}
        setOpen={setIsOpenModal}
        title="Adicionar Post"
        elementStart={buttonElement}
        elementContent={
          <div className="w-full grid gap-4 max-w-md mx-auto">
            <div className="my-4">
              <Button
                title="Inserir Comentário"
                variant={recording ? "destructive" : "default"}
                onClick={handlePlayAndStopRecording}
                className="w-full"
              >
                {recording ? (
                  <Circle className="w-5 h-5 mr-2" />
                ) : (
                  <Mic className="w-5 h-5 mr-2" />
                )}
                Inserir Comentário
              </Button>

              {audioUrl && audioUrl?.length > 0 && datasUser && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Avatar>
                      <AvatarImage
                        src={datasUser?.photo_profile}
                        alt="profile-RC"
                      />
                      <AvatarFallback>RC</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-sm font-bold">{datasUser?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        @{datasUser?.username}
                      </p>
                    </div>
                  </div>
                  <audio
                    className="w-full"
                    controls
                    src={audioUrl}
                    typeof="audio/mpeg"
                    key={audioUrl}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-1">
              <VideoRecorder setFileVideo={setFileVideo} />
              {/* <Label htmlFor="image">Selecione do seu dispositivo</Label>
              <Input
                id="image"
                type="file"
                accept="image/*, video/mp4"
                onChange={handleChooseFile}
              /> */}
            </div>

            {fileVideo && (
              <div className="flex items-center justify-center">
               
              </div>
            )}

            {/* <div className="flex items-center justify-center">
              {isVideo ? (
                <video width={250} height={250} controls key={urlFile}>
                  <source
                    src={`${urlFile}` as string}
                    type={`video/${extensionVideo}`}
                  />
                </video>
              ) : (
                <Image
                  src={urlFile ? urlFile : "/img-post-default.svg"}
                  alt="Uploaded Image"
                  width={500}
                  height={500}
                  className="w-[500px] h-[500px] rounded-lg border"
                />
              )}
            </div> */}
          </div>
        }
        elementFooter={
          <Button
            title="Adicionar"
            variant="default"
            loading={loading}
            onClick={handleSavePost}
          >
            Adicionar
          </Button>
        }
      />
    </div>
  );
};
