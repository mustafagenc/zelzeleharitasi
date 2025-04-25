"use client";

import "@radix-ui/themes/styles.css";

import { ThemeProvider } from "next-themes";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Theme } from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Theme accentColor="blue" panelBackground="solid" radius="small">
          {children}
          <Analytics />
          <SpeedInsights />
        </Theme>
      </ThemeProvider>
      <GoogleAnalytics gaId="G-JVB0DWQPQC" />
    </>
  );
}
