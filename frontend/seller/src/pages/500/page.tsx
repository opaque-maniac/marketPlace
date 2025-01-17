import { useContext, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { ErrorContext } from "../../utils/errorContext";

const Error500 = () => {
  const [error, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!error) {
      navigate("/404", { replace: true });
    }

    return () => {
      setError(false);
    };
  });

  return (
    <Transition>
      <Helmet>
        <title>500 Server Error</title>
        <meta name="description" content="404 Not Found" />
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">500</span>
        </p>
        <div className="flex justify-center items-center">
          <h3 className="mx-auto" style={{ fontSize: "110px" }}>
            500 Server Error
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

export default Error500;
