import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";

import L, { LatLng, LatLngBounds, LatLngTuple } from "leaflet";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  ScaleControl,
  TileLayer,
} from "react-leaflet";

import { useMapGeographyStore } from "@/lib/mapGeographyStore";
import { useMapEvents } from "@/lib/useMapEvents";
import { UserLocationMarker } from "@/lib/utils";
import TEarthquake from "@/models/earthquake";

import DisplayCoordinates from "./coordinates";
import EqDataError from "./eq-data-error";
import EqLoading from "./eq-loading";
import useUserLocation from "./user-location";

const MapEvents = () => {
  useMapEvents();
  return null;
};

export const MapContent = () => {
  const t = useTranslations("Map");

  const [data, setData] = useState<TEarthquake[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    fetch("/api/eq", { next: { revalidate: 3600 } }) //cache: 'no-store',
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
    new LatLng(44.0, 45.0),
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
    <MapContainer
      center={userLocation || locationCenter}
      zoom={zoom}
      minZoom={7}
      ref={setMap}
      zoomSnap={1}
      zoomDelta={1}
      className="z-1 h-[calc(100vh-132px)] w-full"
      preferCanvas={true}
      maxBoundsViscosity={1}
      maxBounds={mapBoundaries}
      maxZoom={18}
    >
      <MapEvents />
      <TileLayer url={baseMapUrl} />
      <ScaleControl metric={true} position="bottomleft" imperial={false} />
      {userLocation && (
        <Marker position={userLocation} icon={userLocationIcon} />
      )}
      {data.map((item, index) => (
        <Marker
          key={index}
          position={[item.latitude, item.longitude]}
          icon={L.divIcon({
            className: "custom-icon",
            html: `<div class="marker marker-${item.priority}">${item.magnitude}</div>`,
          })}
          zIndexOffset={item.zIndexOffset}
        >
          <Popup>
            <ul className="list-none text-sm/6">
              <li>{t("Magnitude", { magnitude: item.magnitude })}</li>
              <li>{t("Depth", { depth: item.depth })}</li>
              <li>
                {t("Date", {
                  date: new Date(item.date),
                })}
              </li>
              <li>
                {t("Coordinates", {
                  latitude: item.latitude,
                  longitude: item.longitude,
                })}
              </li>
              <li>{t("Location", { location: item.location })}</li>
              <li>{t("City", { city: item.city })}</li>
            </ul>
          </Popup>
        </Marker>
      ))}
      {/* <div className="absolute top-30 right-4 z-400 flex flex-col ">
          <LocationButton />
        </div> */}
      {map ? <DisplayCoordinates map={map} /> : null}
    </MapContainer>
  );
};
