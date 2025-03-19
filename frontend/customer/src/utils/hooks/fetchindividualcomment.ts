import { Comment, SuccessIndividualCommentResponse } from "../types";
import { useEffect, useState, useCallback } from "react";
import { apiHost, apiProtocol } from "../generics";
import { ErrorResponse } from "react-router-dom";
import { responseError } from "../errors";

async function fetchCommentData<T>(id: string) {
  const url = `${apiProtocol}://${apiHost}/customers/comments/${id}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    let data: ErrorResponse | undefined = undefined;

    try {
      data = (await response.json()) as ErrorResponse;
    } catch (e) {
      throw responseError;
    }

    throw new Error(JSON.stringify(data));
  }

  const data = (await response.json()) as T;
  return data;
}

export default function useFetchIndividualComment(id: string) {
  const [comment, setComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComment = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCommentData<SuccessIndividualCommentResponse>(id);
      setComment(data.comment);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something unexpected happened",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComment();
  }, []);

  const refetch = () => {
    fetchComment(); // Reset comments and fetch fresh data
  };

  return {
    comment,
    loading,
    error,
    refetch, // Expose refetch function
  };
}
