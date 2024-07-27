import { useRouter } from "next/navigation";

export const useFooter = () => {
  const { push } = useRouter();

  const handleRedirect = (nameRoute: string) => {
    push(nameRoute);
  };

  return {
    handleRedirect,
  };
};
