'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const DynamicMap = dynamic(
	() => import('@/components/map').then((mod) => mod.MapContent),
	{
		ssr: false,
	}
);

export default function Page() {
	const router = useRouter();

	setTimeout(() => {
		router.refresh();
	}, 60000);

	return (
		<>
			<DynamicMap />
		</>
	);
}
