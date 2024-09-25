import { useEffect } from "react";
import Transition from "../../components/transition";
import userStore from "../../utils/store";
import { removeAccessToken, removeRefreshToken } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";

const LogoutPage = () => {
  const removeUser = userStore((state) => state.removeUser);
  const removeCart = userStore((state) => state.removeCart);
  const removeWishlist = userStore((state) => state.removeWishlist);
  const navigate = useNavigate();

  useEffect(() => {
    removeAccessToken();
    removeRefreshToken();
    removeUser();
    removeCart();
    removeWishlist();
    navigate("/", { replace: true });
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
        <PageLoader />
      </main>
    </Transition>
  );
};

export default LogoutPage;
