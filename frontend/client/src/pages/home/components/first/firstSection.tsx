import { Link } from "react-router-dom";
import FirstProducts from "./products";

const FirstSection = () => {
  return (
    <section className="md:flex justify-start items-center lg:gap-28 md:gap-0">
      <div className="lg:w-60 md:w-72 md:border-r-2 border-black md:h-350 md:pb-0 pb-8">
        <ul className="md:block flex justify-center items-center flex-wrap gap-6 px-4 md:w-auto w-10/12 md:mx-0 mx-auto">
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/ELECTRONICS"}
            >
              ELECTRONICS
            </Link>
          </li>
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/BOOKS"}
            >
              BOOKS
            </Link>
          </li>
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/CLOTHING"}
            >
              CLOTHING
            </Link>
          </li>
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/HOME_KITCHEN"}
            >
              HOME & KITCHEN
            </Link>
          </li>
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/BEAUTY_HEALTH"}
            >
              BEAUTY & HEALTH
            </Link>
          </li>
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/SPORTS_OUTDOORS"}
            >
              SPORTS & OUTDOORS
            </Link>
          </li>
          <li className="md:mb-6">
            <Link
              className="lg:no-underline lg:hover:underline underline"
              to={"/explore/TOYS_GAMES"}
            >
              TOYS & GAMES
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-center items-center">
        <FirstProducts />
      </div>
    </section>
  );
};

export default FirstSection;
