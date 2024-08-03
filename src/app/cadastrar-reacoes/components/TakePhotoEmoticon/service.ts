import { api } from "@/config/api";
import axios from "axios";

export const TakePhotoEmoticonService = {
  registerPhoto: async (image: File, user: string, category: number) => {
    try {
      const formData = new FormData();

      formData.append("user", user);
      formData.append("category", String(category));
      formData.append("img_driver", image);

      const responseTakePhoto = await api.post("emoticons-driver", formData);

      if (responseTakePhoto.status) {
        return {
          status: true,
          message: "Foto salva com sucesso",
          statusCode: 201,
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
