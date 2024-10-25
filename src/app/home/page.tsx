import { cookies } from "next/headers";
import { UsersServices } from "@/services/users";

import { Feed } from "@/app/home/components/Feed";
import { CardNewUsers } from "@/app/home/components/CardNewUsers";

import { api } from "@/config/api";
import { UserProps } from "./components/CardNewUsers/types";

const getNewUsers = async () => {
  try {
    const response = await UsersServices.getNewUsers();

    if (response?.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// const getDataFollowsUser = async (idUser: string) => {
//   try {
//     const response = await UsersServices.getFollowsUser(idUser);

//     if (response?.status) {
//       return response.data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

export default async function Home() {
  const cookiesStore = cookies();

  // const responseTokenUser = cookiesStore.get(
  //   "@social_network:datas_user"
  // )?.value;

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  const userLoggedIn = JSON.parse(
    cookiesStore.get("@social_network:datas_user")?.value as string
  ).id;

  api.defaults.headers.common.id_user = userLoggedIn;

  const responseNewUsers: UserProps[] = await getNewUsers();

  // const responseFollowsUser = await getDataFollowsUser(
  //   JSON.parse(responseTokenUser as string).id
  // );

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[350px_1fr] py-4 max-md:pb-24 gap-2">
      <div className="hidden md:block">
        <div className="sticky top-4 space-y-4">
          <CardNewUsers data={responseNewUsers} />
        </div>
      </div>
      <div>
        <Feed />
      </div>
    </div>
  );
}
