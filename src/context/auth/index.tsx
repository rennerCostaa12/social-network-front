import Cookies from "universal-cookie";
import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@/config/api";
import { AuthService } from "./services";

import {
  AuthContextProviderProps,
  ContextAuthProps,
  DatasUserProps,
  SignInReturnProps,
} from "./types";

const AuthContext = createContext<ContextAuthProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [datasUser, setDatasUser] = useState<DatasUserProps | undefined>(
    undefined
  );

  const cookies = new Cookies();

  const updateHeaders = async (
    token?: string | undefined,
    dataUser?: DatasUserProps | undefined
  ) => {
    if (token) {
      cookies.set("@social_network:token_user", token);
      cookies.set("@social_network:datas_user", JSON.stringify(dataUser));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      const tokenStorage = cookies.get("@social_network:token_user");
      if (tokenStorage) {
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
      }
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<SignInReturnProps> => {
    const responseSignIn = await AuthService.signIn(email, password);

    if (responseSignIn?.status) {
      localStorage.setItem(
        "@social_network:token_user",
        responseSignIn.data.access_token
      );
      localStorage.setItem(
        "@social_network:datas_user",
        JSON.stringify(responseSignIn.data.user)
      );
      
      setDatasUser(responseSignIn.data.user);
      updateHeaders(responseSignIn.data.access_token, responseSignIn.data.user);
    }

    return {
      status: responseSignIn?.status ? responseSignIn.status : false,
      message: responseSignIn?.message,
    };
  };

  const signOut = () => {
    cookies.remove("@social_network:token_user", { path: "/" });
    localStorage.removeItem("@social_network:token_user");
    localStorage.removeItem("@social_network:datas_user");
  };

  useEffect(() => {
    const responseDatasUser = localStorage.getItem(
      "@social_network:datas_user"
    );

    if (responseDatasUser) {
      setDatasUser(JSON.parse(responseDatasUser));
    }
    updateHeaders();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, datasUser, setDatasUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const response = useContext(AuthContext);

  if (!response) {
    throw new Error(
      "useAuthContext needs to be used inside AuthContextProvider"
    );
  }

  return response;
};
