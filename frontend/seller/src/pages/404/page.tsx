import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";

const Error404 = () => {
  return (
    <Transition>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="description" content="404 Not Found" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-4">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">404</span>
        </p>
        <div className="flex justify-center items-center">
          <h3 className="mx-auto text-center" style={{ fontSize: "110px" }}>
            404 Not Found
          </h3>
        </div>
        <p className="text-lg text-center">
          Your visited page not found. You may go to home page.
        </p>
        <div className="h-32 flex justify-center items-end">
          <Link
            to="/"
            className="flex justify-center items-center bg-red-400 text-white rounded-lg"
            style={{ width: "254px", height: "56px" }}
          >
            <span>Go To Home</span>
          </Link>
        </div>
      </main>
    </Transition>
  );
};

export default Error404;
