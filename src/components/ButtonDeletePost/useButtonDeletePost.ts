import { toast } from "sonner";
import { useState } from "react";
import { ServicesGeneral } from "@/services/index";

export const useButtonDeletePost = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async (idPost: string) => {
    setLoading(false);
    const responseDeletePost = await ServicesGeneral.deletePost(idPost);
    setLoading(true);

    if (responseDeletePost?.status) {
      toast.success("Sucesso", {
        description: responseDeletePost?.message,
      });
      window.location.reload();
    } else {
      toast.error("Error", {
        description: responseDeletePost?.message,
      });
    }
  };

  return {
    handleConfirm,
    loading,
  };
};
