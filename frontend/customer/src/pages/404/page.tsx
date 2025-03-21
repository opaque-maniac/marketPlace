import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import MetaTags from "../../components/metacomponent";

const Error404 = () => {
  return (
    <Transition>
      <MetaTags
        title="404 - Not found"
        description="404 - Page not found"
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative md:pt-4 pb-20">
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
