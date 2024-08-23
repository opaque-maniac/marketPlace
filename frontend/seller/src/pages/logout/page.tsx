import { useEffect } from "react";
import Loader from "../../components/loader";
import Transition from "../../components/transition";
import userStore from "../../utils/store";
import { removeAccessToken, removeRefreshToken } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";

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
      <main>
        <section className="h-full w-full flex justify-center items-center">
          <div className="h-40 w-40">
            <Loader color="#000000" />
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default LogoutPage;
