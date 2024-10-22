import { Link } from "react-router-dom";

const EighthSection = () => {
  return (
    <section className="h-32 flex justify-center items-center">
      <Link
        to={"/explore"}
        aria-label="View all products"
        className="flex justify-center items-center h-14 w-56 roundend-sm bg-red-400 text-white"
      >
        <span>View All Products</span>
      </Link>
    </section>
  );
};

export default EighthSection;
