import { api } from "@/config/api";
import { useAuthContext } from "@/context/auth";

export const useFeed = () => {
  const { datasUser } = useAuthContext();

  const verifyAllEmoticonsDriverRegistered = async () => {
    try {
      const responseAllEmoticonsRegistered = await api.get(
        `emoticons-driver/search-emoticons-by-driver/${datasUser?.id}`
      );

      if (responseAllEmoticonsRegistered.status) {
        return responseAllEmoticonsRegistered.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    verifyAllEmoticonsDriverRegistered,
    datasUser
  };
};
