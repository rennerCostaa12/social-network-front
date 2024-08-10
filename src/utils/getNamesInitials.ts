export const getNameInitials = (nameUser: string) => {
  if (nameUser && nameUser?.length > 0) {
    const nameUsersArray = nameUser.split(" ");

    const firstName = nameUsersArray[0][0];

    if (nameUsersArray.length > 1) {
      const secondName = nameUsersArray[1][0];

      return `${firstName}${secondName}`;
    }

    return `${firstName}`;
  }
};
