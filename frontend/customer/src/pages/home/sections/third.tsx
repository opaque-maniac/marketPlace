import { Link } from "react-router-dom";

const ThirdSection = () => {
  return (
    <section className="h-32 flex justify-center items-center">
      <Link
        to={"/explore"}
        aria-label="View all products"
        className="h-14 w-56 roundend-sm bg-red-400 text-white flex justify-center items-center"
      >
        <span>View All Products</span>
      </Link>
    </section>
  );
};

export default ThirdSection;
