import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locations = [
  { id: "male", name: "Malé" },
  { id: "addu", name: "Addu City" },
  { id: "maafushi", name: "Maafushi" },
  { id: "fuvahmulah", name: "Fuvahmulah" },
];

export const LocationSelector = ({
  onLocationChange,
}: {
  onLocationChange: (location: string) => void;
}) => {
  return (
    <div className="w-full max-w-xs animate-fade-in">
      <Select onValueChange={onLocationChange}>
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