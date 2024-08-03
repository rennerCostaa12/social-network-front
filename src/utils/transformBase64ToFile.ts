export const TransformBase64ToFile = (
  base64String: string,
  filename: string
) => {
  const [mimePart, base64Data] = base64String.split(",");

  // @ts-ignore
  const mimeType = mimePart.match(/:(.*?);/)[1];

  const byteString = atob(base64Data);

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
};
