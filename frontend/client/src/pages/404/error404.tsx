import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="relative">
      <span className="absolute top-4 left-4">
        <span>Home</span> / <span className="font-bold">404 Error</span>
      </span>
      <div className="lg:h-64 h-80 flex justify-center items-center">
        <h1 className="lg:text-9xl md:text-7xl text-5xl">404 Not Found</h1>
      </div>
      <div className="w-screen">
        <p className="w-screen text-center">
          Page not found. You may go back to home.
        </p>
      </div>
      <div className="w-screen">
        <Link
          className="flex justify-center items-center lg:rounded lg:hover:rounded-lg rounded-lg mt-4 bg-red-500 h-10 lg:w-234 w-40 mx-auto"
          to={"/"}
        >
          <span>Back To Home Page</span>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
