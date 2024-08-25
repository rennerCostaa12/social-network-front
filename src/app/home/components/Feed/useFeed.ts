import { useAuthContext } from "@/context/auth";

export const useFeed = () => {
  const { datasUser } = useAuthContext();

  return {
    datasUser
  };
};
