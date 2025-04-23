'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
	() => import('@/components/map/map-content').then((mod) => mod.MapContent),
	{
		ssr: false,
	}
);

export default function Page() {
	return <DynamicMap />;
}
