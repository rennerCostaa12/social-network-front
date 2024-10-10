import { cookies } from "next/headers";
import { api } from "@/config/api";

import { CardSuggestionsUsers } from "../home/components/CardSuggestionsUsers";

export default async function SuggestionsUsers() {
  const cookiesStore = cookies();

  api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@social_network:token_user")?.value
  }`;

  api.defaults.headers.common.id_user = JSON.parse(
    cookiesStore.get("@social_network:datas_user")?.value as string
  ).id;

  return (
    <div className="p-5 max-md:pb-24">
      <CardSuggestionsUsers />
    </div>
  );
}
