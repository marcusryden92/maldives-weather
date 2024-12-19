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
  onLocationChange: Dispatch<SetStateAction<LocationType>>;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationChange,
}) => {
  const handleValueChange = (value: string) => {
    onLocationChange(value as LocationType);
  };

  return (
    <div className="w-full max-w-xs animate-fade-in">
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 border-white/20 text-gray-800 font-medium">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
          {locations.map((location) => (
            <SelectItem
              key={location.id}
              value={location.id}
              className="text-gray-800 hover:bg-accent/20 focus:bg-accent/20"
            >
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export type { LocationSelectorProps };
