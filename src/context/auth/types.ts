import { ReactNode } from "react";

export interface DatasUserProps {
  id: string;
  name: string;
  username: string;
  gender: string;
  description: string | null;
  photo_profile: string;
  emoticons_drivers: EmoticonsDriversProps[];
}

export interface ContextAuthProps {
  signIn: (email: string, password: string) => Promise<SignInReturnProps>;
  signOut: () => void;
  datasUser: DatasUserProps | undefined;
  setDatasUser: (data: DatasUserProps | undefined) => void;
}

export interface SignInReturnProps {
  status: boolean;
  message: any;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
