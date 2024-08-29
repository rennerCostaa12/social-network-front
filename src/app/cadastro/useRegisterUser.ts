import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { TypeFormSchemaRegister, DataRegisterUserProps } from "./types";
import { FormSchemaRegister } from "./schema";

import { RegisterUserServices } from "./services";

export const useRegisterUser = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TypeFormSchemaRegister>({
    resolver: zodResolver(FormSchemaRegister),
  });

  const [imageCaptured, setImageCaptured] = useState<File | null>(null);

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
        window.location.href = "/login";
      }, 2000);
    } else {
      toast.error("Error", {
        description: responseRegister?.message,
      });
    }
  };

  const handleRemoveFileSelected = () => {
    setImageCaptured(null);
  };

  useEffect(() => {
    if (imageCaptured) {
      setValue("image_profile", [imageCaptured]);
    } else {
      setValue("image_profile", null);
    }
  }, [imageCaptured]);

  return {
    handleRedirectLogin,
    handleSubmit,
    Controller,
    handleRegisterUser,
    control,
    loading,
    setValue,
    imageCaptured,
    setImageCaptured,
    handleRemoveFileSelected,
  };
};
