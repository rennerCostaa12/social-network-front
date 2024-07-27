import { ReactNode } from "react";

export interface AlertDialogProps {
    button: ReactNode;
    title: string;
    description: string;
    buttonCancel: ReactNode;
    buttonAccept: ReactNode;
}