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
  title: {
    default: "Trilha Data Analyst Jr | Do Zero ao Analista de Dados",
    template: "%s | Trilha Data Analyst",
  },
  description: "Roadmap interativo e gratuito do zero ao Analista de Dados Junior. Acompanhe seu progresso com 74 habilidades, 8 categorias e 3 projetos de portfólio. Aprenda SQL, Python, Power BI, estatística e muito mais.",
  keywords: [
    "analista de dados", "data analyst", "roadmap", "checklist", "aprender dados",
    "SQL", "Python", "Power BI", "estatística", "Excel",
    "ciência de dados", "data science", "análise de dados", "portfólio dados",
    "carreira dados", "junior data analyst",
  ],
  authors: [{ name: "Trilha Data Analyst" }],
  openGraph: {
    title: "Trilha Data Analyst Jr | Do Zero ao Analista de Dados",
    description: "Roadmap interativo e gratuito com 74 habilidades, 8 categorias e 3 projetos de portfólio para se tornar Analista de Dados Junior.",
    type: "website",
    locale: "pt_BR",
    siteName: "Trilha Data Analyst",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trilha Data Analyst Jr | Do Zero ao Analista de Dados",
    description: "Roadmap interativo e gratuito com 74 habilidades para se tornar Analista de Dados Junior.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
