import {
  useImperativeHandle,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Portal from "../Portal";

export type DialogHandle = Pick<HTMLDialogElement, "showModal" | "close">;

type DialogProps = {
  ref: RefObject<DialogHandle | null>;
  className?: string;
  children: ReactNode;
};

export default function Dialog({ ref, className, children }: DialogProps) {
  const modal = document.getElementById("root-modal"),
    modalRef = useRef<HTMLDialogElement | null>(null);
  if (!modal) throw Error("Modal does not exist...");

  useImperativeHandle(ref, () => {
    return {
      showModal() {
        modalRef.current?.showModal();
      },
      close() {
        modalRef.current?.close();
      },
    };
  }, []);

  return (
    <Portal container={modal}>
      <dialog ref={modalRef} className={className}>
        {children}
      </dialog>
    </Portal>
  );
}
