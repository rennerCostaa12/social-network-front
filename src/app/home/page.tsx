import { cookies } from "next/headers";
import { UsersServices } from "@/services/users";

import { Feed } from "@/app/home/components/Feed";
import { CardNewUsers } from "@/app/home/components/CardNewUsers";
import { CardSuggestionsUsers } from "./components/CardSuggestionsUsers";

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

const getDataFollowsUser = async (idUser: string) => {
  try {
    const response = await UsersServices.getFollowsUser(idUser);

    if (response?.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function Home() {
  const cookiesStore = cookies();

  const responseTokenUser = cookiesStore.get(
    "@social_network:datas_user"
  )?.value;

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  const responseNewUsers: UserProps[] = await getNewUsers();

  const responseFollowsUser = await getDataFollowsUser(
    JSON.parse(responseTokenUser as string).id
  );

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[350px_1fr] p-4 md:p-6 max-md:pb-24 gap-2">
      <div className="hidden md:block">
        <div className="sticky top-4 space-y-4">
          <CardNewUsers data={responseNewUsers} />
        </div>
      </div>
      <div>
        {responseFollowsUser.following > 0 && <Feed />}
      </div>
    </div>
  );
}
