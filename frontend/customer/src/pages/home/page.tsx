import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Hazina</title>
        <meta
          name="description"
          content="Hazina marketplace home page, explore an buy products in kenya"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
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
