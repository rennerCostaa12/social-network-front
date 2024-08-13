import { toast } from "sonner";
import { getNameInitials } from "@/utils/getNamesInitials";
import { useRouter } from "next/navigation";

import { FollowingUsersService } from "@/services/following-users";
import { useState } from "react";

import { useAuthContext } from "@/context/auth";

export const useCardProfileUsers = (idUser: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
    const responseFollowing = await FollowingUsersService.followingUser(
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
    const responseUnfollowing = await FollowingUsersService.unfollowingUser(
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

  const handleRedirectDetailsPerfil = (idUser: string) => {
    router.push(`/user/${idUser}`);
  };

  return {
    getNameInitials,
    setImageProfile,
    handleFollowing,
    handleUnfollowing,
    handleRedirectDetailsPerfil,
    loading
  };
};
