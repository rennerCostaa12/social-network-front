import { ReactNode } from "react";

export interface ModalDialogProps {
    title?: string;
    description?: string;
    elementStart: ReactNode;
    elementContent: ReactNode;
    elementFooter: ReactNode;
}