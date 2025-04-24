import type { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	return {
		name: 'Deprem Haritası',
		short_name: 'Deprem Haritası',
		description: "Türkiye'deki son 500 depremi gösteren harita uygulaması.",
		start_url: '/',
		display: 'standalone',
		background_color: '#FFFFFF',
		theme_color: '#7FD0EC',
		orientation: 'portrait',
		icons: [
			{
				src: '/favicon/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/favicon/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/favicon/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
			{
				src: '/favicon/favicon-16x16.png',
				sizes: '16x16',
				type: 'image/png',
			},
			{
				src: '/favicon/favicon-32x32.png',
				sizes: '32x32',
				type: 'image/png',
			},
		],
	};
}
