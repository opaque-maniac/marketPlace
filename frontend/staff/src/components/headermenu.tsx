import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import MenuIcon from "./icons/menuIcon";
import Modal from "./modal";
import Navigation from "./navigation";

export default function HeaderMenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.key === "ArrowLeft") {
        setIsMenuOpen(() => true);
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.shiftKey && e.key === "ArrowLeft") {
          setIsMenuOpen(() => true);
        }
      });
    };
  }, []);

  const closeCallback = useCallback(() => {
    setIsMenuOpen(() => false);
  }, []);

  const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen(() => true);
  };
  return (
    <>
      <button
        onClick={handleMenuToggle}
        className="h-7 w-7 border border-black/25 rounded-sm flex items-center justify-center"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>
      {isMenuOpen && (
        <Modal callback={closeCallback}>
          <Navigation callback={closeCallback} />
        </Modal>
      )}
    </>
  );
}
