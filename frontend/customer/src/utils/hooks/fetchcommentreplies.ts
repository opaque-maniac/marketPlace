import { Comment } from "../types";
import { useEffect, useState, useCallback } from "react";
import { apiHost, apiProtocol } from "../generics";
import { ErrorResponse } from "react-router-dom";
import { responseError } from "../errors";

async function fetchReplies<T>(id: string, page: number, limit: number) {
  const url = `${apiProtocol}://${apiHost}/customers/comments/${id}/replies?page=${page}&limit=${limit}`;
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

type SuccessReplies = {
  hasNext: boolean;
  replies: Comment[];
};

export default function useCommentReplies(id: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 3;

  const fetchComments = useCallback(
    async (reset = false) => {
      setLoading(true);
      setError(null);

      try {
        const currentPage = reset ? 1 : page;
        const data = await fetchReplies<SuccessReplies>(id, currentPage, limit);

        const prev = page - 1 - limit;
        if (comments.length === prev) {
          setComments((prevComments) =>
            reset ? data.replies : [...prevComments, ...data.replies],
          );
        } else {
          const copy = [
            ...comments.slice(0, prev),
            ...data.replies,
            ...comments.slice(prev + 1, comments.length),
          ];
          setComments(copy);
        }
        setHasMore(data.hasNext);
        if (reset) setPage(1); // Reset to first page on refetch
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Something unexpected happened",
        );
      } finally {
        setLoading(false);
      }
    },
    [id, page],
  );

  useEffect(() => {
    fetchComments();
  }, [page]);

  const refetch = () => {
    fetchComments(true); // Reset comments and fetch fresh data
  };

  return {
    comments,
    page,
    loading,
    error,
    hasMore,
    setPage,
    refetch, // Expose refetch function
  };
}
