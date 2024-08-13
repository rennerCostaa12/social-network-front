import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/auth";
import { useRef, useState } from "react";

import { getNameInitials } from "@/utils/getNamesInitials";

export const useHeader = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const refInputSearch = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const { datasUser, signOut } = useAuthContext();

  const handleRedirectMyProfile = () => {
    router.push(`/user/${datasUser?.id}`);
  };

  const handleSearch = (valueInput: string) => {
    router.push(`/pesquisa/${valueInput}`);
  };

  const handleLogout = () => {
    signOut();
    router.push(`/login`);
  };

  return {
    handleRedirectMyProfile,
    handleSearch,
    isSearching,
    setIsSearching,
    refInputSearch,
    handleLogout,
    getNameInitials
  };
};
