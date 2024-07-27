"use client";

import { CopyrightIcon, HomeIcon, PlusIcon, UserIcon } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { ButtonAddPost } from "../ButtonAddPost";

import { useFooter } from "./userFooter";

export const Footer = () => {
  const { handleRedirect } = useFooter();

  return (
    <footer className="bg-muted border-t px-4 md:px-6 py-4 flex items-center justify-between max-md:w-full max-md:fixed max-md:bottom-0 md:z-20">
      <div className="hidden items-center gap-4 max-md:flex">
        <Button
          variant="link"
          size="icon"
          title="Feed"
          onClick={() => handleRedirect("/home")}
        >
          <HomeIcon className="w-5 h-5" />
        </Button>

        <ButtonAddPost
          buttonElement={
            <Button variant="link" size="icon" title="Adicionar postagem">
              <PlusIcon className="w-5 h-5" />
            </Button>
          }
        />

        <Button
          variant="link"
          size="icon"
          title="Configurações de usuários"
          onClick={() => handleRedirect(`/user/1`)}
        >
          <UserIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CopyrightIcon className="w-4 h-4" />
        <span>2024 704Apps</span>
      </div>
    </footer>
  );
};
