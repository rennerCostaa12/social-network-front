import axios from "axios";
import { api } from "@/config/api";

import { DatasUserProps } from "@/context/auth/types";

export const CardProfileService = {
  editProfile: async (idUser: string, dataUser: DatasUserProps) => {
    try {
      const responseEditProfile = await api.patch(`users/${idUser}`, {
        name: dataUser.name,
        username: dataUser.username,
        gender: dataUser.gender,
        description: dataUser.description,
      });

      if (responseEditProfile.status) {
        return {
          status: true,
          message: "Usuário editado com sucesso",
          statusCode: 200,
          data: responseEditProfile.data,
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
