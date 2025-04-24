import { useMapGeographyStore } from "@/lib/mapGeographyStore";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { useMap } from "react-leaflet";
import { Button } from "../ui/button";
import { MdMyLocation } from "react-icons/md";


const LocationButton: FC = () => {
  const { location } = useMapGeographyStore();
  const map = useMap();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickToCenter = () => {
    if (location) {
      const selectedLocationData: [number, number] = [
        location?.[0],
        location?.[1],
      ];

      map.flyTo(selectedLocationData, 17);
    } else {
      enqueueSnackbar(
        "Şu an konumunuza ulaşamıyoruz. Lütfen konum bilgisi için izin veriniz!",
        {
          variant: "warning",
        }
      );
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClickToCenter} className="cursor-pointer rounded-full">
      <MdMyLocation />
    </Button>
  );
};

export default LocationButton;
