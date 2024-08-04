import { api } from "@/config/api";
import axios from "axios";

export const PostsService = {
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
};
