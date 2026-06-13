import type { Metadata, Viewport } from "next";
import { Nunito, EB_Garamond } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "MCTD — Ministère Catholique de Transformation et de Développement",
  description: "Vivre de la vie de Dieu. Plateforme digitale du Ministère Catholique de Transformation et de Développement (MCTD) — Faire sortir le peuple de la pauvreté, à Abidjan, Côte d'Ivoire.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`h-full ${nunito.variable} ${garamond.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
