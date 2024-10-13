import type { Metadata } from "next";
import { Header } from "@/app/home/components/Header";
import { Footer } from "@/app/home/components/Footer";

export const metadata: Metadata = {
  title: "Pesquisa",
  description: "Pesquisa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
