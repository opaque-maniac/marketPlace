import Loader from "../loader";
import { MouseEventHandler } from "react";
import RatingsInput from "./ratinginput";
import useFetchProductRatings from "../../utils/hooks/fetchratings";

interface Props {
  productID: string;
  productName: string;
  callback: () => void;
}

export default function RateProduct({
  productID,
  callback,
  productName,
}: Props) {
  const { isLoading, isError, error, value, refetch } =
    useFetchProductRatings(productID);

  const refetchHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading) {
    return (
      <div className="w-300 h-300 flex justify-center items-center mx-auto">
        <div className="w-6 h-6">
          <Loader color="#000" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-300 h-300 flex justify-center items-center mx-auto">
        <div>
          <p>{error}</p>
          <button
            disabled={!isLoading}
            onClick={refetchHandler}
            className="flex justify-center items-center w-20 h-10 rounded-lg text-white bg-black"
          >
            {isLoading ? (
              <div className="w-6 h-6">
                <Loader color="#fff" />
              </div>
            ) : (
              <span>Refetch</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-300 min-h-300 mx-auto">
      <div className="h-[50px]">
        <h3>
          Rate the <span className="font-bold text-center">{productName}</span>
        </h3>
      </div>
      <RatingsInput productID={productID} initial={value} callback={callback} />
    </div>
  );
}
