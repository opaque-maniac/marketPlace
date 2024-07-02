import ProductItem from "../first/productItem";
import { Product } from "../first/types";
import { useState, useEffect } from "react";

interface Props {
  products: Product[];
}

const ProductSlideShow = ({ products }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ProductItem product={products[currentIndex]} color="black" />
    </div>
  );
};

export default ProductSlideShow;
