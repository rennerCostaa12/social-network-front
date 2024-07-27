"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";

export const Header = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const refInputSearch = useRef<HTMLInputElement | null>(null);

  const { push } = useRouter();

  const handleSearch = (valueInput: string) => {
    push(`/pesquisa/${valueInput}`);
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

  return (
    <header className="bg-background border-b py-10 px-4 lg:px-6 flex items-center justify-between h-14">
      <Link
        href="/home"
        className={`${
          isSearching ? "max-sm:hidden" : ""
        } flex items-center gap-2`}
        prefetch={false}
      >
        <Image
          src="/logo-704apps.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="font-bold text-lg max-md:text-sm text-primary">
          704
          <span className="text-black">apps</span>
        </span>
      </Link>

      <div
        className={`${
          isSearching ? "w-[400px] max-sm:w-full" : ""
        } flex items-center gap-4`}
      >
        {!isSearching ? (
          <Button
            variant="ghost"
            size="icon"
            title="Pesquisar"
            onClick={() => setIsSearching(!isSearching)}
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Input
            ref={refInputSearch}
            placeholder="Pesquisa"
            className="w-full"
          />
        )}
        <Link
          href="/user/1"
          className="flex items-center gap-2"
          prefetch={false}
        >
          <Avatar>
            <AvatarImage src="/img-default-profile-man.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium text-nowrap">
            John Doe
          </span>
        </Link>
      </div>
    </header>
  );
};
