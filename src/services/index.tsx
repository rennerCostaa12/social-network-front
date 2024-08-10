import { api } from "@/config/api";
import axios from "axios";

export const ServicesGeneral = {
  verifyRegisterEmoticonsByUser: async (idUser: string) => {
    try {
      const responseEmoticons = await api.get(
        `emoticons-driver/search-emoticons-by-driver/${idUser}`
      );

      if (responseEmoticons.status) {
        return {
          status: true,
          message: "Registros de emoticons do usuário retornado com sucesso",
          statusCode: 200,
          data: responseEmoticons.data,
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
  addPost: async (
    userId: string,
    comment: File,
    picture_post: File,
    cityId: number
  ) => {
    try {
      const formData = new FormData();

      formData.append("user", userId);
      formData.append("comment", comment);
      formData.append("picture_post", picture_post);
      formData.append("city_id", String(cityId));

      const responsePost = await api.post("posts", formData);

      if (responsePost.status) {
        return {
          status: true,
          message:
            "Seu post foi enviado e está aguardando passar pela a análise dos gestores",
          statusCode: 201,
          data: responsePost.data,
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
  deletePost: async (idPost: string) => {
    try {
      const responseDeletePost = await api.delete(`posts/${idPost}`);

      if (responseDeletePost.status) {
        return {
          status: true,
          message: "Post deletado com sucesso",
          statusCode: 200,
          data: responseDeletePost.data,
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
  commentPost: async (comment: File, user: string, post: string) => {
    try {
      const formData = new FormData();

      formData.append("comment", comment);
      formData.append("user", user);
      formData.append("post", post);

      const responseComments = await api.post("comments", formData);

      if (responseComments.status) {
        return {
          status: true,
          message: "Comentário inserido com sucesso",
          statusCode: 201,
          data: responseComments.data,
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
  findCommentsByPost: async (idPost: string) => {
    try {
      const responseCommentsByPost = await api.get(
        `comments/find-comment-by-post/${idPost}`
      );

      if (responseCommentsByPost.status) {
        return {
          status: true,
          message: "Comentários capturados com sucesso",
          statusCode: 200,
          data: responseCommentsByPost.data,
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
  deleteCommentsPost: async (idComment: string) => {
    try {
      const responseDeleteComment = await api.delete(`comments/${idComment}`);

      if (responseDeleteComment.status) {
        return {
          status: true,
          message: "Comentário deletado com sucesso",
          statusCode: 200,
          data: responseDeleteComment.data,
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
