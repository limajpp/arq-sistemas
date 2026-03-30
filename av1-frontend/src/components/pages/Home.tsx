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
  id: number;
  title: string;
  description: string;
  done: boolean;
};

type TaskForm = Omit<Task, "id">;

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
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [task, setTask] = useState<TaskForm>({
    title: "",
    description: "",
    done: false,
  });
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function openModal() {
    setModal(true);
    modalRef.current?.showModal();
  }

  function closeModal() {
    setModal(false);
    setFeedback(null);
    modalRef.current?.close();
  }

  function resetDialogForm() {
    setTask({ title: "", description: "", done: false });
    setDialogMode("create");
    setEditingTaskId(null);
  }

  function handleOpenCreateModal() {
    resetDialogForm();
    openModal();
  }

  async function createTask() {
    if (!task.title.trim() || !task.description.trim()) {
      setFeedback({
        type: "error",
        message: "The title and description fields must not be empty.",
      });
      return;
    }

    try {
      const response = await api.post<Task>("/tasks", task);
      setTasksList((prev) => [...prev, response.data]);
      setFeedback({
        type: "success",
        message: "Task created successfully.",
      });

      setTimeout(() => {
        resetDialogForm();
        closeModal();
      }, 1200);
    } catch {
      setFeedback({
        type: "error",
        message: "Could not create task. Please try again.",
      });
    }
  }

  async function handleOpenEditModal(taskId: number) {
    try {
      const response = await api.get<Task>(`/tasks/${taskId}`);
      setDialogMode("edit");
      setEditingTaskId(taskId);
      setTask({
        title: response.data.title,
        description: response.data.description,
        done: response.data.done,
      });
      setFeedback(null);
      openModal();
    } catch {
      setFeedback({
        type: "error",
        message: "Could not load task data for editing. Please try again.",
      });
    }
  }

  async function updateTask() {
    if (editingTaskId === null) return;

    if (!task.title.trim() || !task.description.trim()) {
      setFeedback({
        type: "error",
        message: "The title and description fields must not be empty.",
      });
      return;
    }

    try {
      const response = await api.put<Task>(`/tasks/${editingTaskId}`, task);
      setTasksList((prev) =>
        prev.map((currentTask) =>
          currentTask.id === editingTaskId ? response.data : currentTask,
        ),
      );
      setFeedback({
        type: "success",
        message: "Task updated successfully.",
      });

      setTimeout(() => {
        resetDialogForm();
        closeModal();
      }, 1200);
    } catch {
      setFeedback({
        type: "error",
        message: "Could not update task. Please try again.",
      });
    }
  }

  async function deleteTask(taskId: number) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!shouldDelete) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasksList((prev) => prev.filter((task) => task.id !== taskId));
    } catch {
      setFeedback({
        type: "error",
        message: "Could not delete task. Please try again.",
      });
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
            filteredTasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                description={task.description}
                done={task.done}
                className="flex flex-row items-center justify-between rounded-xl border border-gray-300 p-4 bg-gray-50"
                onEdit={() => handleOpenEditModal(task.id)}
                onDelete={() => deleteTask(task.id)}
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
          onClick={handleOpenCreateModal}
          className="ml-auto p-2 rounded-full bg-stone-900 hover:cursor-pointer hover:bg-stone-800"
        />
      </div>
      <Dialog
        ref={modalRef}
        className={`${modal ? "flex" : "none"} flex-col justify-center gap-4 m-auto h-fit w-1/3 p-4 rounded-xl open:shadow-2xl bg-gray-50`}
      >
        <NewTaskDialogContent
          heading={dialogMode === "create" ? "New Task" : "Edit Task"}
          submitLabel={dialogMode === "create" ? "Create" : "Save"}
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
          onCancel={closeModal}
          onSubmit={dialogMode === "create" ? createTask : updateTask}
        />
      </Dialog>
    </>
  );
}
