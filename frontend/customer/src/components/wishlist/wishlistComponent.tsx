import { Link } from "react-router-dom";
import HeartIcon from "../icons/heart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { useContext } from "react";
import { getAccessToken, getUserID } from "../../utils/cookies";
import { fetchData } from "../../utils/hooks/fetchfunc";
import { apiHost, apiProtocol } from "../../utils/generics";
import { io } from "socket.io-client";
import { errorHandler } from "../../utils/errorHandler";

const WishlistComponent = () => {
  const [wishlist, setWishlist] = useState<number>(0);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const initializeWishlistSocket = (token: string, userID: string) => {
    const socketProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = io(`${socketProtocol}://${apiHost}`, {
      auth: { token },
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("Connected to cart socket");
      socket.emit("join", userID);
    });

    socket.on("authError", (error: { message: string }) => {
      if (error.message === "Invalid token") {
        navigate("/refresh");
      } else {
        navigate("/logout");
      }
    });

    socket.on("error", (error: { message: string }) => {
      setErr(error.message);
    });

    socket.on("wishlistCount", ({ count }: { count: number }) => {
      setWishlist(count);
    });
  };

  useEffect(() => {
    const token = getAccessToken();
    const userID = getUserID();

    if (!token || !userID) {
      navigate("/logout");
      return;
    }

    interface WishlistResponse {
      count: number;
    }

    async function fetchCart() {
      try {
        const count = await fetchData<WishlistResponse>(
          `${apiProtocol}://${apiHost}/customers/wishlistitems/count`,
          token as string,
        );
        setWishlist(count.count);
      } catch (error) {
        errorHandler(error, navigate, setErr, setError);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCart();
    initializeWishlistSocket(token, userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Link
        to={"/wishlist"}
        aria-label="Go to wishlist page"
        className="block w-6 h-6 rounded-full relative"
      >
        <div
          className={`absolute bg-red-400 h-4 min-w-4 px-[2px] -top-1 rounded-full flex justify-center items-center ${
            wishlist > 90 ? "-right-4" : "-right-2"
          }`}
        >
          <span className="text-white">{wishlist > 90 ? "90+" : wishlist}</span>
        </div>
        <HeartIcon />
      </Link>
    </div>
  );
};

export default WishlistComponent;
