import { useQuery } from "@tanstack/react-query";
import NoProducts from "./noProducts";
import fetchProducts from "../first/fetchProducts";
import { ResponseType } from "../first/types";
import Loader from "../../../../components/loader";
import ProductSlideShow from "./productsSlideshow";

const SeventhProducts = () => {
  const query = useQuery(["products", { page: 4, limit: 12 }], fetchProducts);

  const data = query.data as ResponseType;

  return (
    <div className="md:h-732 md:flex justify-center items-center gap-4 mt-4">
      <div className="md:h-full md:w-5/12 w-full h-732 bg-black md:mb-0 mb-4">
        {query.isLoading ? (
          <>
            <div className="text-white">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center flex-col h-full gap-4">
              <ProductSlideShow products={data.products.slice(0, 3)} />
              <ProductSlideShow products={data.products.slice(3, 6)} />
            </div>
          </>
        )}
      </div>
      <div className="md:h-full md:w-5/12 w-full h-732 md:mb-0 mb-4">
        <div className="md:h-350 md:w-full w-full h-313 md:mb-8 mb-4 bg-black">
          {query.isLoading ? (
            <>
              <div className="text-white">
                <Loader />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-full gap-4">
                <ProductSlideShow products={data.products.slice(6, 9)} />
              </div>
            </>
          )}
        </div>
        <div className="md:w-full w-full h-350 md:mb-0 mb-4 flex justify-center items-end gap-4 bg-black">
          <div className="w-full h-full ">
            {query.isLoading ? (
              <>
                <div className="text-white">
                  <Loader />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center h-full gap-4">
                  <ProductSlideShow
                    products={data.products.slice(9, data.products.length)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeventhProducts;
