"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";

import { useRegisterUser } from "./useRegisterUser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterUser() {
  const {
    handleRedirectLogin,
    Controller,
    control,
    handleRegisterUser,
    handleSubmit,
    loading,
    setValue,
  } = useRegisterUser();

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-dvh bg-background">
        <div className="max-w-xl w-full px-6 py-12 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Cadastro</h1>
            <p className="text-muted-foreground">
              Preencha o formulário para cadastro de usuário
            </p>
          </div>
          <form onSubmit={handleSubmit(handleRegisterUser)}>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <Controller
                  control={control}
                  name="name"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input.Root>
                          <Input.Content
                            id="name"
                            placeholder="Jhon Doe"
                            onChange={onChange}
                            value={value}
                          />
                        </Input.Root>
                        {error?.message && (
                          <Input.Message
                            color="error"
                            message={error.message}
                          />
                        )}
                      </div>
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="username"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="username">Nome de usuário</Label>
                        <Input.Root>
                          <Input.Content
                            id="username"
                            placeholder="jhondoe"
                            onChange={onChange}
                            value={value}
                          />
                        </Input.Root>

                        {error?.message && (
                          <Input.Message
                            color="error"
                            message={error.message}
                          />
                        )}
                      </div>
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="gender"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="gender">Gênero</Label>
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Gênero</SelectLabel>
                              <SelectItem value="Masculino">
                                Masculino
                              </SelectItem>
                              <SelectItem value="Feminino">Feminino</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {error?.message && (
                          <Input.Message
                            color="error"
                            message={error.message}
                          />
                        )}
                      </div>
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input.Root>
                          <Input.Content
                            type="password"
                            id="password"
                            onChange={onChange}
                            value={value}
                          />
                        </Input.Root>

                        {error?.message && (
                          <Input.Message
                            color="error"
                            message={error.message}
                          />
                        )}
                      </div>
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="image_profile"
                  render={({ fieldState: { error } }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="photo_profile">Foto de perfil</Label>
                      <Input.Root>
                        <Input.Content
                          className="cursor-pointer"
                          type="file"
                          id="photo_profile"
                          onChange={(event) => {
                            const { target } = event;
                            if (target.files) {
                              setValue("image_profile", target.files);
                            }
                          }}
                        />
                      </Input.Root>

                      {error?.message && (
                        <Input.Message color="error" message={error.message} />
                      )}
                    </div>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" loading={loading}>
                  Cadastrar
                </Button>

                <Button
                  type="button"
                  onClick={handleRedirectLogin}
                  variant="outline"
                  className="w-full"
                >
                  Voltar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </main>
  );
}