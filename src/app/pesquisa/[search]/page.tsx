import { cookies } from "next/headers";

import { UsersServices } from "@/services/users";
import { api } from "@/config/api";

import { ListUsersProps, SearchPostsProps } from "./types";
import { CardProfileUsers } from "@/components/CardProfileUsers";

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

export default async function SearchPosts({ params }: SearchPostsProps) {
  const cookiesStore = cookies();

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  api.defaults.headers.common.id_user = JSON.parse(
    cookiesStore.get("@social_network:datas_user")?.value as string
  ).id;

  const listUsers: ListUsersProps[] = await SearchUsers(params.search);

  return (
    <div className="p-5 max-md:pb-24">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {listUsers?.length === 0 && (
          <h1 className="text-2xl mt-8">Nehuma pessoa encontrada</h1>
        )}
        {listUsers?.length > 0 &&
          listUsers.map((value) => (
            <CardProfileUsers
              key={value.id}
              id={value.id}
              name={value.name}
              username={value.username}
              description={value.description ?? ""}
              followers={value.followerCount}
              following={value.followingCount}
              gender={value.gender}
              url_img={value.photo_profile}
              isFollowing={value.isFollowing}
            />
          ))}
      </div>
      {/* <Tabs defaultValue="account" className="my-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Contas</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
        
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
      </Tabs> */}
    </div>
  );
}
