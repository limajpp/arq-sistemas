import { Plus } from "lucide-react";
import Button from "../ui/Button";

type AddTaskButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  className: string;
};

export default function AddTaskButton({
  className,
  ...rest
}: AddTaskButtonProps) {
  return (
    <Button className={className} {...rest}>
      <Plus className="text-white" />
    </Button>
  );
}
