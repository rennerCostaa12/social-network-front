import axios from "axios";
import { api } from "@/config/api";

export const UsersServices = {
  searchUsers: async (nameUser: string) => {
    try {
      const responseUsers = await api.get(`users/find-user/${nameUser}`);

      if (responseUsers.status) {
        return {
          status: true,
          message: "Dados de usuários capturados com sucesso",
          statusCode: 200,
          data: responseUsers.data,
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
