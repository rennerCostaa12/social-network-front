import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/auth";
import { useEffect, useRef, useState } from "react";

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
    if (valueInput.length > 0) router.push(`/pesquisa/${valueInput}`);
  };

  const handleLogout = () => {
    signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (isSearching) {
      refInputSearch.current?.focus();
      refInputSearch.current?.addEventListener("keydown", function (event) {
        if (event.code === "Enter") {
          const elementInput = event.target as HTMLInputElement;

          handleSearch(elementInput.value);
        }
      });
    }

    refInputSearch.current?.addEventListener("blur", () => {
      setIsSearching(false);
    });
  }, [isSearching]);

  return {
    handleRedirectMyProfile,
    handleSearch,
    isSearching,
    setIsSearching,
    refInputSearch,
    handleLogout,
    getNameInitials,
    datasUser,
  };
};
