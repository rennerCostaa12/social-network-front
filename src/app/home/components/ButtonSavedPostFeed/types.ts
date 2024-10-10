export interface ButtonSavedPostProps {
    isSaved: boolean;
    idPost: string;
    setIsSavedPost: (data: boolean) => void;
}