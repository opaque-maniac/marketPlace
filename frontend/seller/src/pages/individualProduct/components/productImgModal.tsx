import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const ProductImgModal = ({ children }: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return;
    if (elRef.current) {
      modalRoot.appendChild(elRef.current);
    }
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div className="z-40 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen">
      {children}
    </div>,
    elRef.current
  );
};

export default ProductImgModal;
