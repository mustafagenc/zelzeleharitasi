import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: "Türkiye'deki Son Depremler",
	description: 'Türkiye Deprem Haritası',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='tr'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
