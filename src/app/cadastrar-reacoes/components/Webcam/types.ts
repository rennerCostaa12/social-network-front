export interface WebcamProps {
  onAcceptPhoto: () => void;
  onNoAcceptPhoto: () => void;
  imageCaptured: string | null;
  setImageCaptured: (data: string | null) => void;
  loading?: boolean;
}
