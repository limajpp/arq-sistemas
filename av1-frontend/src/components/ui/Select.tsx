import type { ReactNode } from "react";

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  className: string;
  children: ReactNode;
};

export default function Select({ className, children, ...rest }: SelectProps) {
  return (
    <select className={className} {...rest}>
      {children}
    </select>
  );
}
