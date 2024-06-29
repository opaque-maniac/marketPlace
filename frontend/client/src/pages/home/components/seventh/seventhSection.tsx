import SeventhProducts from "./products";

const SeventhSection = () => {
  return (
    <section className="">
      <div className="flex justify-start items-center gap-4">
        <div className="h-8 w-4 roundend animate-bounce bg-red-500 rounded-lg"></div>
        <div>
          <p className="text-red-400 text-lg">Featured</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">New Arrivals</h2>
      </div>
      <SeventhProducts />
    </section>
  );
};

export default SeventhSection;
