import { Helmet } from "react-helmet";
import Transition from "../../components/transition";

const HomePage = () => {
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
        <h2>Home Page</h2>
      </main>
    </Transition>
  );
};

export default HomePage;
