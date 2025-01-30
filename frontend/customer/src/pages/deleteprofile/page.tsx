import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { MouseEventHandler, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendDeleteProfile } from "../../utils/mutations/profile/deleteprofile";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { removeAccessToken, removeRefreshToken } from "../../utils/cookies";
import useUserStore from "../../utils/store";
import Loader from "../../components/loader";

const DeleteProfilePage = () => {
  const navigate = useNavigate();
  const removeUser = useUserStore((state) => state.removeUser);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: sendDeleteProfile,
    onSuccess: () => {
      removeAccessToken();
      removeRefreshToken();
      removeUser();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const confirmClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  const disable = isPending ? true : false;
  const cursor = disable ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <Transition>
      <Helmet>
        <title>Delete Profile</title>
        <meta name="description" content="Delete a product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Delete Profile</span>
        </p>

        <section
          className="md:flex justify-center items-center shadow-xl border rounded-lg lg:w-8/12 mx-auto w-10/12"
          style={{
            minHeight: "calc(100vh - 14rem)",
          }}
        >
          <div>
            <h2 className="text-center text-2xl md:pb-0 pb-4 mb-6 md:pt-0 pt-4">
              Are you sure you want to delete your profile
            </h2>
            <div className="flex md:justify-around justify-center items-center md:flex-row flex-col md:gap-0 gap-4">
              <button
                disabled={disable}
                onClick={confirmClick}
                className={`flex justify-center items-center h-10 w-40 rounded-lg bg-red-400 md:mb-0 mb-8 p-1 ${cursor}`}
                aria-label="Delete Product"
              >
                {isPending ? <Loader color="#fff" /> : <span>Delete</span>}
              </button>
              <Link
                to={"/profile"}
                className={`flex justify-center items-center h-10 w-40 rounded-lg bg-green-400`}
              >
                <span>Cancel</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default DeleteProfilePage;
