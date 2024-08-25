import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ListCommentsProps } from "./types";

import { getNameInitials } from "@/utils/getNamesInitials";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, FilePenIcon, TrashIcon } from "lucide-react";
import { AlertDialog } from "@/components/AlertDialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useListComments } from "./useListComments";

export const ListComments = ({
  data,
  setVisibleModalComments,
}: ListCommentsProps) => {
  const { handleDeleteComment, loading, datasUser } = useListComments({
    setVisibleModalComments,
  });

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[400px] overflow-auto">
      {data && data.length === 0 && (
        <h1 className="text-center">Nenhum comentário encontrado</h1>
      )}
      {data &&
        data.map((value) => {
          return (
            <div
              className={`flex items-center gap-4 ${
                datasUser?.id === value.user.id && "bg-slate-200"
              } p-2 rounded-md`}
              key={value.id}
            >
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage
                    src={value?.user?.photo_profile}
                    alt={`imagem do usuário ${value.user.name}`}
                  />
                  <AvatarFallback>
                    {getNameInitials(value?.user?.name)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-sm font-bold">{value.user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    @{value.user.username}
                  </p>
                </div>
              </div>
              <audio
                className="w-full"
                controls
                src={value.comment}
                typeof="audio/mpeg"
              />

              <div>
                <small>
                  {new Date(value?.created_at as string).toLocaleString()}
                </small>
              </div>

              {datasUser?.id === value.user.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EllipsisVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Button
                      title="Editar"
                      className="w-full cursor-pointer"
                      variant="ghost"
                    >
                      <FilePenIcon className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <AlertDialog
                      button={
                        <Button
                          title="Deletar"
                          className="w-full cursor-pointer"
                          variant="ghost"
                          size="icon"
                        >
                          <TrashIcon className="w-4 h-4 mr-2" />
                          Deletar
                        </Button>
                      }
                      title="Alerta"
                      description="Deseja realemente deletar este post?"
                      buttonCancel={
                        <AlertDialogCancel disabled={loading}>
                          Cancelar
                        </AlertDialogCancel>
                      }
                      buttonAccept={
                        <AlertDialogAction
                          onClick={() => handleDeleteComment(value?.id)}
                          disabled={loading}
                        >
                          Confirmar
                        </AlertDialogAction>
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        })}
    </div>
  );
};
