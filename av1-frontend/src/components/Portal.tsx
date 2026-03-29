import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  container: Element | DocumentFragment;
};

export default function Portal({ children, container }: PortalProps) {
  return createPortal(children, container);
}
