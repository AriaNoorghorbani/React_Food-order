import { useRef } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      modal.current.showModal();
    }
  }, [open]);
  return createPortal(
    <modal className={`modal ${className}`} ref={dialog}>
      {children}
    </modal>,
    document.getElementById("modal")
  );
}
