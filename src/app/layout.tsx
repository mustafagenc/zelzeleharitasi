import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/header/header";
import Providers from "@/providers/providers";
import { Footer } from "@/components/footer/footer";

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

export const metadata: Metadata = {
  title: "Türkiye'deki Son Depremler",
  description: "Türkiye Deprem Haritası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} ${poppins.variable} flex flex-col antialiased`}
      >
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
