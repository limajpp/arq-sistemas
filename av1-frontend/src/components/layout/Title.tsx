import Header from "../ui/Header";

type TitleProps = {
  titleText: string;
  titleSubText?: string;
};

export default function Title({ titleText, titleSubText }: TitleProps) {
  return (
    <Header className="flex flex-col w-fit gap-2">
      <h1 className="text-3xl font-semibold">{titleText}</h1>
      <p className="opacity-70">{titleSubText}</p>
    </Header>
  );
}
