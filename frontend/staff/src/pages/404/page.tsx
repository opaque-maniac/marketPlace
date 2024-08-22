import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <main className="h-full pt-20 relative">
      <p className="absolute top-4 left-4">
        {" "}
        Home / <span className="font-extrabold">404</span>
      </p>
      <div className="flex justify-center items-center">
        <h3 className="mx-auto" style={{ fontSize: "110px" }}>
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
  );
};

export default Error404;
