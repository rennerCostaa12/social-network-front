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
  getNewUsers: async () => {
    try {
      const responseNewUsers = await api.get("users/find-new-users");

      if (responseNewUsers.status) {
        return {
          status: true,
          message: "Dados de usuários capturados com sucesso",
          statusCode: 200,
          data: responseNewUsers.data,
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
  getFollowsUser: async (idUser: string) => {
    try {
      const response = await api.get(`users-followers/find-by-user/${idUser}`);

      if (response.status) {
        return {
          status: true,
          message: "Dados de usuários capturados com sucesso",
          statusCode: 200,
          data: response.data,
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
  getUsersRecommended: async (page: string = "1") => {
    try {
      const response = await api.get(`users/users-recommended?page=${page}`);
      
      if (response.status) {
        return {
          status: true,
          message: "Usuários listados com sucessp",
          statusCode: 200,
          data: response.data,
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
