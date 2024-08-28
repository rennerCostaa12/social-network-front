import { api } from "@/config/api";
import axios from "axios";

export const EmoticonsDriverService = {
  getAllEmoticonsDriver: async (idDriver: string) => {
    try {
        const responseEmoticonsDriver = await api.get(`emoticons-driver/find-emoticons-by-user/${idDriver}`);

        if(responseEmoticonsDriver.status){
            return responseEmoticonsDriver.data;
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
