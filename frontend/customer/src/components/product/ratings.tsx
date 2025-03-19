import { lazy, MouseEventHandler, Suspense } from "react";
import useUserStore from "../../utils/store";
import StarIcon from "../icons/star";
import Modal from "../modal";
import Loader from "../loader";
import CloseIcon from "../icons/closeIcon";
import { useNavigate } from "react-router-dom";

const RateProduct = lazy(() => import("./rateproduct"));

interface Props {
  count: number;
  value: number;
  productID: string;
  productName: string;
  refetch: () => void;
}

const Fallback = () => {
  return (
    <div className="w-full h-300 flex justify-center items-center">
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function ProductRatings({
  count,
  productID,
  value,
  productName,
  refetch,
}: Props) {
  const user = useUserStore((state) => state.user);
  const array = new Array(5).fill(0);
  const navigate = useNavigate();
  const isOpen =
    new URLSearchParams(window.location.search).get("rate") === "true"
      ? true
      : false;

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    let url;

    if (isOpen) {
      url = "";
    } else {
      url = "?rate=true";
    }
    navigate(url, { replace: true });
  };

  const callback = () => {
    refetch();
    navigate("", { replace: true });
  };

  return (
    <div className="h-180 md:w-399 w-80 mx-auto border border-black rounded-lg">
      <div className="w-10/12 mx-auto">
        <h4 className="text-lg font-semibold">Ratings:</h4>
        <div className="flex gap-2">
          <p>
            <span className="text-lg font-semibold">{value.toFixed(1)}</span>
            <span className="text-sm">/5</span>
          </p>
          <p>Reviews: {count}</p>
        </div>
      </div>
      <ul className="w-full flex justify-evenly items-center mt-4">
        {array.map((_, idx) => (
          <li key={idx}>
            <div
              className="w-8 h-8"
              style={{ color: idx < value ? "#FFFF00" : "#000" }}
            >
              <StarIcon fill={idx < value ? "#FFFF00" : undefined} />
            </div>
          </li>
        ))}
      </ul>
      {user && (
        <div className="pl-8">
          <button
            aria-label="Rate product"
            className="xl:no-underline xl:hover:underline underline"
            onClick={clickHanlder}
          >
            Rate
          </button>
          {isOpen && (
            <Modal callback={callback}>
              <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
                <div className="w-full bg-white h-[300px] relative md:pt-[50px] pt-[60px]">
                  <div className="absolute -top-10 md:-left-4 left-0">
                    <button
                      onClick={clickHanlder}
                      aria-label="Go back to product"
                      className="w-8 h-8 rounded-full bg-white border border-black/20"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <Suspense fallback={<Fallback />}>
                    <RateProduct
                      productName={productName}
                      productID={productID}
                      callback={callback}
                    />
                  </Suspense>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
