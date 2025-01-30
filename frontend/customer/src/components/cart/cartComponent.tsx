import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../icons/cart";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utils/hooks/fetchfunc";
import { getAccessToken, getUserID } from "../../utils/cookies";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { apiHost, apiProtocol } from "../../utils/generics";
import { io } from "socket.io-client";
import { errorHandler } from "../../utils/errorHandler";

const CartComponent = () => {
  const [cart, setCart] = useState<number>(0);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const initializeCartSocket = (token: string, userID: string) => {
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

    socket.on("cartCount", ({ count }: { count: number }) => {
      setCart(count);
    });
  };

  useEffect(() => {
    const token = getAccessToken();
    const userID = getUserID();

    if (!token || !userID) {
      navigate("/logout");
      return;
    }

    interface CartResponse {
      count: number;
    }

    async function fetchCart() {
      try {
        const count = await fetchData<CartResponse>(
          `${apiProtocol}://${apiHost}/customers/cartitems/count`,
          token as string,
        );
        setCart(count.count);
      } catch (error) {
        errorHandler(error, navigate, setErr, setError);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCart();
    initializeCartSocket(token, userID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Link
        to={"/cart"}
        aria-label="Go to the cart page"
        className="block w-6 h-6 rounded-full relative"
      >
        <div className="absolute bg-red-400 h-4 w-4 -top-1  rounded-full -right-2 flex justify-center items-center">
          <span className="text-white">{cart}</span>
        </div>
        <CartIcon />
      </Link>
    </div>
  );
};

export default CartComponent;
