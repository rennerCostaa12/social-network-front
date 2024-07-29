export const getNameInitials = (nameUser: string) => {
  const nameUsersArray = nameUser.split(" ");

  const firstName = nameUsersArray[0][0];
  const secondName = nameUsersArray[1][0];

  return `${firstName}${secondName}`;
};
