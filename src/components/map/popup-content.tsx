import { Earthquakes } from "@prisma/client";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { Popup } from "react-leaflet";

interface PopUpContentProps {
  item: Earthquakes;
}

const PopUpContent: FC<PopUpContentProps> = ({ item }) => {
  const t = useTranslations("Map");
  return (
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
        <li>{t("Location", { location: item.location ?? "" })}</li>
        <li>{t("City", { city: item.city ?? "" })}</li>
      </ul>
    </Popup>
  );
};

export default PopUpContent;
