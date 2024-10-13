"use client";

import Link from "next/link";
import { LogOut, SearchIcon, User } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useHeader } from "./useHeader";

export const Header = () => {
  const {
    handleRedirectMyProfile,
    isSearching,
    refInputSearch,
    setIsSearching,
    handleLogout,
    getNameInitials,
    datasUser,
  } = useHeader();

  return (
    <header className="bg-background border-b py-4">
      <div className="flex items-center justify-between container mx-auto">
        <Link
          href="/home"
          className={`${
            isSearching ? "max-sm:hidden" : ""
          } flex items-center gap-2`}
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

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={
                    datasUser?.photo_profile
                      ? datasUser.photo_profile
                      : "/img-default-profile-man.png"
                  }
                />
                {datasUser && (
                  <AvatarFallback>
                    {getNameInitials(datasUser?.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="hidden sm:block text-lg text-left text-nowrap">
                  {datasUser?.name}
                </span>
                <span className="hidden sm:block text-sm text-left -nowrap text-gray-400">
                  @{datasUser?.username}
                </span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleRedirectMyProfile}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Meu Pefil</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
