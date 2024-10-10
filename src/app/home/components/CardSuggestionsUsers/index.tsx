"use client";

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useCardSuggestionUsers } from "./useCardSuggestionUsers";

import { getNameInitials } from "@/utils/getNamesInitials";

export const CardSuggestionsUsers = () => {
  const {
    loading,
    toggleFollow,
    followingUsers,
    usersRecommended,
    loadMoreUsers,
    totalPages,
    currentPage,
  } = useCardSuggestionUsers();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 my-4">
        <h1 className="text-2xl font-bold text-center">
          Sugestões de usuários
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Conheça novas pessoas e amplie sua rede.
        </p>

        <p className="text-sm text-gray-500 text-center">
          Para personalizar seu feed e descobrir conteúdos incríveis, siga pelo
          menos 5 perfis que te interessem. Quanto mais você seguir, mais
          diversa e interessante será sua experiência!
        </p>
      </div>

      <div className="my-4">
        <div className="flex flex-wrap justify-center items-center gap-4 max-xl:justify-center">
          {usersRecommended.map((response) => {
            const isFollowing = followingUsers.has(response.id);

            return (
              <Card
                className="w-full max-w-[400px] min-h-[120px] p-4 grid gap-4 max-md:max-w-full"
                key={response.id}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        response.photo_profile
                          ? response.photo_profile
                          : `/img-default-profile-${
                              response.gender === "Masculino" ? "man" : "woman"
                            }.png`
                      }
                    />
                    <AvatarFallback>
                      {getNameInitials(response.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 grid gap-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium">{response.name}</h4>
                        <p
                          className="text-sm text-muted-foreground cursor-pointer"
                          title="Visualizar Perfil"
                        >
                          <Link href={`/user/${response.id}`}>
                            @{response.username}
                          </Link>
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFollow(response.id, isFollowing)}
                        disabled={loading}
                      >
                        {isFollowing ? "Seguindo" : "Seguir"}
                      </Button>
                    </div>
                    {response.description && (
                      <p className="text-sm text-muted-foreground my-2">
                        {response.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {usersRecommended.length > 0 && currentPage < totalPages && (
        <div className="my-4">
          <Button onClick={loadMoreUsers} disabled={loading}>
            {loading ? "Carregando..." : "Ver Mais"}
          </Button>
        </div>
      )}
    </div>
  );
};
