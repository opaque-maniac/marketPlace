import { NavigateFunction } from "react-router-dom";

export default function ManageQueryStr(
  navigate: NavigateFunction,
  page: string | null,
  query: string | null,
  other?: string | null,
  otherStr?: string,
) {
  let url: string | null = null;

  if (!otherStr) {
    if (page === null || query === null) {
      url = `?page=${Number(page) || 1}&query=${query === null ? "" : query}`;
    }
  } else {
    if (page === null || query === null || other === null) {
      url = `?page=${Number(page) || 1}&query=${
        query === null ? "" : query
      }&${otherStr}=${other === null ? "" : other}`;
    }
  }

  if (url !== null) {
    console.log(url);
    navigate(url, { replace: true });
  }
}
