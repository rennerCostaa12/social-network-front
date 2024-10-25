import { Circle, FilePenIcon, Mic, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/ModalDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoRecorder } from "../VideoRecorder";
import { getNameInitials } from "@/utils/getNamesInitials";

import { useButtonEditPost } from "./useButtonEditPost";

import { ButtonEditPostProps } from "./types";

export const ButtonEditPost = ({ data }: ButtonEditPostProps) => {
  const {
    loading,
    handleEditPost,
    datasUser,
    isOpenModal,
    setIsOpenModal,
    recording,
    audioUrl,
    handlePlayAndStopRecording,
    fileVideo,
    setFileVideo,
    setShowCamera,
    showCamera,
    audioFile,
  } = useButtonEditPost();

  return (
    <div>
      <ModalDialog
        open={isOpenModal}
        setOpen={setIsOpenModal}
        title="Editar Post"
        elementStart={
          <Button
            title="Editar"
            className="w-full cursor-pointer"
            variant="ghost"
            size="icon"
          >
            <FilePenIcon className="w-4 h-4 mr-2" />
            Editar
          </Button>
        }
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

              {data?.comment && !audioUrl && (
                <div className="mt-2 flex items-center gap-4 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col items-center">
                    <Avatar>
                      <AvatarImage
                        src={datasUser?.photo_profile}
                        alt="profile-RC"
                      />
                      <AvatarFallback>
                        {getNameInitials(datasUser?.name as string)}
                      </AvatarFallback>
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
                    src={data?.comment}
                    typeof="audio/mpeg"
                  />
                </div>
              )}

              {audioUrl && audioUrl?.length > 0 && datasUser && (
                <div className="mt-2 flex items-center gap-4 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col items-center">
                    <Avatar>
                      <AvatarImage
                        src={datasUser?.photo_profile}
                        alt={`Usuário ${getNameInitials(
                          datasUser?.name as string
                        )}}`}
                      />
                      <AvatarFallback>
                        {getNameInitials(datasUser?.name as string)}
                      </AvatarFallback>
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
              {!showCamera && (
                <>
                  <div className="flex justify-center w-full max-md:h-full max-md:max-h-[250px]">
                    <video width={250} height={250} controls>
                      <source src={data?.picture} type={`video/mp4`} />
                    </video>
                  </div>

                  <div className="mt-2 w-full">
                    <Button
                      className="w-full flex items-center gap-2"
                      onClick={() => setShowCamera(true)}
                    >
                      <Camera />
                      Gravar Vídeo
                    </Button>
                  </div>
                </>
              )}

              {showCamera && <VideoRecorder setFileVideo={setFileVideo} />}
            </div>
          </div>
        }
        elementFooter={
          <Button
            title="Editar"
            variant="default"
            loading={loading}
            disabled={!fileVideo && !audioFile}
            onClick={() =>
              handleEditPost(
                data?.id as string,
                data?.picture as string,
                data?.comment as string
              )
            }
          >
            Editar
          </Button>
        }
      />
    </div>
  );
};
