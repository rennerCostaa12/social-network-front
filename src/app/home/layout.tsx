import type { Metadata } from "next";
import { Header } from "@/app/home/components/Header";
import { Footer } from "@/app/home/components/Footer";

export const metadata: Metadata = {
  title: "Home",
  description: "Feed da rede social",
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
        <main
          className="container mx-auto"
          style={{
            minHeight: "calc(100vh - 135px)",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
