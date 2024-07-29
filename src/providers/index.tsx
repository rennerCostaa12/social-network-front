"use client";

import { ReactNode } from "react";

import { AuthContextProvider } from "@/context/auth";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
