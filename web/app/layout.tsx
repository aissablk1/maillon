import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Macro-typographie structurelle — Archivo Black uppercase tracking négatif.
// (Inter est explicitement banni par ~/.claude/design-anti-slop.md §4.)
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo",
  display: "swap",
});

// Micro-typographie data/télémétrie — JetBrains Mono.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/aissablk1/maillon"),
  title: {
    default: "MAILLON / RÉSEAU MESH 868 MHZ",
    template: "%s · MAILLON",
  },
  description:
    "Communications mesh radio longue portée — 30 km à vue, 300 km en relais. Sans abonnement satellite, sans licence, sans dépendance opérateur. Kits préconfigurés et console de flotte pour secours bénévoles, BTP, événementiel et outdoor.",
  keywords: [
    "mesh longue portée",
    "Meshtastic France",
    "communication off-grid",
    "LoRa 868 MHz",
    "talkie sans abonnement",
    "secours bénévoles",
    "alternative Garmin inReach",
  ],
  authors: [{ name: "MAILLON" }],
  alternates: {
    canonical: "https://github.com/aissablk1/maillon",
    languages: { "fr-FR": "https://github.com/aissablk1/maillon" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://github.com/aissablk1/maillon",
    siteName: "MAILLON",
    title: "MAILLON / RÉSEAU MESH 868 MHZ",
    description:
      "Communications mesh radio longue portée — 30 km à vue, 300 km en relais. Sans abonnement, sans satellite, sans licence.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MAILLON" }],
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
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MAILLON",
  url: "https://github.com/aissablk1/maillon",
  description:
    "Communications mesh radio longue portée — kits préconfigurés et console de flotte pour secours bénévoles, BTP, événementiel et outdoor.",
  areaServed: { "@type": "Country", name: "France" },
  sameAs: ["https://github.com/aissablk1/maillon", "https://github.com/aissablk1"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
