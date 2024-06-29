import { Link } from "react-router-dom";
import FirstProducts from "./products";
import SecondProducts from "./products";

const SecondSection = () => {
  return (
    <section className="">
      <div className="flex justify-start items-center gap-4">
        <div className="h-8 w-4 roundend animate-bounce bg-red-500 rounded-lg"></div>
        <div>
          <p className="text-red-400 text-lg">Today</p>
        </div>
      </div>
      <div>
        <SecondProducts />
      </div>
    </section>
  );
};

export default SecondSection;
