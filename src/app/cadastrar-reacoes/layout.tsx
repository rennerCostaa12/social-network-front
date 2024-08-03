import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastrar Reações",
  description: "Cadastrar reações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-dvh">{children}</body>
    </html>
  );
}
