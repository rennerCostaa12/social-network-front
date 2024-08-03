import { api } from "@/config/api";
import axios from "axios";

import { DataRegisterUserProps } from "./types";

export const RegisterUserServices = {
  registerUser: async (dataUser: DataRegisterUserProps, image: File) => {
    try {
      const formData = new FormData();

      formData.append("name", dataUser.name);
      formData.append("username", dataUser.username);
      formData.append("gender", dataUser.gender);
      formData.append("password", dataUser.password);
      formData.append("image", image);

      const responseRegister = await api.post("users", formData);

      if (responseRegister.status) {
        return {
          status: true,
          message: "Cadastro realizado com sucesso",
          datas: responseRegister.data,
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
