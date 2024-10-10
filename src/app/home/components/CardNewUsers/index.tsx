"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useCardNewUsers } from "./useCardNewUsers";
import { getNameInitials } from "@/utils/getNamesInitials";

import { ListUsersProps } from "./types";

export const CardNewUsers = ({ data }: ListUsersProps) => {
  const { handleRedirectPerfil } = useCardNewUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novos Usuários</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 max-h-[300px] overflow-auto mb-4">
        {data.length === 0 && <span>Sem usuários novos</span>}
        {data.length > 0 &&
          data.map((response) => {
            return (
              <div
                className="flex items-center justify-between"
                key={response.id}
              >
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
                <div>
                  <h4 className="text-md font-bold">{response.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    @{response.username}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRedirectPerfil(response.id)}
                >
                  Ver Perfil
                </Button>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};
