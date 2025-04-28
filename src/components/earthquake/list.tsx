import { useFormatter, useNow } from "next-intl";
import { FC } from "react";

import L from "leaflet";
import { Earthquakes } from "@prisma/client";

interface ListProps {
  map: L.Map | null;
  data: Earthquakes[];
}

export const List: FC<ListProps> = ({ map, data }) => {
  const format = useFormatter();
  const now = useNow();

  if (!map) return null;

  return (
    <div className="w-full">
      {data
        .map((item) => {
          return { ...item, date: new Date(item.date) };
        })
        .map((eq, index) => (
          <div
            key={index}
            className="flex items-start gap-2 mb-3 border-b-1 border-gray-50 w-full dark:border-gray-900 dark:hover:bg-gray-950 hover:bg-gray-100 cursor-pointer p-3 rounded-sm"
            onClick={() => {
              const latLang = [eq.latitude, eq.longitude] as [number, number];

              map.closePopup();
              map.flyTo(latLang, 14, { animate: true });

              // createMarker(map, latLang).addTo(map).bindPopup("Test").openPopup();
            }}
          >
            <div
              className={`rounded-sm bg-gray-200 w-10 text-center font-semibold priority-${eq.priority} dark:text-gray-800`}
            >
              {eq.magnitude}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{eq.location}</span>
              <span className="text-gray-500 text-sm">
                {eq.depth} km {" • "}
                {format.dateTime(new Date(eq.date), {
                  hour: "numeric",
                  minute: "numeric",
                })}
                {" • "}
                {format.relativeTime(eq.date, now)}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
