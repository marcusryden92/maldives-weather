import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationType } from "@/lib/weatherData";
import { Dispatch, SetStateAction } from "react";

const locations = [
  { id: "male", name: "Malé" },
  { id: "addu", name: "Addu City" },
  { id: "maafushi", name: "Maafushi" },
  { id: "fuvahmulah", name: "Fuvahmulah" },
] as const;

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: Dispatch<SetStateAction<LocationType>>;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onLocationChange,
}) => {
  const handleValueChange = (value: string) => {
    onLocationChange(value as LocationType);
  };

  return (
    <div className="flex w-full gap-4 animate-fade-in">
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => {
            handleValueChange(location.id);
          }}
          className={`min-w-[10rem] px-5 py-2 rounded-md text-gray-800 hover:bg-accent/20  ${
            selectedLocation === location.id
              ? "shadow-inner-heavy"
              : "shadow-md"
          }`}
        >
          {location.name}
        </button>
      ))}
    </div>
  );
};

export type { LocationSelectorProps };
