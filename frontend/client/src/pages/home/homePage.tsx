import { Link } from "react-router-dom";
import FirstSection from "./components/first/firstSection";
import SecondSection from "./components/second/secondSection";
import ThirdSection from "./components/third/thirdSection";
import FourthSection from "./components/fourth/fourthSection";
import FifthSection from "./components/fifth/fifthSection";
import SixthSection from "./components/sixth/sixthSection";
import EighthSection from "./components/eighth/eighthSection";
import SeventhSection from "./components/seventh/seventhSection";

const HomePage = () => {
  return (
    <div className="lg:w-1200 md:mx-auto pt-8 lg:px-0 px-2 pb-4">
      <FirstSection />
      <div className="h-10"></div>
      <SecondSection />
      <div className="h-32 flex justify-center items-center">
        <Link
          to={"/explore"}
          className="text-white bg-red-500 rounded h-56 w-243 flex justify-center items-center"
        >
          <p>Explore More</p>
        </Link>
      </div>
      <ThirdSection />
      <div className="h-10"></div>
      <FourthSection />
      <div className="h-10"></div>
      <FifthSection />
      <div className="h-10"></div>
      <SixthSection />
      <div className="h-10"></div>
      <SeventhSection />
      <div className="h-10"></div>
      <div className="md:h-32 h-20 flex justify-center items-center">
        <Link
          to={"/explore"}
          className="text-white bg-red-500 rounded h-56 w-243 flex justify-center items-center"
        >
          <p>View All Products</p>
        </Link>
      </div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <EighthSection />
      <div className="h-24"></div>
    </div>
  );
};

export default HomePage;
