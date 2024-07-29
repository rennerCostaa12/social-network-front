"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { useLogin } from "./useLogin";

import { Input } from "@/components/Input";

export default function Login() {
  const { handleLogin, loading, Controller, control, handleSubmit } =
    useLogin();

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Image
              className="rounded-full"
              src="/logo-704apps.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            Faça login na sua conta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm max-sm:w-full">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <Controller
                control={control}
                name="username"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-foreground"
                    >
                      Nome de usuário
                    </Label>
                    <Input.Root>
                      <Input.Content onChange={onChange} value={value} />
                      {error?.message && (
                        <div className="mt-2">
                          <Input.Message
                            color="error"
                            message={error.message}
                          />
                        </div>
                      )}
                    </Input.Root>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-foreground"
                      >
                        Senha
                      </Label>
                      {/* <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-primary"
                    prefetch={false}
                  >
                    Esqueceu a senha?
                  </Link>
                </div> */}
                    </div>
                    <div className="mt-2">
                      <Input.Root>
                        <Input.Content
                          type="password"
                          onChange={onChange}
                          value={value}
                        />
                        {error?.message && (
                          <Input.Message
                            color="error"
                            message={error.message}
                          />
                        )}
                      </Input.Root>
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-primary"
                loading={loading}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
