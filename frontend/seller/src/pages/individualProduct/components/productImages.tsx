import { MouseEventHandler, useState } from "react";
import { ProductImagesProps } from "../pageTypes";
import ProductImgModal from "./productImgModal";
import ModalSlideShow from "./modalSlideshow";

const ProductImages = ({ images, name }: ProductImagesProps) => {
  const [clickedImg, setClickedImg] = useState<string | null>(null);

  const imgClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setClickedImg(e.currentTarget.dataset.id as string);
  };

  return (
    <section>
      <div>
        <div>
          <a
            data-id={images[0].id ?? ""}
            href={images[0].id ?? "placeholder"}
            onClick={imgClickHandler}
          >
            <img
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
          <div>
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
                    <img src={image.imageUrl} alt={name} data-id={image.id} />
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setClickedImg(null);
                }}
                className="fixed top-4 left-4 z-50"
              >
                Close
              </button>
              <ModalSlideShow images={images} clickedImg={clickedImg} />
            </ProductImgModal>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default ProductImages;
