import { cookies } from "next/headers";
import { api } from "@/config/api";
import { TakePhotoEmoticon } from "./components/TakePhotoEmoticon";

const getEmoticons = async () => {
  try {
    const responseEmoticons = await api.get("emoticons");

    if (responseEmoticons.status) {
      return responseEmoticons.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function RegisterReactions() {
  const cookiesStore = cookies();

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  const emoticons = await getEmoticons();

  return (
    <main className="p-5 max-md:pb-24 flex flex-col justify-center max-sm:justify-normal items-center h-screen gap-4">
      <h1 className="text-2xl my-5 text-center">Escolha os emojis</h1>

      <TakePhotoEmoticon
        data={emoticons}
      />
      
      <p className="text-sm text-center pb-6">
        Você precisa tirar a foto baseado no emoji acima. Iremos utilizar sua
        foto como os emojis para interações na rede social
      </p>
    </main>
  );
}
