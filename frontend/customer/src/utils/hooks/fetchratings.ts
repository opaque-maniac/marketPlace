import { useEffect, useState } from "react";
import { fetchProductRatings } from "../queries/products/fetchproductratings";
import { apiHost, apiProtocol } from "../generics";
import { getAccessToken } from "../cookies";
import { SuccessProductRatings } from "../types";

export default function useFetchProductRatings(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(true);
  const [value, setValue] = useState<number>(0);

  const fetchRatings = async () => {
    try {
      setIsLoading(true);
      if (isError) {
        setIsError(false);
      }
      const url = `${apiProtocol}://${apiHost}/customers/products/${id}/ratings`;

      const token = getAccessToken();

      if (!token) {
        throw new Error("Unauthorized");
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Oops! Something went wrong");
      }

      const data = (await response.json()) as SuccessProductRatings;

      setIsLoading(false);
      if (data.rating) {
        setValue(data.rating.value);
      }
      if (refetch) {
        setRefetch(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Oops! Something went wrong");
      }
      setIsLoading(false);
      setIsError(true);
      if (refetch) {
        setRefetch(false);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (refetch) {
      setIsError(false);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchRatings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const refetchCallback = () => {
    setRefetch(true);
  };

  return {
    isLoading,
    isError,
    error,
    value,
    refetch: refetchCallback,
  };
}
