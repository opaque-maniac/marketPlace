import Image from "next/image";
import MenuButton from "./menuButton";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="flex justify-between items-center md:px-14 px-4 py-2 mb-2 border-b border-black/50 h-14 fixed top-0 left-0 right-0 w-screen bg-white">
      <div style={{ height: "40px", width: "40px" }}>
        <Logo />
      </div>
      <div>
        <MenuButton />
      </div>
    </header>
  );
};

export default Header;
