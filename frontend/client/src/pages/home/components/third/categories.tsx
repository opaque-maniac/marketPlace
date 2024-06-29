import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <ul className="md:h-145 flex md:flex-row flex-col justify-center items-center gap-4">
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <p className="w-full text-center">Electronics</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <p className="w-full text-center">Books</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <p className="w-full text-center">Clothing</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24 bg-red-500"
        >
          <p className="w-full text-center">Home & Kitchen</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <p className="w-full text-center">Beauty & Health</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <p className="w-full text-center">Sports & Outdoors</p>
        </Link>
      </li>
      <li>
        <Link
          to={""}
          className="border border-black lg:w-40 h-145 block w-40 md:w-24"
        >
          <p className="w-full text-center">Toys & Games</p>
        </Link>
      </li>
    </ul>
  );
};

export default Categories;
