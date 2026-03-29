type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  className?: string;
};

export default function TextArea({ className, ...rest }: TextAreaProps) {
  return <textarea className={className} {...rest} />;
}
