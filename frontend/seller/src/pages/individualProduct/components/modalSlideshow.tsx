import { useEffect, useState } from "react";
import { ProductImage, ProductModalImagesProps } from "../pageTypes";

const ModalSlideShow = ({ images, clickedImg }: ProductModalImagesProps) => {
  const [current, setCurrent] = useState<ProductImage | null>(null);

  useEffect(() => {
    const currentImg = images.find((img) => img.id === clickedImg);
    setCurrent(currentImg ?? null);
  }, [clickedImg, images]);

  return (
    <section className="flex relative h-screen w-screen">
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded fixed left-4 z-40"
          style={{ top: "40vh" }}
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
      <div className="fixed top-20 w-screen">
        <a href={current?.imageUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={current?.imageUrl ?? "/placeholder.jpg"}
            alt={current?.productId}
            className="w-10/12 lg:w-800 mx-auto"
            style={{ minHeight: "calc(100vh - 14rem)", objectFit: "contain" }}
          />
        </a>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded fixed right-4 z-40"
          style={{ top: "40vh" }}
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
