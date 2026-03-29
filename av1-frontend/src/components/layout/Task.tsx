import { Pencil, Trash2 } from "lucide-react";
import Card from "../ui/Card";

type TaskProps = React.ComponentPropsWithoutRef<"div"> & {
  className: string;
  title: string;
  description: string;
  done: boolean;
};

export default function Task({
  className,
  title,
  description,
  done,
  ...rest
}: TaskProps) {
  return (
    <Card className={className} {...rest}>
      <div className="flex flex-col justify-center">
        <h1
          className={`text-xl font-semibold ${done ? "line-through opacity-60" : ""}`}
        >
          {title}
        </h1>
        <p className="text-sm opacity-70">{description}</p>
      </div>
      <div className="flex flex-row gap-4">
        <Pencil className="text-gray-500 hover:bg-gray-50 hover:cursor-pointer" />
        <Trash2 className="text-red-500 hover:bg-red-50 hover:cursor-pointer" />
      </div>
    </Card>
  );
}
