import { InputMessageProps } from "./types";
import { useMessage } from "./useMessage";

export const Message = ({ message, color }: InputMessageProps) => {
  const { switchStatusColor } = useMessage();
  return (
    <div className={`my-2 text-sm ${switchStatusColor(color)}`}>{message}</div>
  );
};
