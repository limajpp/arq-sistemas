import type { ReactNode } from "react";

type HeaderProps = React.ComponentPropsWithoutRef<"header"> & {
  className: string;
  children: ReactNode;
};

export default function Header({ className, children, ...rest }: HeaderProps) {
  return (
    <header className={className} {...rest}>
      {children}
    </header>
  );
}
