import { FormEventHandler, useContext, useEffect, useState } from "react";
import Transition from "../../components/transition";
import useUserStore from "../../utils/store";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import ErrorContext from "../../utils/errorContext";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import ShowError from "../../components/showErr";
import { Helmet } from "react-helmet";
import Loader from "../../components/loader";
import ProfileForm from "./form";
import { sendUpdateProfile } from "../../utils/mutations/profile";

const UpdateProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const [err, setErr] = useState<string | null>(null);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/500", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchProfile,
    queryKey: ["profile", user as string],
  });

  if (query.isError) {
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const [show, url] = errorHandler(error.errorCode);
      if (show) {
        setErr(error.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const mutation = useMutation({
    mutationFn: sendUpdateProfile,
    onSuccess: (data) => {
      if (data) {
        navigate("/profile", { replace: true });
      } else {
        setError(true);
        navigate("/500", { replace: true });
      }
    },
    onError: (error) => {
      const errorObj = JSON.parse(error.message) as ErrorResponse;
      const [show, url] = errorHandler(errorObj.errorCode);

      if (show) {
        setErr(errorObj.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url, { replace: true });
        } else {
          setError(true);
          navigate("/500", { replace: true });
        }
      }
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({ data: formData, id: user as string });
  };

  const callback = () => {
    setErr(() => null);
  };

  return (
    <Transition>
      <Helmet>
        <title>Update Profile</title>
        <meta
          name="description"
          content="Hazina seller app profile update page"
        />
        <meta name="bots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Update Profile</span>
        </p>
        <div className="pt-4">
          <h2 className="text-center text-3xl md:pb-0 pb-4">Update Profile</h2>
        </div>
        <div className="h-12">
          {err && <ShowError error={err} callback={callback} />}
        </div>
        <section>
          {query.isLoading && (
            <section
              className="flex justify-center items-center"
              style={{
                minHeight: "calc(100vh - 13.8rem)",
              }}
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </section>
          )}
          {query.isSuccess && query.data ? (
            <>
              {query.data.seller && (
                <ProfileForm
                  handler={submitHandler}
                  isLoading={mutation.isPending}
                  profile={query.data.seller}
                />
              )}
            </>
          ) : null}
        </section>
      </main>
    </Transition>
  );
};

export default UpdateProfilePage;
