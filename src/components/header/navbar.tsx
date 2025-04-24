'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GithubButton } from './github-button';
import { ThemeSwitcher } from './theme-switcher';

export const Navbar = () => {
	return (
		<>
			<nav className='relative mx-auto flex w-full max-w-7xl items-center justify-between'>
				<div>
					<Link
						href={'/'}
						className='grid grid-flow-col content-stretch items-center gap-4'
					>
						<div>
							<Image
								className='h-14 w-14'
								src='/earthquake-svgrepo-com.svg'
								alt="Türkiye'deki Son Depremler"
								width={512}
								height={512}
							/>
						</div>
						<div className='font-popins text-2xl font-semibold text-shadow-xs dark:shadow-blue-900'>
							<span className='hidden lg:block'>
								Türkiye&apos;deki Son Depremler
							</span>
							<span className='lg:hidden'>Depremler</span>
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
