import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { TypeFormSchemaRegister, DataRegisterUserProps } from "./types";
import { FormSchemaRegister } from "./schema";

import { RegisterUserServices } from "./services";

export const useRegisterUser = () => {
  const { handleSubmit, control, setValue } = useForm<TypeFormSchemaRegister>({
    resolver: zodResolver(FormSchemaRegister),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleRedirectLogin = () => {
    router.push("/login");
  };

  const handleRegisterUser = async (data: TypeFormSchemaRegister) => {
    const objectData: DataRegisterUserProps = {
      name: data.name,
      username: data.username,
      description: null,
      password: data.password,
      gender: data.gender,
      photo_profile: "",
    };
    
    setLoading(true);
    
    const responseRegister = await RegisterUserServices.registerUser(
      objectData,
      data.image_profile[0]
    );

    setLoading(false);

    if (responseRegister?.status) {
      toast.success("Sucesso", {
        description: responseRegister?.message,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error("Error", {
        description: responseRegister?.message,
      });
    }
  };

  return {
    handleRedirectLogin,
    handleSubmit,
    Controller,
    handleRegisterUser,
    control,
    loading,
    setValue,
  };
};
