import { useState } from "react";
import { toast } from "sonner";

import { CardProfileService } from "./service";

import { useAuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

export const useCardProfile = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [description, setDescription] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const { datasUser, setDatasUser } = useAuthContext();

  const router = useRouter();

  const handleEditProfile = async () => {
    const objectUserData = {
      id: datasUser?.id ?? "",
      name,
      username,
      gender,
      description,
      photo_profile: datasUser?.photo_profile ?? "",
    };

    setLoading(true);

    const responseEditProfile = await CardProfileService.editProfile(
      datasUser?.id as string,
      objectUserData
    );

    setLoading(false);

    if (responseEditProfile?.status) {
      toast.success("Sucesso", {
        description: responseEditProfile.message,
      });

      setDatasUser({
        ...responseEditProfile.data.user,
        photo_profile: datasUser?.photo_profile,
        id: datasUser?.id,
      });

      router.refresh();
    } else {
      toast.error("Error", {
        description: responseEditProfile?.message,
      });
    }
  };

  return {
    handleEditProfile,
    name,
    setName,
    username,
    setUsername,
    gender,
    setGender,
    description,
    setDescription,
    loading,
  };
};
