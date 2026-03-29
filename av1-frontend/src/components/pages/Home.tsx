import SearchBar from "../layout/SearchBar";
import Title from "../layout/Title";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-1/2 gap-6">
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
    </div>
  );
}
