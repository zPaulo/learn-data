import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trilha Data Analyst Jr | Do Zero ao Analista de Dados",
  description: "Roadmap interativo do zero ao Analista de Dados Junior. Acompanhe seu progresso com 74 habilidades, 8 categorias e 3 projetos de portfólio.",
  keywords: ["analista de dados", "data analyst", "roadmap", "checklist", "aprender dados"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030712] text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
