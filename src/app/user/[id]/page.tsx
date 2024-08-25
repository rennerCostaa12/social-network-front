export const revalidate = 0;

import { Camera } from "lucide-react";
import { cookies } from "next/headers";
import { CardProfile } from "@/components/CardProfile";
import { Post } from "@/components/Post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { api } from "@/config/api";

import { PostsByUserProps } from "./types";

const getInformationsFollowsUser = async (idUser: string) => {
  try {
    const response = await api.get(`users-followers/find-by-user/${idUser}`);

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getPostsByUser = async (idUser: string) => {
  try {
    const cookiesStore = cookies();
    const userLoggedIn = JSON.parse(
      cookiesStore.get("@social_network:datas_user")?.value as string
    ).id;

    api.defaults.headers.common.id_user = userLoggedIn;

    const response = await api.get(`posts/find-post-by-user/${idUser}`);

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getDataUser = async (idUser: string) => {
  try {
    const response = await api.get(`users/${idUser}`);

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const cookiesStore = cookies();

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  const idUser = JSON.parse(
    cookiesStore.get("@social_network:datas_user")?.value as string
  ).id;

  const informationsUser: InformationsUsersProps =
    await getInformationsFollowsUser(params.id);

  const postsUsers: PostsByUserProps = await getPostsByUser(params.id);

  const dataUser: UserProps = await getDataUser(params.id);

  return (
    <div className="p-5 max-md:pb-24">
      <div className="flex justify-center">
        <CardProfile
          dataUser={dataUser}
          postsUser={postsUsers}
          followers={informationsUser?.followers}
          following={informationsUser?.following}
        />
      </div>

      <div className="mx-10 my-4">
        <Tabs defaultValue="all-posts">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-posts">Posts</TabsTrigger>
            <TabsTrigger value="posts-saved">Salvos</TabsTrigger>
          </TabsList>
          <TabsContent value="all-posts">
            {postsUsers?.posts.length > 0 && (
              <>
                <h1 className="text-2xl my-8 font-bold text-center">
                  Minhas Publicações
                </h1>
                <div className="my-5 flex flex-wrap justify-center gap-6">
                  {postsUsers?.posts.map((response) => {
                    return (
                      <div className="max-w-[500px]" key={response.id}>
                        <Post data={response} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {dataUser?.id === idUser && postsUsers?.posts.length === 0 && (
              <div className="flex flex-col gap-4 my-10 justify-center items-center">
                <Camera className="w-14 h-14" />
                <h1 className="text-2xl font-bold">Compartilhe Fotos</h1>
                <p className="font-medium">
                  Quando você compartilha suas fotos elas aparecerão aqui no seu
                  perfil
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="posts-saved"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
