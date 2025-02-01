import { lazy, Suspense } from "react";
import { ProductImages } from "../../utils/types";
import Loader from "../../components/loader";

const LivelyImage = lazy(() => import("./imageinbutton"));

const Fallback = () => {
  return (
    <div className="w-32 h-32 flex justify-center items-center">
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

interface Props {
  images: ProductImages[];
  name: string;
}

export default function ProductImagesComponent({ images, name }: Props) {
  return (
    <>
      {images.length > 0 ? (
        <section className="flex md:justify-start justify-center items-center md:flex-row flex-col md:gap-6">
          <div className="md:mb-0 mb-6">
            <img
              src={`http://localhost:3020/${images[0].url}`}
              alt={name}
              className="md:w-600 w-80 md:h-600 h-300 mx-auto"
            />
          </div>
          <div>
            {images.length > 1 ? (
              <ul className="flex justify-center items-center md:flex-col flex-row gap-4 flex-wrap">
                {images.map((image, idx) => {
                  if (idx === 0) {
                    return null;
                  }
                  return (
                    <li key={image.id}>
                      <Suspense fallback={<Fallback />}>
                        <LivelyImage image={image} name={name} />
                      </Suspense>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
