import axios from "axios";
import { api } from "@/config/api";

export const PostsService = {
  getPostsFeed: async (page: string = "1") => {
    try {
      const responsePostsFeed = await api.get(
        `posts/find-posts-feed?page=${page}`
      );

      if (responsePostsFeed.status) {
        return {
          status: true,
          message: "Listagem de posts feito com sucesso",
          statusCode: 200,
          data: responsePostsFeed.data,
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
