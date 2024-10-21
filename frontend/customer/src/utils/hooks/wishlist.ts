import { useEffect, useState } from "react";
import { ErrorResponse } from "../types";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";

const useFetchWishlist = () => {
  const [wishlist, setWishlist] = useState<number>(0);
  const [e, setE] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const token = getAccessToken();

        if (!token) {
          throw tokenError();
        }

        const url = "http://localhost:3020/customers/wishlistcount";

        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch(url, options);

        if (!res.ok) {
          try {
            const error = (await res.json()) as ErrorResponse;
            throw new Error(JSON.stringify(error));
          } catch (e) {
            if (e instanceof Error) {
              throw responseError();
            }
          }
        }

        const json = (await res.json()) as { count: number };
        setWishlist(json.count);
        setE(null);
        setTimeout(fetchCounter, 5000);
      } catch (e) {
        if (e instanceof Error) {
          setE(e);
        }
        setTimeout(fetchCounter, 5000);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCounter();
  }, []);

  return { wishlist, e };
};

export default useFetchWishlist;
