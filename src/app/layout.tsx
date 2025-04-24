import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/header/header';
import Providers from '@/providers/providers';
import { Footer } from '@/components/footer/footer';

const inter = Inter({
	subsets: ['latin', 'latin-ext'],
	display: 'swap',
	variable: '--font-inter',
});

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
	subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
	title: "Türkiye'deki Son Depremler",
	description: 'Türkiye Deprem Haritası',
	icons: {
		icon: '/favicon/favicon.ico',
		shortcut: '/favicon/favicon.ico',
		apple: '/favicon/apple-touch-icon.png',
	},
	openGraph: {
		title: "Türkiye'deki Son Depremler",
		description: 'Türkiye Deprem Haritası',
		url: 'https://zelzeleharitasi.vercel.app',
		siteName: 'Türkiye Deprem Haritası',
		images: [
			{
				url: 'https://zelzeleharitasi.vercel.app/screenshot.png',
				width: 1200,
				height: 630,
				alt: 'Türkiye Deprem Haritası',
			},
		],
		locale: 'tr_TR',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: "Türkiye'deki Son Depremler",
		description: 'Türkiye Deprem Haritası',
		images: ['https://zelzeleharitasi.vercel.app/screenshot.png'],
		creator: '@mustafagenc',
	},
	themeColor: '#ffffff',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Türkiye Deprem Haritası',
		startupImage: ['/favicon/apple-touch-icon.png'],
	},
	manifest: '/manifest.json',
	verification: {
		google: 'google-site-verification=ES0QwoqxsmF4vhAUGLdsf4Hd6VOUqDSGkudEpq1Srmc',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='tr'
			className='scroll-smooth'
			suppressHydrationWarning={true}
		>
			<body
				className={`${inter.variable} ${poppins.variable} flex flex-col antialiased`}
			>
				<Providers>
					<Header />
					<main className='grow'>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
