import TEarthquake from '@/models/earthquake';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import useUserLocation from './useUserLocation';

export const MapContent = () => {
	const [data, setData] = useState<TEarthquake[] | null>(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		L.Icon.Default.mergeOptions({
			iconUrl: '/map/marker-icon.png',
			shadowUrl: '/map/marker-shadow.png',
		});

		fetch('/api/eq')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
				console.log(data);
			});
	}, []);

	const userLocation = useUserLocation();

	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No data available</p>;
	
	// const bounds: L.LatLngBounds = L.latLngBounds(
		// 	data.map((item) => [item.latitude, item.longitude]) as [
			// 		number,
			// 		number
			// 	][]
			// );

	const bounds: L.LatLngBounds = L.latLngBounds(
		userLocation.location
			? [[userLocation.location[0], userLocation.location[1]]]
			: [[0, 0]]
	);

	return (
		<>
			<MapContainer
				center={bounds.getCenter()}
				zoom={10}
				scrollWheelZoom={true}
				className='z-10 h-screen w-full'
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{data.map((item, index) => (
					<Marker
						key={index}
						position={[item.latitude, item.longitude]}
						icon={L.divIcon({
							className: 'custom-icon',
							html: `<div class="marker marker-${item.priority}">${item.magnitude}</div>`,
						})}
						zIndexOffset={item.zIndexOffset}
					>
						<Popup>
							{item.magnitude} {item.zIndexOffset}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	);
};
