import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../utils/queries/products/fetchproducts";
import { useContext } from "react";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import FirstSection from "./sections/first";
import SecondSection from "./sections/second";
import ThirdSection from "./sections/third";
import FourthSection from "./sections/fourth";
import FifthSection from "./sections/fifth";
import SixthSection from "./sections/sixth";
import SeventhSection from "./sections/seventh";
import EighthSection from "./sections/eight";
import NinethSection from "./sections/nineth";
import TenthSection from "./sections/tenth";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

const HomePage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchProducts,
    queryKey: ["products", 1, 36, ""],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const data = query.data?.data;
  console.log(data);

  return (
    <Transition>
      <MetaTags
        title="Hazina"
        description="Hazina is a platform that allows you to buy and sell products online"
        keywords={[
          "buy products",
          "sell products",
          "buy and sell products",
          "hazina",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main" className="px-2">
        <FirstSection
          products={data ? data.slice(0, 6) : []}
          isLoading={query.isLoading}
        />
        <SecondSection
          products={data ? data.slice(6, 12) : []}
          isLoading={query.isLoading}
        />
        <ThirdSection />
        <hr />
        <FourthSection />
        <hr />
        <FifthSection
          products={data ? data.slice(12, 16) : []}
          isLoading={query.isLoading}
        />
        <SixthSection
          products={data ? data.slice(16, 20) : []}
          isLoading={query.isLoading}
        />
        <SeventhSection
          products={data ? data.slice(20, 28) : []}
          isLoading={query.isLoading}
        />
        <EighthSection />
        <NinethSection
          products={data ? data.slice(28, 36) : []}
          isLoading={query.isLoading}
        />
        <TenthSection />
      </main>
    </Transition>
  );
};

export default HomePage;
