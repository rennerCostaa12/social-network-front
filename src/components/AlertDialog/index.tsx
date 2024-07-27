import {
  AlertDialog as AlertDialogRadix,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AlertDialogProps } from "./types";

export const AlertDialog = ({
  button,
  title,
  description,
  buttonCancel,
  buttonAccept,
}: AlertDialogProps) => {
  return (
    <AlertDialogRadix>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {buttonCancel}
          {buttonAccept}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRadix>
  );
};
