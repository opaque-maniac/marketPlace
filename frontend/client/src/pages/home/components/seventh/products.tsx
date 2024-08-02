import { useQuery } from "@tanstack/react-query";
import NoProducts from "./noProducts";
import fetchProducts from "../first/fetchProducts";
import { ResponseType } from "../first/types";
import Loader from "../../../../components/loader";
import ProductSlideShow from "./productsSlideshow";
import { useContext } from "react";
import ErrorContext from "../../../../utils/errorContext";
import { useNavigate } from "react-router-dom";

const SeventhProducts = () => {
  const query = useQuery(["products", { page: 4, limit: 12 }], fetchProducts);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  if (query.isError) {
    setError(true);
    navigate("/error/500");
  }

  const data = query.data as ResponseType;

  return (
    <div className="md:h-732 md:flex justify-center items-center gap-4 mt-4">
      <div className="md:h-full md:w-5/12 w-full h-732 bg-black md:mb-0 mb-4">
        {query.isLoading ? (
          <>
            <div className="w-full h-full flex justify-center items-center">
              <div className="bg-white h-14 w-14 rounded-full">
                <Loader />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center flex-col h-full gap-4">
              {data.products && data.products.length > 0 ? (
                <>
                  <ProductSlideShow products={data.products.slice(0, 3)} />
                  <ProductSlideShow products={data.products.slice(3, 6)} />
                </>
              ) : (
                <>
                  <NoProducts />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="md:h-full md:w-5/12 w-full h-732 md:mb-0 mb-4">
        <div className="md:h-350 md:w-full w-full h-313 md:mb-8 mb-4 bg-black">
          {query.isLoading ? (
            <>
              <div className="w-full h-full flex justify-center items-center">
                <div className="bg-white h-10 w-10 rounded-full">
                  <Loader />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-full gap-4">
                {data.products && data.products.length > 6 ? (
                  <>
                    <ProductSlideShow products={data.products.slice(6, 9)} />
                  </>
                ) : (
                  <>
                    <NoProducts />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div className="md:w-full w-full h-350 md:mb-0 mb-4 flex justify-center items-end gap-4 bg-black">
          <div className="w-full h-full ">
            {query.isLoading ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <div className="bg-white h-10 w-10 rounded-full">
                    <Loader />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center h-full gap-4">
                  {data.products && data.products.length > 9 ? (
                    <>
                      <ProductSlideShow
                        products={data.products.slice(9, data.products.length)}
                      />{" "}
                    </>
                  ) : (
                    <>
                      <NoProducts />
                    </>
                  )}
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
