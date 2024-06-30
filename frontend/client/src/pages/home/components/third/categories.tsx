import { Link } from "react-router-dom";
import ElectronicIcon from "./icons/electronicsIcon";
import BookIcon from "./icons/bookIcons";
import ClothesIcon from "./icons/clothesIcon";
import UtensilsIcon from "./icons/utensilsIcon";
import LipstickIcon from "./icons/lipstickIcon";
import SportsIcon from "./icons/sportsIcon";
import SpinnerIcon from "./icons/spinnerIcon";

const Categories = () => {
  return (
    <ul className="md:h-145 flex md:flex-row flex-col justify-center items-center gap-4">
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <div className="w-full p-4 h-24">
            <ElectronicIcon />
          </div>
          <p className="w-full text-center">Electronics</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <div className="w-full p-4 h-24">
            <BookIcon />
          </div>
          <p className="w-full text-center">Books</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <div className="w-full p-4 h-24">
            <ClothesIcon />
          </div>
          <p className="w-full text-center">Clothing</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24 bg-red-500"
        >
          <div className="w-full p-4 h-24">
            <UtensilsIcon />
          </div>
          <p className="w-full text-center">Home & Kitchen</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <div className="w-full p-4 h-24">
            <LipstickIcon />
          </div>
          <p className="w-full text-center">Beauty & Health</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <div className="w-full p-4 h-24">
            <SportsIcon />
          </div>
          <p className="w-full text-center">Sports & Outdoors</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <div className="w-full p-4 h-24">
            <SpinnerIcon />
          </div>
          <p className="w-full text-center">Toys & Games</p>
        </Link>
      </li>
    </ul>
  );
};

export default Categories;
