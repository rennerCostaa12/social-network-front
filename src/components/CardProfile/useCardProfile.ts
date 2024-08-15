import { v4 as uuidv4 } from "uuid";
import { File } from "buffer";
import { toast } from "sonner";
import { ChangeEvent, useState } from "react";

import { CardProfileService } from "./service";

import { useAuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { ResizeImage } from "@/utils/resizeImage";
import { TransformBase64ToFile } from "@/utils/transformBase64ToFile";

import { FollowingUsersServices } from "@/services/following-users";

export const useCardProfile = (idUser: string) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [description, setDescription] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);

  const { datasUser, setDatasUser } = useAuthContext();

  const router = useRouter();

  const handleChooseFileImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      const image = await ResizeImage(
        file[0],
        800,
        600,
        "PNG",
        100,
        0,
        "base64"
      );

      const urlImgConvertedFile = TransformBase64ToFile(
        image as string,
        uuidv4()
      );

      setImgFile(urlImgConvertedFile as any);
    }
  };

  const handleEditProfile = async () => {
    const objectUserData = {
      id: datasUser?.id ?? "",
      name,
      username,
      gender,
      description,
      photo_profile: datasUser?.photo_profile ?? "",
    };

    setLoading(true);

    const responseEditProfile = await CardProfileService.editProfile(
      datasUser?.id as string,
      objectUserData as any,
      imgFile as any
    );

    setLoading(false);

    if (responseEditProfile?.status) {
      toast.success("Sucesso", {
        description: responseEditProfile.message,
      });

      const objectUpdated = {
        ...responseEditProfile.data.user,
        photo_profile: responseEditProfile.data.user.photo_profile,
        id: datasUser?.id,
        emoticons_drivers: datasUser?.emoticons_drivers,
      };

      setDatasUser(objectUpdated);

      localStorage.setItem(
        "@social_network:datas_user",
        JSON.stringify(objectUpdated)
      );

      if (imgFile) {
        window.location.reload();
        return;
      }

      router.refresh();
    } else {
      toast.error("Error", {
        description: responseEditProfile?.message,
      });
    }
  };

  const handleFollowing = async () => {
    setLoading(true);
    const responseFollowing = await FollowingUsersServices.followingUser(
      datasUser?.id as string,
      idUser
    );
    setLoading(false);

    if (responseFollowing?.status) {
      router.refresh();
    } else {
      toast.error("Error", {
        description: responseFollowing?.message,
      });
    }
  };

  const handleUnfollowing = async () => {
    setLoading(true);
    const responseUnfollowing = await FollowingUsersServices.unfollowingUser(
      datasUser?.id as string,
      idUser
    );
    setLoading(false);

    if (responseUnfollowing?.status) {
      router.refresh();
    } else {
      toast.error("Error", {
        description: responseUnfollowing?.message,
      });
    }
  };

  return {
    handleEditProfile,
    name,
    setName,
    username,
    setUsername,
    gender,
    setGender,
    description,
    setDescription,
    loading,
    handleChooseFileImg,
    datasUser,
    handleFollowing,
    handleUnfollowing
  };
};
