import { useAuthContext } from "@/context/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./schema";
import { TypeFormSchema } from "./types";

export const useLogin = () => {
  const { control, setValue, reset, handleSubmit } = useForm<TypeFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { signIn } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (data: TypeFormSchema) => {
    try {
      setLoading(true);
      const responseSignIn = await signIn(data.username, data.password);

      if (responseSignIn.status) {
        router.push("/home");
      } else {
        toast.error("Error", {
          description: responseSignIn.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    Controller,
    control,
    setValue,
    reset,
    handleSubmit,
    router,
  };
};
