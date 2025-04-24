'use client';

import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Theme accentColor="blue" panelBackground="solid" radius="small">
        {children}
        <Analytics />
        <SpeedInsights />
      </Theme>
    </ThemeProvider>
  );
}