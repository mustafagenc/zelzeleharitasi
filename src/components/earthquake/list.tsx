import { useFormatter, useNow, useTranslations } from 'next-intl';
import { FC } from 'react';

import L from 'leaflet';
import TPagedEarthquake from '@/models/pagedEarthquakes';

interface ListProps {
    map: L.Map | null;
    data: TPagedEarthquake;
}

export const List: FC<ListProps> = ({ map, data }) => {
    const format = useFormatter();
    const now = useNow();
    const t = useTranslations('Shared');

    if (!map) return null;

    return (
        <div className='w-full'>
            {data.results.length === 0 && (
                <div className='flex items-center justify-center w-full h-full'>
                    <span className='text-gray-500 text-sm'>{t('NoData')}</span>
                </div>
            )}
            {data.results.map((eq) => (
                <div
                    key={eq.id}
                    className='flex items-start gap-2 border-b-1 border-gray-50 w-full dark:border-gray-900 dark:hover:bg-gray-950 hover:bg-gray-100 cursor-pointer p-3 rounded-sm'
                    onClick={() => {
                        const latLang = [eq.latitude, eq.longitude] as [
                            number,
                            number,
                        ];
                        map.closePopup();
                        map.flyTo(latLang, 14, { animate: true });
                    }}
                >
                    <div
                        className={`rounded-sm bg-gray-200 w-10 p-0 text-center text-sm font-semibold priority-${eq.priority} dark:text-gray-800`}
                    >
                        {eq.magnitude}
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-sm'>
                            {eq.location}
                        </span>
                        <span className='text-gray-500 text-xs'>
                            {eq.depth} km {' • '}
                            {format.dateTime(new Date(eq.date), {
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                            {' • '}
                            {format.relativeTime(eq.date, now)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
