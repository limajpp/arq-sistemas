import type { ReactNode } from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  className: string;
  children: ReactNode;
};

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
