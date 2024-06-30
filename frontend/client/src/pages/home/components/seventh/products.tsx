import NoProducts from "./noProducts";

const SeventhProducts = () => {
  return (
    <div className="md:h-732 md:flex justify-center items-center gap-4 mt-4">
      <div className="md:h-full md:w-5/12 w-full h-732 bg-black md:mb-0 mb-4">
        <NoProducts />
      </div>
      <div className="md:h-full md:w-5/12 w-full h-732 md:mb-0 mb-4">
        <div className="md:h-350 md:w-full w-full h-313 md:mb-8 mb-4 bg-black">
          <NoProducts />
        </div>
        <div className="md:w-full w-full h-350 md:mb-0 mb-4 flex justify-center items-end gap-4">
          <div className="w-full h-full bg-black">
            <NoProducts />
          </div>
          <div className="w-full h-full bg-black">
            <NoProducts />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeventhProducts;
