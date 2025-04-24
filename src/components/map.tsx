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

		fetch('/api/eq', { cache: 'no-store', next: { revalidate: 3600 } })
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
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
		<div className='absolute top-0 left-0 z-0 h-screen w-full'>
			<MapContainer
				center={bounds.getCenter()}
				zoom={10}
				scrollWheelZoom={true}
				className='h-[calc(100vh)] w-full'
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
							Büyüklük: {item.magnitude}
							<br />
							Derinlik: {item.depth} km
							<br />
							Tarih: {new Date(item.date).toLocaleString()}
							<br />
							Koordinatlar: {item.latitude}, {item.longitude}
							<br />
							Şehir: {item.city}
							<br />
							Lokasyon: {item.location}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};
