import Categories from "./categories";

const ThirdSection = () => {
  return (
    <section className="md:h-313">
      <div className="h-145 mb-6">
        <div className="flex justify-start items-center gap-4">
          <div className="h-8 w-4 roundend animate-bounce bg-red-500 rounded-lg"></div>
          <div>
            <p className="text-red-400 font-bold">Categories</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Browser By Category</h2>
        </div>
      </div>
      <div className="">
        <Categories />
      </div>
    </section>
  );
};

export default ThirdSection;
