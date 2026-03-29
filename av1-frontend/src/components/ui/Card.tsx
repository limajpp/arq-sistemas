import type { ReactNode } from "react";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  className: string;
  children: ReactNode;
};

export default function Card({ className, children, ...rest }: CardProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
