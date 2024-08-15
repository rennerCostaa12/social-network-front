export interface ModalWebcamTakePhotoProps {
  imgCaptured: File | null;
  setImgCaptured: (data: File | null) => void;
}