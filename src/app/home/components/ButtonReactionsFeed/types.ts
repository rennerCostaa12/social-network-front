export interface ButtonReactionsProps {
    idPost: string;
    isReacted: boolean;
    setIsReacted: (data: boolean) => void;
    setCountReactions: (data: number) => void;
}