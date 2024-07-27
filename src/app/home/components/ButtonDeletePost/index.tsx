"use client";

import { TrashIcon } from "lucide-react";
import { AlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useButtonDeletePost } from "./useButtonDeletePost";

export const ButtonDeletePost = () => {
  const { handleConfirm } = useButtonDeletePost();

  return (
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
      buttonCancel={<AlertDialogCancel>Cancelar</AlertDialogCancel>}
      buttonAccept={
        <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
      }
    />
  );
};
