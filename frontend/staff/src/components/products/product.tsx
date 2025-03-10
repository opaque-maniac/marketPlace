import { Link } from "react-router-dom";
import { Product } from "../../utils/types";
import { useState } from "react";
import Modal from "../modal";
import CloseIcon from "../icons/closeIcon";
import { formatDate } from "../../utils/date";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  product: Product;
  blank?: boolean;
}

const ProductItem = ({ product, blank = false }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <Link
        className="block h-[350px] w-[270px] border p-2 relative rounded-tr-md"
        target={blank ? "_blank" : "_parent"}
        to={`/products/${product.id}`}
      >
        <div className="h-250 w-270 pt-1">
          <img
            src={`${apiProtocol}://${apiHost}/${product.images[0].url}`}
            alt={product.name}
            className="h-full w-[240px] mx-auto"
          />
          <div className="absolute top-0 -right-[2px] h-10 w-10 bg-red-500 text-white flex justify-center items-center rounded-tr-md rounded-bl-md">
            <span className="font-semibold">0%</span>
          </div>
        </div>
        <div>
          <p className={`text-black text-xl text-center`}>{product.name}</p>
        </div>
        <div className="flex justify-between items-center px-6 py-2">
          <span className="text-red-400">
            {product.buyingPrice.toLocaleString("en-US", {
              currency: "USD",
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-gray-300 line-through">
            {product.sellingPrice.toLocaleString("en-US", {
              currency: "USD",
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex justify-between px-6">
          <p>
            <span className="font-semibold">{product.inventory}</span> left
          </p>
          <p>{formatDate(product.createdAt)}</p>
        </div>
      </Link>
      {clicked && (
        <Modal callback={() => setClicked(false)}>
          <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setClicked(false);
              }}
              className="absolute md:-left-20 md:top-10 top-2 left-0 h-8 w-8 bg-white border border-black rounded-full p-[2px]"
            >
              <CloseIcon />
            </button>
            <img
              src={`http://localhost:3020/${product.images[0].url}`}
              alt={product.name}
              loading="lazy"
              className="w-full h-500"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductItem;
