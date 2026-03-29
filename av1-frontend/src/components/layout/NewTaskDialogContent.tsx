import { ToggleLeft, ToggleRight } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import TextArea from "../ui/TextArea";

type NewTaskDialogContentProps = {
  title: string;
  description: string;
  taskDone: boolean | undefined;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onToggleTaskDone: () => void;
  statusMessage?: string;
  statusType?: "error" | "success";
  onCancel: () => void;
  onCreate: () => void;
};

export default function NewTaskDialogContent({
  title,
  description,
  taskDone,
  onTitleChange,
  onDescriptionChange,
  onToggleTaskDone,
  statusMessage,
  statusType,
  onCancel,
  onCreate,
}: NewTaskDialogContentProps) {
  return (
    <>
      <h2 className="text-lg font-semibold">New Task</h2>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Title</Label>
          <Input
            required
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            className="py-1 px-2 rounded-md bg-gray-200 focus:shadow-lg focus:shadow-gray-300 focus:outline-3 focus:outline-gray-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Description</Label>
          <TextArea
            required
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            className="py-1 px-2 rounded-md bg-gray-200 focus:shadow-lg focus:shadow-gray-300 focus:outline-3 focus:outline-gray-300"
          />
        </div>
        <div className="flex flex-row justify-between">
          <span className="font-semibold">Task Done?</span>
          <Button onClick={onToggleTaskDone} className="">
            {taskDone ? (
              <ToggleRight className="text-black" />
            ) : (
              <ToggleLeft className="text-gray-500" />
            )}
          </Button>
        </div>
        {statusMessage && (
          <p
            className={`text-sm ${
              statusType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMessage}
          </p>
        )}
        <div className="flex flex-row justify-end gap-2">
          <Button
            onClick={onCancel}
            className="px-4 py-1 rounded-lg border border-slate-300 hover:bg-gray-300 hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            className="px-4 py-1 rounded-lg text-white bg-stone-950 hover:bg-stone-700 hover:cursor-pointer"
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
