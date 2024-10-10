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

import { ModalWebcamTakePhoto } from "../ModalWebcamTakePhoto";

import { CardProfileProps } from "./types";
import { useCardProfile } from "./useCardProfile";
import { getNameInitials } from "@/utils/getNamesInitials";
import { useEffect } from "react";
import { Trash } from "lucide-react";

export const CardProfile = ({
  followers,
  following,
  postsUser,
  dataUser,
}: CardProfileProps) => {
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
    datasUser,
    handleFollowing,
    handleUnfollowing,
    imageCaptured,
    setImageCaptured,
    handleRemoveFileSelected,
  } = useCardProfile(dataUser?.id);

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
        <CardTitle className="text-center"></CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-center items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                dataUser?.photo_profile
                  ? dataUser.photo_profile
                  : `/img-default-profile-${
                      dataUser.gender === "Masculino" ? "man" : "woman"
                    }.png`
              }
            />
            {dataUser && (
              <AvatarFallback>{getNameInitials(dataUser?.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{dataUser?.name}</h3>
            <p className="text-md text-muted-foreground">
              @{dataUser?.username}
            </p>
            <p className="text-sm text-muted-foreground">{dataUser?.gender}</p>
          </div>
        </div>
        <div>
          <p className="text-center text-sm max-sm:text-center">
            {dataUser?.description}
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

        {dataUser?.id === datasUser?.id && (
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

                <div className="my-2">
                  <ModalWebcamTakePhoto
                    imgCaptured={imageCaptured as any}
                    setImgCaptured={setImageCaptured as any}
                  />

                  {imageCaptured && (
                    <div className="flex items-center justify-between my-2">
                      <span>{`${imageCaptured.name}.${
                        imageCaptured.type.split("/")[1]
                      }`}</span>

                      <Button
                        variant="outline"
                        title="Remover imagem"
                        onClick={handleRemoveFileSelected}
                      >
                        <Trash className="w-4 h-4" color="red" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            }
            elementFooter={
              <Button onClick={handleEditProfile} loading={loading}>
                Salvar dados
              </Button>
            }
          />
        )}

        {dataUser?.id !== datasUser?.id && dataUser.isFollowing && (
          <Button
            variant="outline"
            title={`Seguir ${dataUser.name}`}
            onClick={handleUnfollowing}
            loading={loading}
          >
            Seguindo
          </Button>
        )}

        {dataUser?.id !== datasUser?.id && !dataUser.isFollowing && (
          <Button
            variant="outline"
            title={`Seguir ${dataUser.name}`}
            onClick={handleFollowing}
            loading={loading}
          >
            Seguir
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
