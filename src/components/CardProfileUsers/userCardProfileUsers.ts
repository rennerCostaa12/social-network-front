import { toast } from "sonner";
import { getNameInitials } from "@/utils/getNamesInitials";
import { useRouter } from "next/navigation";

import { FollowingUsersServices } from "@/services/following-users";
import { useState } from "react";

import { useAuthContext } from "@/context/auth";

export const useCardProfileUsers = (
  idUser: string,
  isFollowing: boolean,
  followers: number
) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [isFollowingUser, setIsFollowingUser] = useState<boolean>(isFollowing);
  const [quantityFollower, setQuantitityFollower] = useState<number>(followers);

  const { datasUser } = useAuthContext();

  const setImageProfile = (url_img: string | null, gender: string) => {
    if (!url_img) {
      if (gender === "Masculino") {
        return "/img-default-profile-man.png";
      } else {
        return "/img-default-profile-woman.png";
      }
    }

    return url_img;
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
      setIsFollowingUser(!isFollowingUser);
      setQuantitityFollower((currentValue) => currentValue + 1);
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
      setIsFollowingUser(!isFollowingUser);
      setQuantitityFollower((currentValue) => currentValue - 1);
    } else {
      toast.error("Error", {
        description: responseUnfollowing?.message,
      });
    }
  };

  const handleRedirectDetailsPerfil = (idUser: string) => {
    router.push(`/user/${idUser}`);
  };

  return {
    getNameInitials,
    setImageProfile,
    handleFollowing,
    handleUnfollowing,
    handleRedirectDetailsPerfil,
    loading,
    isFollowingUser,
    quantityFollower,
  };
};
