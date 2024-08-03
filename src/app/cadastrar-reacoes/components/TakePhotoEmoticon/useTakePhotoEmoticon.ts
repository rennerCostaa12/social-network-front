import { toast } from "sonner";
import { useState } from "react";
import { useAuthContext } from "@/context/auth";
import { TakePhotoEmoticonService } from "./service";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import { EmoticonsProps } from "./types";
import { TransformBase64ToFile } from "@/utils/transformBase64ToFile";

export const useTakePhotoEmoticon = (data: EmoticonsProps[]) => {
  const [indexImg, setIndexImg] = useState<number>(0);
  const [imgCaptured, setImgCaptured] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { datasUser } = useAuthContext();

  const router = useRouter();

  const cookie = new Cookies();

  const handleSelectPhoto = async () => {
    const imgConvertedFile = TransformBase64ToFile(
      imgCaptured as string,
      uuidv4()
    );

    const listMissingEmoticons: CategoriesEmoticonsProps[] = cookie.get(
      "@social_network:missing_emoticons_user"
    );
    const curretIndex = indexImg + 1;

    const missingEmoticonsUpdated = listMissingEmoticons.filter(
      (data) => data.id !== curretIndex
    );

    if (indexImg < data.length - 1) {
      const categoryImg = data[indexImg].categories_emoji.id;
      setLoading(true);

      const response = await TakePhotoEmoticonService.registerPhoto(
        imgConvertedFile,
        datasUser?.id as string,
        categoryImg
      );

      setLoading(false);

      if (response?.status) {
        setIndexImg(indexImg + 1);
        setImgCaptured(null);
        localStorage.setItem(
          "@social_network:current_index_select_photo",
          JSON.stringify(indexImg)
        );

        toast.success("Sucesso", {
          description: response.message,
        });

        cookie.set(
          "@social_network:missing_emoticons_user",
          JSON.stringify(missingEmoticonsUpdated)
        );
      } else {
        toast.error("Error", {
          description: response?.message,
        });
      }
    } else {
      const categoryImg = data[indexImg].categories_emoji.id;
      setLoading(true);

      const response = await TakePhotoEmoticonService.registerPhoto(
        imgConvertedFile,
        datasUser?.id as string,
        categoryImg
      );

      setLoading(false);

      if (response?.status) {
        toast.success("Sucesso", {
          description: response.message,
        });

        cookie.set(
          "@social_network:missing_emoticons_user",
          JSON.stringify(missingEmoticonsUpdated)
        );

        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    }
  };

  const handleNoAcceptPhoto = () => {
    setImgCaptured(null);
  };

  return {
    handleNoAcceptPhoto,
    handleSelectPhoto,
    indexImg,
    setIndexImg,
    imgCaptured,
    setImgCaptured,
    loading,
    cookie,
  };
};
