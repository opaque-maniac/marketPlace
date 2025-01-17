import { useEffect } from "react";
import Loader from "../../components/loader";
import Transition from "../../components/transition";
import userStore from "../../utils/store";
import { removeAccessToken, removeRefreshToken } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const LogoutPage = () => {
  const removeUser = userStore((state) => state.removeUser);
  const navigate = useNavigate();

  useEffect(() => {
    removeAccessToken();
    removeRefreshToken();
    removeUser();
    navigate("/login", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition>
      <Helmet>
        <title>Logging Out</title>
        <meta name="description" content="Logging out from Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <section className="min-h-screen w-full flex justify-center items-center">
          <div className="h-10 w-10">
            <Loader color="#000000" />
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default LogoutPage;
