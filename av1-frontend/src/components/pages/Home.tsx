import { useRef, useState } from "react";
import AddTaskButton from "../layout/AddTaskButton";
import Filter from "../layout/Filter";
import NewTaskDialogContent from "../layout/NewTaskDialogContent";
import SearchBar from "../layout/SearchBar";
import Task from "../layout/Task";
import Title from "../layout/Title";
import Dialog, { type DialogHandle } from "../ui/Dialog";

const filterOptions = ["all", "pending", "done"];

export default function Home() {
  const modalRef = useRef<DialogHandle | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [taskDone, setTaskDone] = useState<boolean>(false);

  function handleModal() {
    if (!modal) {
      setModal(true);
      modalRef.current?.showModal();
    } else {
      setModal(false);
      modalRef.current?.close();
    }
  }

  return (
    <>
      <div className="flex flex-col h-full w-1/2 gap-8">
        <Title
          titleText="My Tasks"
          titleSubText="Organize and manage your daily tasks"
        />
        <SearchBar
          className="relative w-full text-sm"
          inputClassName="w-full py-2 px-12 rounded-md bg-gray-200 focus:shadow-lg focus:shadow-gray-300 focus:outline-3 focus:outline-gray-300"
          placeholder="Search for Tasks..."
          type="text"
          name="search"
        />
        <Filter
          className="flex flex-row items-center w-fit gap-3"
          spanClassName="text-sm opacity-70"
          selectClassName="px-2 py-0.5 rounded-md bg-gray-200 focus:outline-none"
          selectOptions={filterOptions}
        />
        <div className="flex flex-col h-full gap-4">
          <Task className="flex flex-row items-center justify-between rounded-xl border border-gray-300 p-4 bg-gray-50" />
        </div>
        <AddTaskButton
          onClick={handleModal}
          className="ml-auto p-2 rounded-full bg-stone-900 hover:cursor-pointer hover:bg-stone-800"
        />
      </div>
      <Dialog
        ref={modalRef}
        className={`${modal ? "flex" : "none"} flex-col gap-4 m-auto h-1/3 w-1/3 p-4 rounded-xl open:shadow-2xl bg-gray-50`}
      >
        <NewTaskDialogContent
          taskDone={taskDone}
          onToggleTaskDone={() => setTaskDone((prev) => !prev)}
          onCancel={handleModal}
        />
      </Dialog>
    </>
  );
}
