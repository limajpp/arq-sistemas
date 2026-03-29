import Select from "../ui/Select";

type FilterProps = React.ComponentPropsWithoutRef<"select"> & {
  className: string;
  spanClassName: string;
  selectClassName: string;
  selectOptions: string[];
};

export default function Filter({
  className,
  spanClassName,
  selectClassName,
  selectOptions,
  ...rest
}: FilterProps) {
  return (
    <div className={className}>
      <span className={spanClassName}>Filter by:</span>
      <Select className={selectClassName} {...rest}>
        {selectOptions.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option.toUpperCase()}
            </option>
          );
        })}
      </Select>
    </div>
  );
}
