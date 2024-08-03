"use client";

import { useEffect } from "react";
import Image from "next/image";
import { TakePhotoEmoticonProps } from "./types";
import { WebcamCapture } from "../Webcam";
import { useTakePhotoEmoticon } from "./useTakePhotoEmoticon";

export const TakePhotoEmoticon = ({ data }: TakePhotoEmoticonProps) => {
  const {
    handleNoAcceptPhoto,
    handleSelectPhoto,
    indexImg,
    setIndexImg,
    imgCaptured,
    setImgCaptured,
    loading,
    cookie,
  } = useTakePhotoEmoticon(data);

  useEffect(() => {
    const responseCurrentIndex = localStorage.getItem(
      "@social_network:current_index_select_photo"
    );

    if (responseCurrentIndex) {
      setIndexImg(JSON.parse(responseCurrentIndex) + 1);
    }

    const emoticonsPendents: CategoriesEmoticonsProps[] = cookie.get(
      "@social_network:missing_emoticons_user"
    );

    if (emoticonsPendents.length > 0) {
      setIndexImg(emoticonsPendents[0].id - 1);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {data && (
        <>
          <div>
            <Image
              src={data[indexImg].image}
              width={180}
              height={180}
              alt={data[indexImg].categories_emoji.name}
            />

            <span className="block text-center text-lg font-bold">
              {data[indexImg]?.categories_emoji?.name}
            </span>
          </div>

          <div className="flex justify-center">
            <WebcamCapture
              onAcceptPhoto={handleSelectPhoto}
              onNoAcceptPhoto={handleNoAcceptPhoto}
              imageCaptured={imgCaptured}
              setImageCaptured={setImgCaptured}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};
