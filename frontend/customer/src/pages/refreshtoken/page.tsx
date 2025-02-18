import { useContext, useEffect } from "react";
import PageLoader from "../../components/pageloader";
import { useMutation } from "@tanstack/react-query";
import { sendRefreshToken } from "../../utils/mutations/token";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/cookies";
import { errorHandler } from "../../utils/errorHandler";
import Transition from "../../components/transition";
import MetaTags from "../../components/metacomponent";

const RefreshTokenPage = () => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendRefreshToken,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
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

  return (
    <Transition>
      <MetaTags
        title="Authenticating | Hazina"
        description="Re-Authenticating user"
        keywords={[
          "refresh token",
          "re-authenticating",
          "re-authenticating user",
          "re-authenticating hazina",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <PageLoader />
    </Transition>
  );
};

export default RefreshTokenPage;
