type LabelProps = React.ComponentPropsWithoutRef<"label"> & {
  className?: string;
};

export default function Label({ className, ...rest }: LabelProps) {
  return <label className={className} {...rest} />;
}
