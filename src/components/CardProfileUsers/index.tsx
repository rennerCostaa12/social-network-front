"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";

import { CardProfileUsersProps } from "./types";

import { useCardProfileUsers } from "./userCardProfileUsers";

export const CardProfileUsers = ({
  id,
  name,
  username,
  description,
  followers,
  following,
  gender,
  url_img,
  isFollowing,
}: CardProfileUsersProps) => {
  const {
    getNameInitials,
    setImageProfile,
    handleFollowing,
    handleUnfollowing,
    handleRedirectDetailsPerfil,
    loading,
    isFollowingUser,
    quantityFollower
  } = useCardProfileUsers(id, isFollowing, followers);

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader></CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-center items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={setImageProfile(url_img, gender)} />
            <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-md text-muted-foreground">@{username}</p>
            <p className="text-sm text-muted-foreground">{gender}</p>
          </div>
        </div>
        <div>
          <p className="text-center">{description}</p>
        </div>
        <div className="flex justify-center gap-10 text-center">
          <div>
            <p className="text-lg font-bold">{quantityFollower}</p>
            <p className="text-sm text-muted-foreground">Seguidores</p>
          </div>
          <div>
            <p className="text-lg font-bold">{following}</p>
            <p className="text-sm text-muted-foreground">Seguindo</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {isFollowingUser && (
          <Button
            variant="outline"
            className="w-full"
            title={`Deixa de seguir ${name}`}
            onClick={handleUnfollowing}
            loading={loading}
          >
            Seguindo
          </Button>
        )}

        {!isFollowingUser && (
          <Button
            variant="outline"
            className="w-full"
            title={`Seguir ${name}`}
            onClick={handleFollowing}
            loading={loading}
          >
            Seguir
          </Button>
        )}

        <Button
          variant="outline"
          className="w-full"
          title="Visualizar perfil"
          onClick={() => handleRedirectDetailsPerfil(id)}
        >
          Visualizar Perfil
        </Button>
      </CardFooter>
    </Card>
  );
};
