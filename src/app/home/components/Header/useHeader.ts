import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/auth";
import { useRef, useState } from "react";

import { getNameInitials } from "@/utils/getNamesInitials";

export const useHeader = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const refInputSearch = useRef<HTMLInputElement | null>(null);

  const { push } = useRouter();

  const { datasUser, signOut } = useAuthContext();

  const handleRedirectMyProfile = () => {
    push(`/user/${datasUser?.id}`);
  };

  const handleSearch = (valueInput: string) => {
    push(`/pesquisa/${valueInput}`);
  };

  const handleLogout = () => {
    signOut();
    push(`/login`);
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
