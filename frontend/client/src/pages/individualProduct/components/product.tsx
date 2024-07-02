import TruckIcon from "./truckIcon";
import { Product } from "../../home/components/first/types";
import ArrowRoundIcon from "./arrowRound";
import { MouseEventHandler, useState } from "react";
import AddToCartButton from "./addToCart";
import AddToWishlistButton from "./addToWishlist";

interface Props {
  product: Product;
}

const IndividualProductItem = ({ product }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  return (
    <section className="flex justify-center items-start gap-8 lg:flex-row flex-col">
      <div className="flex justify-start items-start md:flex-row flex-col">
        <div className="md:order-first order-last">
          {product.images.length > 1 ? (
            <ul className="md:block flex justify-center items-center flex-wrap gap-8">
              {product.images.map((img, index) => {
                if (index === 0) {
                  return;
                }
                return (
                  <li key={index} className="lg:mb-2 mb-0">
                    <img
                      src={img.imageUrl}
                      alt={product.name}
                      style={{ objectFit: "scale-down", height: "120px" }}
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div>
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            className="lg:w-500 w-300 lg:h-600 object-cover"
            style={{ objectFit: "fill" }}
          />
        </div>
      </div>
      <div className="lg:w-500 md:w-8/12 lg:mx-0 md:mx-auto w-full">
        <h3
          className="font-semibold lg:text-start text-center mb-4"
          style={{ fontSize: "24px" }}
        >
          {product.name}
        </h3>
        <div
          className="flex lg:justify-start justify-around lg:gap-14 items-center mb-4"
          style={{ height: "21px" }}
        >
          <p>{product.category.split("_").join(" & ")}</p>
          <p className="text-green-500">{product.stock} left</p>
          <p className="bg-red-500 rounded p-1">
            {product.discountPercentage}%
          </p>
        </div>
        <div
          className="flex lg:justify-start justify-around lg:gap-32 items-center mb-4"
          style={{ height: "21px", fontSize: "24px" }}
        >
          <span className="text-black">${product.price}</span>
          <span className="text-base text-gray-600 line-through">
            $
            {(
              (100 * product.price) /
              (100 - product.discountPercentage)
            ).toFixed(2)}
          </span>
        </div>
        <div
          className="flex lg:justify-start justify-around lg:gap-16 items-center mb-4 py-8"
          style={{ height: "21px", fontSize: "24px" }}
        >
          <AddToCartButton id={product.id} />
          <AddToWishlistButton id={product.id} />
        </div>
        <div className="mb-6">
          {product.description.length > 50 ? (
            <>
              <p
                className="lg:text-start text-center"
                style={{ fontSize: "16px" }}
              >
                {clicked
                  ? product.description
                  : `${product.description.substring(0, 50)}...`}
              </p>
              <div className="pt-2">
                <button
                  onClick={clickHandler}
                  className="block w-28 h-6 rounded bg-red-500"
                >
                  {clicked ? <span>Show Less</span> : <span>Read More</span>}
                </button>
              </div>
            </>
          ) : (
            <p
              className="lg:text-start text-center"
              style={{ fontSize: "16px" }}
            >
              {product.description}
            </p>
          )}
        </div>
        <div>
          <div className="h-20 border border-black flex gap-6 justify-start pl-6 items-center border-collapse">
            <div className="w-8 h-8 text-white">
              <TruckIcon />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: "16px" }}>
                Free Delivery
              </p>
              <p style={{ fontSize: "12px" }}>We can get it to you in 24hr.</p>
            </div>
          </div>
          <div className="h-20 border border-black flex gap-6 justify-start pl-6 items-center border-collapse">
            <div className="w-8 h-8 text-white">
              <ArrowRoundIcon />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: "16px" }}>
                Return Delivery
              </p>
              <p style={{ fontSize: "12px" }}>Free 30 Days Delivery Returns.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndividualProductItem;
