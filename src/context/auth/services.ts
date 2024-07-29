import axios from "axios";

import { api } from "@/config/api";

export const AuthService = {
  signIn: async (username: string, password: string) => {
    try {
      const responseSignIn = await api.post("auth/login", {
        username,
        password,
      });

      if (responseSignIn.status) {
        return {
          status: true,
          message: "Login efetuado com sucesso",
          statusCode: 200,
          data: responseSignIn.data,
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
