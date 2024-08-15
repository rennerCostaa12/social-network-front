import axios from "axios";
import { api } from "@/config/api";

export const ReactionsPostsServices = {
  registerReaction: async (emoticonsDriver: number, idPost: string) => {
    try {
      const responseRegisterReaction = await api.post("reactions", {
        emoticons_driver: emoticonsDriver,
        post: idPost,
      });

      if (responseRegisterReaction.status) {
        return {
          status: true,
          message: "Registro de reação efetuada com sucesso",
          statusCode: 201,
          data: responseRegisterReaction.data,
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
  unregisterRegister: async (idPost: string) => {
    try {
      const responseUnregisterReaction = await api.delete(
        `reactions/${idPost}`
      );

      if (responseUnregisterReaction.status) {
        return {
          status: true,
          message: "Reação deletada com sucesso",
          statusCode: 200,
          data: responseUnregisterReaction.data,
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
