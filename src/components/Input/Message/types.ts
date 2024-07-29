import { ReactNode } from "react";

export type StatusColor = "success" | "warning" | "error" | "info";

export interface InputMessageProps {
  message: string;
  color?: StatusColor;
}
