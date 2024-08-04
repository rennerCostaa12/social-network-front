"use client";

import { Circle, Mic } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/ModalDialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useButtonAddPost } from "./useButtonAddPost";

import { ButtonAddPostProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth";

export const ButtonAddPost = ({ buttonElement }: ButtonAddPostProps) => {
  const {
    handleChooseFile,
    urlImg,
    handlePlayAndStopRecording,
    recording,
    audioUrl,
    loading,
    handleSavePost,
    isOpenModal,
    setIsOpenModal,
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
                  />
                </div>
              )}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="image">Selecione do seu dispositivo</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChooseFile}
              />
            </div>
            <div className="grid gap-2">
              <Image
                src={urlImg ? urlImg : "/img-post-default.svg"}
                alt="Uploaded Image"
                width={500}
                height={500}
                className="w-[500px] h-[500px] rounded-lg border"
              />
            </div>
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
