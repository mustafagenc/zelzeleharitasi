import { FC, useCallback, useEffect, useState } from 'react';

interface DisplayCoordinatesProps {
	map: L.Map;
}

const DisplayCoordinates: FC<DisplayCoordinatesProps> = ({ map }) => {
	const [position, setPosition] = useState<L.LatLng>(() => map.getCenter());

	const onMove = useCallback((e: L.LeafletMouseEvent) => {
		setPosition(e.latlng);
	}, []);

	useEffect(() => {
		map.on('mousemove', onMove);
		return () => {
			map.off('mousemove', onMove);
		};
	}, [map, onMove]);

	return (
		<div className='absolute top-30 right-4 z-400 flex flex-col bg-white/80 dark:bg-black/80 p-2 text-sm font-semibold rounded-sm text-black dark:text-gray-200'>
			{position.lat.toFixed(6)}, {position.lng.toFixed(6)}
		</div>
	);
};

export default DisplayCoordinates;
