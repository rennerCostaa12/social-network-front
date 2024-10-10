import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/auth";

import { ServicesGeneral } from "@/services/index";

import { UserListCommentsProps } from "./types";

export const useListComments = ({ setVisibleModalComments }: UserListCommentsProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { datasUser } = useAuthContext();

  const handleDeleteComment = async (idComment: string) => {
    setLoading(true);
    const responseDelete = await ServicesGeneral.deleteCommentsPost(idComment);
    setLoading(false);

    if (responseDelete?.status) {
      toast.success("Sucesso", {
        description: responseDelete?.message,
      });

      router.refresh();
      setVisibleModalComments(false);
    } else {
      toast.error("Error", {
        description: responseDelete?.message,
      });
    }
  };

  return {
    handleDeleteComment,
    loading,
    datasUser
  };
};
