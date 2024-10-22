import { Link } from "react-router-dom";
import ChevronDown from "../icons/chevrondown";
import { useState } from "react";
import ChevronUp from "../icons/chevronup";

const StaffDropMenu = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <div className="w-10/12">
        <Link to={"/staff"} className="hover:underline">
          <p>Staff</p>
        </Link>
      </div>
      <div className="w-2/12">
        <button
          onClick={(e) => {
            e.preventDefault();
            setClicked(() => !clicked);
          }}
          className="h-5 w-5 block mx-auto border border-black/25 rounded-full"
        >
          {clicked ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
    </>
  );
};

export default StaffDropMenu;
