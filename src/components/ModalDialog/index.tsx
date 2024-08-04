import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ModalDialogProps } from "./types";

export const ModalDialog = ({
  elementContent,
  elementFooter,
  elementStart,
  title,
  description,
  open,
  setOpen,
}: ModalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{elementStart}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">{elementContent}</div>
        <DialogFooter>{elementFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
