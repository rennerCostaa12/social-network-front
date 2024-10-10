import { useRouter } from "next/navigation";

export const useFooter = () => {
  const router = useRouter();

  const handleRedirect = (nameRoute: string) => {
    router.push(nameRoute);
  };

  return {
    handleRedirect,
  };
};
