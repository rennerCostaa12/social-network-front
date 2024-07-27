import Resizer from "react-image-file-resizer";

type FormatsCompress = "JPEG" | "PNG" | "WEBP";
type OutputType = "base64" | "blob" | "file";

export const ResizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
  compressFormat: FormatsCompress,
  quality: number = 100,
  rotation: number = 0,
  outputType: OutputType = "base64",
  minWidth: number = 100,
  minHeight: number = 100
) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      (uri) => {
        resolve(uri);
      },
      outputType,
      minWidth,
      minHeight
    );
  });
};
