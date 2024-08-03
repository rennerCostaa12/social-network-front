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
};
