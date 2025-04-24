import TEarthquake from '@/models/earthquake';
import L, { LatLng, LatLngBounds, LatLngTuple, Map } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import useUserLocation from './user-location';
import { useMapGeographyStore } from '@/lib/mapGeographyStore';
import { useMapEvents } from '@/lib/useMapEvents';
import { UserLocationMarker } from '@/lib/utils';
import EqLoading from './eq-loading';
import EqDataError from './eq-data-error';
import DisplayCoordinates from './coordinates';

const MapEvents = () => {
	useMapEvents();
	return null;
};

export const MapContent = () => {
	const [data, setData] = useState<TEarthquake[] | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [map, setMap] = useState<L.Map | null>(null);

	useEffect(() => {
		fetch('/api/eq', { cache: 'no-store', next: { revalidate: 3600 } })
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	const { location: userLocation } = useUserLocation();
	const { zoom } = useMapGeographyStore();

	if (isLoading) return <EqLoading />;
	if (!data) return <EqDataError />;

	const mapBoundaries = new LatLngBounds(
		new LatLng(30.0, 25.0),
		new LatLng(44.0, 45.0)
	);

	const additionalBounds = [
		new LatLng(35.0, 32.0),
		new LatLng(35.0, 38.0),
		new LatLng(33.0, 42.0),
		new LatLng(40.0, 45.0),
		new LatLng(42.0, 45.0),
		new LatLng(43.0, 28.0),
	];

	additionalBounds.forEach((coord) => {
		mapBoundaries.extend(coord);
	});

	const userLocationIcon = new L.Icon({
		iconUrl: UserLocationMarker,
		iconRetinaUrl: UserLocationMarker,
		iconSize: [36, 36],
		iconAnchor: [14, 14],
	});

	const locationCenter: LatLngTuple = [39.9255, 32.8663];

	const dpr = window.devicePixelRatio;
	const baseMapUrl = `https://mt0.google.com/vt/scale=${dpr}&hl=en&x={x}&y={y}&z={z}`;
	//const openStreetMapUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;

	return (
		<div className='absolute top-0 left-0 z-0 h-screen w-full'>
			<MapContainer
				center={userLocation || locationCenter}
				zoom={zoom}
				minZoom={7}
				ref={setMap}
				zoomSnap={1}
				zoomDelta={1}
				className='h-[calc(100vh)] w-full'
				preferCanvas={true}
				maxBoundsViscosity={1}
				maxBounds={mapBoundaries}
				maxZoom={18}
			>
				<MapEvents />
				<TileLayer url={baseMapUrl} />
				{userLocation && (
					<Marker position={userLocation} icon={userLocationIcon} />
				)}
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
				{/* <div className="absolute top-30 right-4 z-400 flex flex-col ">
          <LocationButton />
        </div> */}
				{map ? <DisplayCoordinates map={map} /> : null}
			</MapContainer>
		</div>
	);
};
