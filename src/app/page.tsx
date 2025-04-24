'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
	() => import('@/components/map').then((mod) => mod.MapContent),
	{
		ssr: false,
	}
);

export default function Page() {
	return (
		<div className='relative'>
			<DynamicMap />
			<div className='z-10 fixed bottom-10 right-10 left-10 bg-black opacity-45 px-4 py-2 text-shadow-2xs text-xs rounded-md select-none'>
				Bu uygulama Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem
				Araştırma Enstitüsü (KRDAE)tarafından sağlanan verileri
				kullanmaktadır. Tüm deprem verilerinin telif hakları Boğaziçi
				Üniversitesi Rektörlüğü&apos;ne aittir. Bu veri bilimsel ve
				bilgilendirme amaçlı kullanılabilir ancak ticari amaçla
				kullanılamaz.
			</div>
		</div>
	);
}
