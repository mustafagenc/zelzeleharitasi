'use client';

import Link from 'next/link';
import { PiBowlSteamFill } from 'react-icons/pi';

export const Footer = () => {
	return (
		<>
			<footer className='z-10 fixed bottom-10 right-10 left-10 bg-white flex flex-col lg:flex-row items-center justify-center dark:bg-black p-4 text-shadow-2xs text-xs rounded-md select-none'>
				<div>
					Bu uygulamada yayımlanan her türlü bilgi, veri ve haritalara
					ilişkin telif hakları münhasıran Boğaziçi Üniversitesi
					Rektörlüğü’ne ait olup, Boğaziçi Üniversitesi Kandilli
					Rasathanesi ve Deprem Araştırma Enstitüsü Bölgesel
					Deprem-Tsunami İzleme Ve Değerlendirme Merkezi kaynak
					gösterilerek kullanılabilir. Söz konusu bilgi, veri ve
					haritalar Boğaziçi Üniversitesi Rektörlüğü’nün yazılı izni
					ve onayı olmadan herhangi bir şekilde ticari amaçlı
					kullanılamaz.
				</div>
				<div className='flex items-center justify-center lg:mt-0 mt-4'>
					<Link
						href='https://x.com/search?q=IStandWithPalastine&f=live'
						target='_blank'
						className='flex h-7 w-40 flex-row items-center space-x-1.5 rounded-sm bg-gray-600 bg-[url(/palestine.svg)] bg-contain bg-right bg-no-repeat px-2 py-1 pr-9 text-white shadow-sm transition duration-200 ease-in-out hover:opacity-90'
					>
						<span className='text-shadow text-xs'>
							#IStandWithPalestine
						</span>
					</Link>
					<Link
						href='https://buymeacoffee.com/mustafagenc'
						target='_blank'
						className='ml-2 flex h-7 w-40 flex-row items-center space-x-1.5 rounded-sm bg-blue-500 px-2 py-1 text-white shadow-sm transition duration-200 ease-in-out hover:opacity-90 dark:bg-blue-600'
					>
						<PiBowlSteamFill className='h-5 w-5' />
						<span className='text-shadow text-xs'>
							Bana bir çay ısmarla
						</span>
					</Link>
				</div>
			</footer>
		</>
	);
};
