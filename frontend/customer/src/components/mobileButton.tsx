import { MouseEventHandler, useState } from "react";
import MenuIcon from "./icons/menuIcon";
import Navigation from "./navigation";
import Modal from "./modal";

const MobileButton = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(() => true);
  };

  const callback = () => {
    setClicked(() => false);
  };

  return (
    <div>
      <button
        aria-label="Open menu"
        onClick={clickHanlder}
        className="w-6 h-6 md:hidden block"
      >
        <MenuIcon />
      </button>
      {clicked && (
        <div className="md:hidden block">
          <Modal callback={callback}>
            <Navigation callback={callback} />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default MobileButton;
