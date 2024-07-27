"use client";

import { Circle, Mic, PlusIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/ModalDialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useButtonAddPost } from "./useButtonAddPost";

import { ButtonAddPostProps } from "./types";

export const ButtonAddPost = ({ buttonElement }: ButtonAddPostProps) => {
  const {
    handleChooseFile,
    urlImg,
    handlePlayAndStopRecording,
    isRecordingAudio,
  } = useButtonAddPost();

  return (
    <div>
      <ModalDialog
        title="Adicionar Post"
        elementStart={buttonElement}
        elementContent={
          <div className="w-full grid gap-4 max-w-md mx-auto">
            <div className="my-4">
              <Button
                title="Inserir Comentário"
                variant={isRecordingAudio ? "destructive" : "default"}
                onClick={handlePlayAndStopRecording}
                className="w-full"
              >
                {isRecordingAudio ? (
                  <Circle className="w-5 h-5 mr-2" />
                ) : (
                  <Mic className="w-5 h-5 mr-2" />
                )}
                Inserir Comentário
              </Button>

              {/* {isExistsAudio && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="profile-RC"
                      />
                      <AvatarFallback>RC</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-sm font-bold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">@johndoe</p>
                    </div>
                  </div>
                  <audio
                    className="w-full"
                    controls
                    src={"/audio-default.mp3"}
                    typeof="audio/mpeg"
                  />
                </div>
              )} */}
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
                width={800}
                height={600}
                className="w-full object-cover rounded-lg border"
              />
            </div>
          </div>
        }
        elementFooter={
          <Button title="Adicionar" variant="default">
            Adicionar
          </Button>
        }
      />
    </div>
  );
};
