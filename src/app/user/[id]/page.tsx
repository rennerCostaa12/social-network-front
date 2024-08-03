import { Camera } from "lucide-react";
import { cookies } from "next/headers";
import { CardProfile } from "@/components/CardProfile";
import { Post } from "@/components/Post";

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
    const response = await api.get(`posts/find-post-by-user/${idUser}`);

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

  const informationsUser: InformationsUsersProps =
    await getInformationsFollowsUser(params.id);

  const postsUsers: PostsByUserProps = await getPostsByUser(params.id);

  return (
    <div className="p-5 max-md:pb-24">
      <div className="flex justify-center">
        <CardProfile
          postsUser={postsUsers}
          followers={informationsUser.followers}
          following={informationsUser.following}
        />
      </div>
      
      <div className="mx-10">
        {postsUsers.posts.length > 0 && (
          <>
            <h1 className="text-2xl my-8 font-bold text-center">
              Minhas Publicações
            </h1>
            <div className="my-5 flex flex-wrap justify-center gap-6">
              {postsUsers.posts.map((response) => {
                return (
                  <div className="max-w-[500px]" key={response.id}>
                    <Post data={response} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="flex flex-col gap-4 my-10 justify-center items-center">
          <Camera className="w-14 h-14" />
          <h1 className="text-2xl font-bold">Compartilhe Fotos</h1>
          <p className="font-medium">
            Quando você compartilha suas fotos elas aparecerão aqui no seu
            perfil
          </p>
        </div>
      </div>
    </div>
  );
}
