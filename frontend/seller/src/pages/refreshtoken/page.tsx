import { useContext, useEffect } from "react";
import PageLoader from "../../components/pageloader";
import { useMutation } from "@tanstack/react-query";
import { sendRefreshToken } from "../../utils/mutations/token";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/cookies";

const RefreshTokenPage = () => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendRefreshToken,
    onError: (error: Error) => {
      try {
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
      } catch (e) {
        if (e instanceof Error) {
          setErr("Something unexpected happened");
        }
        navigate("/", { replace: true });
      }
    },
    onSuccess: (data) => {
      setAccessToken(data);
      navigate("/", { replace: true });
    },
  });

  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PageLoader />;
};

export default RefreshTokenPage;
