import { useRouter } from "next/navigation";

export const useCardNewUsers = () => {
  const router = useRouter();

  const handleRedirectPerfil = (idUser: string) => {
    router.push(`/user/${idUser}`);
  };

  return {
    handleRedirectPerfil,
  };
};
