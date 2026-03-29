import Title from "../layout/Title";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-1/2">
      <Title
        titleText="My Tasks"
        titleSubText="Organize and manage your daily tasks"
      />
    </div>
  );
}
