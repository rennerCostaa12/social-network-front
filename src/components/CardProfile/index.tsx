"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { ModalDialog } from "../ModalDialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

import { useAuthContext } from "@/context/auth";
import { CardProfileProps } from "./types";
import { useCardProfile } from "./useCardProfile";
import { getNameInitials } from "@/utils/getNamesInitials";
import { useEffect } from "react";

export const CardProfile = ({
  followers,
  following,
  postsUser,
}: CardProfileProps) => {
  const { datasUser } = useAuthContext();

  const {
    handleEditProfile,
    name,
    setName,
    username,
    setUsername,
    description,
    setDescription,
    gender,
    setGender,
    loading,
  } = useCardProfile();

  useEffect(() => {
    if (datasUser) {
      setName(datasUser.name);
      setUsername(datasUser.username);
      setDescription(datasUser?.description);
      setGender(datasUser.gender);
    }
  }, [datasUser]);
  

  return (
    <Card className="w-full max-w-[800px]">
      <CardHeader>
        <CardTitle className="text-center">Seu perfil</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-center items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                datasUser?.photo_profile
                  ? datasUser.photo_profile
                  : "/img-default-profile-man.png"
              }
            />
            {datasUser && (
              <AvatarFallback>{getNameInitials(datasUser.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{datasUser?.name}</h3>
            <p className="text-md text-muted-foreground">
              @{datasUser?.username}
            </p>
            <p className="text-sm text-muted-foreground">{datasUser?.gender}</p>
          </div>
        </div>
        <div>
          <p className="text-center text-sm max-sm:text-center">
            {datasUser?.description}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold">{followers}</p>
            <p className="text-sm text-muted-foreground">Seguidores</p>
          </div>
          <div>
            <p className="text-lg font-bold">{following}</p>
            <p className="text-sm text-muted-foreground">Seguindo</p>
          </div>
          <div>
            <p className="text-lg font-bold">{postsUser?.posts_counts}</p>
            <p className="text-sm text-muted-foreground">Postagens</p>
          </div>
        </div>
        <ModalDialog
          title="Editar Perfil"
          elementStart={<Button variant="outline">Editar Perfil</Button>}
          elementContent={
            <div>
              <div className="my-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="my-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className="my-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={description ?? ""}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="my-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select
                  value={gender}
                  onValueChange={(currentValue) => setGender(currentValue)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gênero</SelectLabel>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
          elementFooter={
            <Button onClick={handleEditProfile} loading={loading}>
              Salvar dados
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
};
