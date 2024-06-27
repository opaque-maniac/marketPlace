import { useEffect } from "react";
import Loader from "../../components/loader";
import { useLoggedInStore } from "../../utils/store";
import { removeSellerCookie } from "../../utils/cookieStore";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const logout = useLoggedInStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      logout();
      removeSellerCookie();
      navigate("/login", { replace: true });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default LogoutPage;
