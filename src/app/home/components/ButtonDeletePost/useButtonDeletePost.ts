import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ServicesGeneral } from "@/services";

export const useButtonDeletePost = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleConfirm = async (idPost: string) => {
    setLoading(false);
    const responseDeletePost = await ServicesGeneral.deletePost(idPost);
    setLoading(true);

    if (responseDeletePost?.status) {
      toast.success("Sucesso", {
        description: responseDeletePost?.message,
      });
      router.refresh();
    } else {
      toast.error("Error", {
        description: responseDeletePost?.message,
      });
    }
  };

  return {
    handleConfirm,
    loading
  };
};
