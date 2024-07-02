import SixthProducts from "./products";

const SixthSection = () => {
  return (
    <section className="lg:h-1016">
      <div className="flex justify-start items-center gap-4">
        <div className="h-8 w-4 roundend animate-bounce bg-red-500 rounded-lg"></div>
        <div>
          <p className="text-red-400 text-lg">Our Products</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">Explore Our Products</h2>
      </div>
      <SixthProducts />
    </section>
  );
};

export default SixthSection;
