import BallIcon from "../../../components/icons/ball";
import BooksIcon from "../../../components/icons/books";
import DressIcon from "../../../components/icons/dress";
import ElectronicsIcon from "../../../components/icons/electronics";
import SpoonIcon from "../../../components/icons/spoon";
import ToyIcon from "../../../components/icons/toy";

const FourthSection = () => {
  return (
    <section className="pt-4">
      <div className="flex justify-start items-center gap-4">
        <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
        <p className="text-red-400 text-xl font-bold">Categories</p>
      </div>
      <h2 className="text-3xl font-semibold">Browser By Category</h2>
      <div className="pt-10 pb-12">
        <ul className="flex justify-center lg:gap-8 md:gap-8 gap-4 items-center flex-wrap">
          <li>
            <div className="w-44 h-36 border border-black/25">
              <div className="h-24 w-full pt-2">
                <BallIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">SPORTS</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="w-44 h-36 border border-black/25">
              <div className="h-24 w-full pt-2">
                <DressIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">FASHION</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="w-44 h-36 border border-black/25">
              <div className="h-24 w-full pt-2">
                <ElectronicsIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">
                  ELECTRONICS
                </h3>
              </div>
            </div>
          </li>
          <li>
            <div className="w-44 h-36 border border-black/25">
              <div className="h-24 w-full pt-2">
                <SpoonIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">FOOD</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="w-44 h-36 border border-black/25">
              <div className="h-24 w-full pt-2">
                <ToyIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">TOYS</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="w-44 h-36 border border-black/25">
              <div className="h-24 w-full flex justify-center pt-2">
                <BooksIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">BOOKS</h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FourthSection;
