import Image from "next/image";
import { EmoticonsImagesProps } from "./types";

export const EmticonsImages = ({ data }: EmoticonsImagesProps) => {
  return (
    <div>
      <Image
        src={data[0].image}
        width={180}
        height={180}
        alt={data[0].categories_emoji.name}
      />
    </div>
  );
};
