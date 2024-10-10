import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/auth";

import { ServicesGeneral } from "@/services/index";

export const useListComments = ({ setVisibleModalComments, setCountComments }: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { datasUser } = useAuthContext();

  const router = useRouter();

  const handleDeleteComment = async (idComment: string) => {
    setLoading(true);
    const responseDelete = await ServicesGeneral.deleteCommentsPost(idComment);
    setLoading(false);

    if (responseDelete?.status) {
      toast.success("Sucesso", {
        description: responseDelete?.message,
      });

      setCountComments((currentValue: number) => currentValue - 1);
      setVisibleModalComments(false);
      router.refresh();
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
