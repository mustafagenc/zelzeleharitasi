import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';

import L, { LatLng, LatLngBounds, LatLngTuple } from 'leaflet';
import { FC, useState } from 'react';
import { MapContainer, Marker, ScaleControl, TileLayer } from 'react-leaflet';

import { useMapGeographyStore } from '@/lib/mapGeographyStore';
import { useMapEvents } from '@/lib/useMapEvents';
import { UserLocationMarker } from '@/lib/utils';
import TEarthquake from '@/models/earthquake';

import DisplayCoordinates from './coordinates';
import useUserLocation from './user-location';
import { List } from '../earthquake/list';
import PopUpContent from './popup-content';
import EqLoading from './eq-loading';

const MapEvents = () => {
    useMapEvents();
    return null;
};

interface MapContentProps {
    data: TEarthquake[];
}

export const MapContent: FC<MapContentProps> = ({ data }) => {
    const [map, setMap] = useState<L.Map | null>(null);

    const { location: userLocation, loading } = useUserLocation();
    const { zoom } = useMapGeographyStore();

    if (loading) {
        return <EqLoading />;
    }

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
        <div className='flex flex-col lg:flex-row w-full h-[calc(100vh-132px)] lg:border-t-1 lg:border-b-1'>
            <div className='h-[calc(100vh-132px)] w-130 hidden overflow-auto lg:flex p-4 border-r-1'>
                {map != null && <List data={data} map={map} />}
            </div>
            <div className='relative overflow-hidden h-full w-full'>
                <MapContainer
                    center={userLocation || locationCenter}
                    zoom={zoom}
                    minZoom={7}
                    ref={setMap}
                    zoomSnap={1}
                    zoomDelta={1}
                    className='z-1 h-full w-full'
                    preferCanvas={true}
                    maxBoundsViscosity={1}
                    maxBounds={mapBoundaries}
                    maxZoom={18}
                    placeholder={<EqLoading />}
                >
                    <MapEvents />
                    <TileLayer url={baseMapUrl} />
                    <ScaleControl
                        metric={true}
                        position='bottomleft'
                        imperial={false}
                    />
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={userLocationIcon}
                        />
                    )}
                    {data.map((item, index) => (
                        <Marker
                            key={index}
                            position={[item.latitude, item.longitude]}
                            icon={L.divIcon({
                                className: 'css-icon',
                                html: `<div class="marker priority-${item.priority}">${index == 0 ? '<div class="ring">&nbsp;</div>' : ''}${item.magnitude}</div>`,
                            })}
                            zIndexOffset={item.zIndexOffset}
                        >
                            <PopUpContent item={item} />
                        </Marker>
                    ))}
                    {/* <div className="absolute top-30 right-4 z-400 flex flex-col ">
          <LocationButton />
        </div> */}
                    {map ? <DisplayCoordinates map={map} /> : null}
                </MapContainer>
            </div>
        </div>
    );
};
