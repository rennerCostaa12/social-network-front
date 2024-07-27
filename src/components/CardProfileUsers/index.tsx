"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";

import { CardProfileUsersProps } from "./types";

import { useCardProfileUsers } from "./userCardProfileUsers";

export const CardProfileUsers = ({
  name,
  username,
  description,
  followers,
  following,
  gender,
  url_img,
}: CardProfileUsersProps) => {
  const { getNameInitials, setImageProfile, handleFollowing } =
    useCardProfileUsers();

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
          <p className="text-center max-sm:text-justify">{description}</p>
        </div>
        <div className="flex justify-center gap-10 text-center">
          <div>
            <p className="text-lg font-bold">{followers}</p>
            <p className="text-sm text-muted-foreground">Seguidores</p>
          </div>
          <div>
            <p className="text-lg font-bold">{following}</p>
            <p className="text-sm text-muted-foreground">Seguindo</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          title={`Seguir ${name}`}
          onClick={handleFollowing}
        >
          Seguir
        </Button>
      </CardFooter>
    </Card>
  );
};
