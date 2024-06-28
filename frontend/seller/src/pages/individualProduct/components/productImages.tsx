import { MouseEventHandler, useState } from "react";
import { ProductImagesProps } from "../pageTypes";
import ProductImgModal from "./productImgModal";
import ModalSlideShow from "./modalSlideshow";
import CloseIcon from "./closeIcon";

const ProductImages = ({ images, name }: ProductImagesProps) => {
  const [clickedImg, setClickedImg] = useState<string | null>(null);

  const imgClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setClickedImg(e.currentTarget.dataset.id as string);
  };

  return (
    <section className="pt-4">
      <div className="md:flex justify-center items-start gap-8">
        <div>
          <a
            data-id={images[0].id ?? ""}
            href={images[0].id ?? "placeholder"}
            onClick={imgClickHandler}
          >
            <img
              className="w-80 h-80 rounded shadow-lg md:mx-0 mx-auto"
              src={
                images.length > 0
                  ? images[0].imageUrl
                  : "/images/placeholder.jpg"
              }
              alt={name}
            />
          </a>
        </div>
        {images.length > 1 ? (
          <div className="flex justify-center items-center gap-4 mt-4 flex-wrap md:w-48 md:px-0 px-2">
            {images.map((image, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <div key={image.id}>
                  <a
                    data-id={image.id}
                    href={image.id}
                    onClick={imgClickHandler}
                  >
                    <img
                      src={image.imageUrl}
                      alt={name}
                      data-id={image.id}
                      className="w-20 h-20 rounded-full"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div>
        {clickedImg ? (
          <>
            <ProductImgModal>
              <div className="z-40 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-50 text-white">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setClickedImg(null);
                  }}
                  className="fixed top-4 left-4 z-50"
                >
                  <CloseIcon />
                </button>
                <ModalSlideShow images={images} clickedImg={clickedImg} />
              </div>
            </ProductImgModal>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default ProductImages;
