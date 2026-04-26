import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maillon.fr"),
  title: {
    default: "MAILLON — Le réseau qui porte loin",
    template: "%s · MAILLON",
  },
  description:
    "Solutions de communication mesh longue portée jusqu'à 300 km. Sans abonnement, sans satellite, sans licence. Kits préconfigurés et SaaS de gestion de flotte pour secours, BTP, agriculture, événementiel et outdoor.",
  keywords: [
    "mesh longue portée",
    "Meshtastic France",
    "communication off-grid",
    "LoRa 868 MHz",
    "talkie sans abonnement",
    "secours bénévoles",
    "comms BTP zone blanche",
    "alternative Garmin inReach",
  ],
  authors: [{ name: "MAILLON" }],
  creator: "MAILLON",
  publisher: "MAILLON",
  alternates: {
    canonical: "https://maillon.fr",
    languages: {
      "fr-FR": "https://maillon.fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maillon.fr",
    siteName: "MAILLON",
    title: "MAILLON — Le réseau qui porte loin",
    description:
      "Communication mesh longue portée jusqu'à 300 km. Kits prêts à l'emploi et SaaS de gestion de flotte. Sans abonnement, sans satellite.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MAILLON — Le réseau qui porte loin",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
