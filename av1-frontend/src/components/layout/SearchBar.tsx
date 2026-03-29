import { Search } from "lucide-react";
import Input from "../ui/Input";

type SearchBarProps = React.ComponentPropsWithoutRef<"input"> & {
  className: string;
  inputClassName: string;
};

export default function SearchBar({
  className,
  inputClassName,
  ...rest
}: SearchBarProps) {
  return (
    <div className={className}>
      <Search className="absolute top-1.5 left-3 text-gray-400" />
      <Input className={inputClassName} {...rest} />
    </div>
  );
}
