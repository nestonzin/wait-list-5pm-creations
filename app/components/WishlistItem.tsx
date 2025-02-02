import { Check } from "lucide-react";

export const WishlistItem = ({
  name,
  description,
  isChecked,
  onCheckChange,
}: {
  name: string;
  description: string;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}) => {
  return (
    <div className="mb-4 border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-center">
        <div
          className={`mr-4 h-6 w-6 cursor-pointer border-4 border-black ${
            isChecked ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => onCheckChange(!isChecked)}
        >
          {isChecked && <Check className="h-4 w-4 text-white" />}
        </div>
        <div>
          <h3 className="font-bold uppercase">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
