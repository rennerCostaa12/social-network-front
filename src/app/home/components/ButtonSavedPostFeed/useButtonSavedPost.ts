import { toast } from "sonner";

import { SavePostServices } from "@/services/save-posts";

export const useButtonSavedPost = ({ setIsSavedPost }: any) => {
  const handleSavePost = async (idPost: string) => {
    const responseSavePost = await SavePostServices.savePost(idPost);

    if (responseSavePost?.status) {
      toast.success("Sucesso", {
        description: responseSavePost.message,
      });
      setIsSavedPost(true);

    } else {
      toast.error("Error", {
        description: responseSavePost?.message,
      });
    }
  };

  const handleRemovePost = async (idPost: string) => {
    const responseRemovePost = await SavePostServices.removeSavedPost(idPost);

    if (responseRemovePost?.status) {
      toast.success("Sucesso", {
        description: responseRemovePost.message,
      });

      setIsSavedPost(false);

    } else {
      toast.error("Error", {
        description: responseRemovePost?.message,
      });
    }
  };

  return {
    handleSavePost,
    handleRemovePost,
  };
};