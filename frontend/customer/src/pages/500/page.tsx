import { useContext, useEffect } from "react";
import { ErrorContext } from "../../utils/errorContext";
import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import MetaTags from "../../components/metacomponent";

const Error500 = () => {
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    return () => {
      setError(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition>
      <MetaTags
        title="500 - Server Error"
        description="500 - Internal Server Error"
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative md:pb-0 pb-20">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">500</span>
        </p>
        <div className="flex justify-center items-center">
          <h3
            className="mx-auto md:text-start text-center"
            style={{ fontSize: "110px" }}
          >
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
