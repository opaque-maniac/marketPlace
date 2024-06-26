import { useEffect, useState } from "react";
import { ProductImage, ProductModalImagesProps } from "../pageTypes";

const ModalSlideShow = ({ images, clickedImg }: ProductModalImagesProps) => {
  const [current, setCurrent] = useState<ProductImage | null>(null);

  useEffect(() => {
    const currentImg = images.find((img) => img.id === clickedImg);
    setCurrent(currentImg ?? null);
  }, [clickedImg, images]);

  return (
    <section>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            const currentIndex = images.findIndex(
              (img) => img.id === current?.id
            );
            if (currentIndex === 0) return;
            const prevIndex = currentIndex - 1;
            const prevImg = images[prevIndex];
            setCurrent(prevImg);
          }}
          disabled={images.findIndex((img) => img.id === clickedImg) === 0}
        >
          Prev
        </button>
      </div>
      <div>
        <img
          src={current?.imageUrl ?? "/placeholder.jpg"}
          alt={current?.productId}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            const currentIndex = images.findIndex(
              (img) => img.id === current?.id
            );
            if (currentIndex === images.length - 1) return;
            const prevIndex = currentIndex + 1;
            const prevImg = images[prevIndex];
            setCurrent(prevImg);
          }}
          disabled={
            images.findIndex((img) => img.id === clickedImg) ===
            images.length - 1
          }
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ModalSlideShow;
