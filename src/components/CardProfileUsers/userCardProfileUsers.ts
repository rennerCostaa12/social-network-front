import { getNameInitials } from "@/utils/getNamesInitials";

export const useCardProfileUsers = () => {

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

  const handleFollowing = () => {
    alert("SEGUINDO");
  };

  return {
    getNameInitials,
    setImageProfile,
    handleFollowing,
  };
};
