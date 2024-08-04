import axios from "axios";
import { api } from "@/config/api";

import { DatasUserProps } from "@/context/auth/types";

export const CardProfileService = {
  editProfile: async (
    idUser: string,
    dataUser: DatasUserProps,
    photo_profile?: File
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", dataUser.name);
      formData.append("username", dataUser.username);
      formData.append("gender", dataUser.gender);

      if (dataUser.description) {
        formData.append("description", dataUser.description as string);
      }

      if(photo_profile){
        formData.append("image", photo_profile);
      }

      const responseEditProfile = await api.patch(`users/${idUser}`, formData);

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
