export const useCardProfileUsers = () => {
  const getNameInitials = (nameUser: string) => {
    const teste = nameUser.split(" ");

    const firstName = teste[0][0];
    const secondName = teste[1][0];

    return `${firstName}${secondName}`;
  };

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
