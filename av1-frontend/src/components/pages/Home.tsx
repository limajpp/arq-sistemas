import { useRef, useState } from "react";
import AddTaskButton from "../layout/AddTaskButton";
import Filter from "../layout/Filter";
import NewTaskDialogContent from "../layout/NewTaskDialogContent";
import SearchBar from "../layout/SearchBar";
import Task from "../layout/Task";
import Title from "../layout/Title";
import Dialog, { type DialogHandle } from "../ui/Dialog";
import api from "../services/api";
import { Frown } from "lucide-react";

const filterOptions = ["all", "pending", "done"];
export type Task = {
  title: string;
  description: string;
  done: boolean;
};

type Feedback = {
  type: "error" | "success";
  message: string;
};

export default function Home() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const modalRef = useRef<DialogHandle | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    done: false,
  });
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function createTask() {
    if (!task.title.trim() || !task.description.trim()) {
      setFeedback({
        type: "error",
        message: "The title and description fields must not be empty.",
      });
      return;
    }

    try {
      await api.post("/tasks", task);
      setTasksList((prev) => [...prev, task]);
      setFeedback({
        type: "success",
        message: "Task created successfully.",
      });

      setTimeout(() => {
        setTask({ title: "", description: "", done: false });
        setFeedback(null);
        handleModal();
      }, 1200);
    } catch {
      setFeedback({
        type: "error",
        message: "Could not create task. Please try again.",
      });
    }
  }

  function handleModal() {
    if (!modal) {
      setModal(true);
      modalRef.current?.showModal();
    } else {
      setModal(false);
      setFeedback(null);
      modalRef.current?.close();
    }
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = tasksList.filter((task) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "pending" && !task.done) ||
      (selectedFilter === "done" && task.done);

    if (!matchesFilter) return false;

    if (!normalizedQuery) return true;

    return (
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <>
      <div className="flex flex-col h-full w-1/2 gap-8">
        <Title
          titleText="My Tasks"
          titleSubText={`Organize and manage your daily tasks (${tasksList.length})`}
        />
        <SearchBar
          className="relative w-full text-sm"
          inputClassName="w-full py-2 px-12 rounded-md bg-gray-200 focus:shadow-lg focus:shadow-gray-300 focus:outline-3 focus:outline-gray-300"
          placeholder="Search for Tasks..."
          type="text"
          name="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Filter
          className="flex flex-row items-center w-fit gap-3"
          spanClassName="text-sm opacity-70"
          selectClassName="px-2 py-0.5 rounded-md bg-gray-200 focus:outline-none"
          selectOptions={filterOptions}
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
        />
        <div className="flex flex-col h-full gap-4">
          {filteredTasks.length !== 0 ? (
            filteredTasks.map((task, index) => (
              <Task
                key={`${task.title}-${index}`}
                title={task.title}
                description={task.description}
                done={task.done}
                className="flex flex-row items-center justify-between rounded-xl border border-gray-300 p-4 bg-gray-50"
              />
            ))
          ) : (
            <div className="flex flex-row gap-2 m-auto">
              <Frown className="opacity-70" />
              <p className="m-auto opacity-70">
                {tasksList.length === 0
                  ? "No Tasks here..."
                  : "No matching tasks found..."}
              </p>
            </div>
          )}
        </div>
        <AddTaskButton
          onClick={handleModal}
          className="ml-auto p-2 rounded-full bg-stone-900 hover:cursor-pointer hover:bg-stone-800"
        />
      </div>
      <Dialog
        ref={modalRef}
        className={`${modal ? "flex" : "none"} flex-col justify-center gap-4 m-auto h-fit w-1/3 p-4 rounded-xl open:shadow-2xl bg-gray-50`}
      >
        <NewTaskDialogContent
          title={task.title}
          description={task.description}
          taskDone={task.done}
          onTitleChange={(value) =>
            setTask((prev) => ({
              ...prev,
              title: value,
            }))
          }
          onDescriptionChange={(value) =>
            setTask((prev) => ({
              ...prev,
              description: value,
            }))
          }
          onToggleTaskDone={() =>
            setTask((prev) => ({
              ...prev,
              done: !prev.done,
            }))
          }
          statusMessage={feedback?.message}
          statusType={feedback?.type}
          onCancel={handleModal}
          onCreate={createTask}
        />
      </Dialog>
    </>
  );
}
