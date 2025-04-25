import type { Metadata } from "next";
import "@/styles/globals.css";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Inter, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { getLangDir } from "rtl-detect";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { routing } from "@/i18n/routing";
import Providers from "@/providers/providers";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const baseUrl = "https://zelzeleharitasi.vercel.app/";
  const imageData = {
    images: [
      {
        url: `${baseUrl}/screenshot.png`,
        width: 1200,
        height: 630,
        alt: t("Title"),
      },
    ],
  };
  return {
    metadataBase: new URL(`${baseUrl}/screenshot.png`),
    title: {
      default: t("Title"),
      template: `%s • ${t("Title")}`,
    },
    description: t("Description"),
    icons: {
      icon: `${baseUrl}/favicon/favicon.ico`,
      shortcut: `${baseUrl}/favicon/favicon.ico`,
      apple: `${baseUrl}/favicon/apple-touch-icon.png`,
    },
    openGraph: {
      ...imageData,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@mustafagenc",
      ...imageData,
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
    verification: {
      google:
        "google-site-verification=ES0QwoqxsmF4vhAUGLdsf4Hd6VOUqDSGkudEpq1Srmc",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("Title"),
      startupImage: [`${baseUrl}/favicon/apple-touch-icon.png`],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = getLangDir(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning={true}
      className="scroll-smooth"
    >
      <body
        className={`${inter.variable} ${poppins.variable} flex flex-col antialiased`}
      >
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
