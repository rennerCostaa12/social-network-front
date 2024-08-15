import axios from "axios";
import { api } from "@/config/api";

export const SavePostServices = {
  savePost: async (postId: string) => {
    try {
      const responseSavePost = await api.post("posts-saves", {
        post: postId,
      });

      if (responseSavePost.status) {
        return {
          status: true,
          message: "Post salvo com sucesso",
          statusCode: 201,
          data: responseSavePost.data,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        };
      }
    }
  },
  removeSavedPost: async (idPost: string) => {
    try {
      const responseRemovePost = await api.delete(`posts-saves/${idPost}`);

      if (responseRemovePost.status) {
        return {
          status: true,
          message: "Post removido com sucesso",
          statusCode: 200,
          data: responseRemovePost.data,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        };
      }
    }
  },
};
