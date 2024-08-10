import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/components/Post";
import { CardProfileUsers } from "@/components/CardProfileUsers";

import { UsersServices } from "@/services/users";
import { cookies } from "next/headers";
import { api } from "@/config/api";

import { ListUsersPaginationProps } from "./types";

async function SearchUsers(name: string) {
  try {
    const responseUsers = await UsersServices.searchUsers(name);

    if (responseUsers?.status) {
      return responseUsers.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function SearchPosts({
  params,
}: {
  params: { search: string };
}) {
  const cookiesStore = cookies();

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  const listUsers: ListUsersPaginationProps = await SearchUsers(params.search);

  return (
    <main className="p-5 max-md:pb-24">
      <Tabs defaultValue="account" className="my-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Contas</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-wrap gap-4 justify-center">
            {listUsers?.items?.map((value) => {
              return (
                <CardProfileUsers
                  key={value.id}
                  name={value.name}
                  username={value.username}
                  description={value.description ?? ""}
                  followers={value.followerCount}
                  following={value.followingCount}
                  gender={value.gender}
                  url_img={value.photo_profile}
                />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="tags">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>

            <div className="max-w-[500px]">
              <Post />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
