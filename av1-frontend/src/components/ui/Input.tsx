type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  className: string;
};

export default function Input({ className, ...rest }: InputProps) {
  return <input className={className} {...rest} />;
}
