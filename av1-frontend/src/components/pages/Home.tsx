import AddTaskButton from "../layout/AddTaskButton";
import Filter from "../layout/Filter";
import SearchBar from "../layout/SearchBar";
import Task from "../layout/Task";
import Title from "../layout/Title";

const filterOptions = ["all", "pending", "done"];

export default function Home() {
  return (
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
      <AddTaskButton className="ml-auto p-2 rounded-full bg-stone-900 hover:cursor-pointer hover:bg-stone-800" />
    </div>
  );
}
