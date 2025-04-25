'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { GithubButton } from './github-button';
import { ThemeSwitcher } from './theme-switcher';
import { LocaleSwitcher } from './locale-switcher';

export const Navbar = () => {
    const t = useTranslations('Header');
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
                                {t('Title')}
                            </span>
                            <span className='hidden lg:block text-xs'>
                                {t('Subtitle')}
                            </span>
                            <span className='lg:hidden text-2xl font-semibold'>
                                {t('ShortTitle')}
                            </span>
                            <span className='lg:hidden text-xs'>
                                {t('ShortSubtitle')}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='no-scrollbar hidden items-center gap-x-4 sm:flex md:max-w-72 lg:max-w-96'></div>
                    <GithubButton />
                    <LocaleSwitcher />
                    <ThemeSwitcher />
                </div>
            </nav>
        </>
    );
};
