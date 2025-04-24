'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GithubButton } from './github-button';
import { ThemeSwitcher } from './theme-switcher';

export const Navbar = () => {
	return (
		<>
			<nav className='relative mx-auto px-1 lg:px-2 flex w-full items-center justify-between'>
				<div>
					<Link
						href={'/'}
						className='grid grid-flow-col content-stretch items-center gap-4'
					>
						<div>
							<Image
								className='h-13 w-13 drop-shadow-sm'
								src='/zelzeleharitasi-logo.png'
								alt="Türkiye'deki Son Depremler"
								width={512}
								height={512}
							/>
						</div>
						<div className='font-popins flex flex-col items-start justify-center text-left'>
							<span className='hidden lg:block m-0 p-0 text-2xl font-semibold text-shadow-xs '>
								Türkiye&apos;deki Son Depremler
							</span>
							<span className='hidden lg:block text-xs'>
								Türkiye&apos;deki son 500 depremi gösteren
								harita uygulaması.
							</span>
							<span className='lg:hidden text-2xl font-semibold'>
								Depremler
							</span>
							<span className='lg:hidden text-xs'>
								Son 500 deprem.
							</span>
						</div>
					</Link>
				</div>
				<div className='flex items-center space-x-4'>
					<div className='no-scrollbar hidden items-center gap-x-4 sm:flex md:max-w-72 lg:max-w-96'></div>
					<GithubButton />
					<ThemeSwitcher />
				</div>
			</nav>
		</>
	);
};
