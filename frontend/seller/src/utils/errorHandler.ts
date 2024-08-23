import { NavigateFunction } from "react-router-dom";

export default function errorHandler(
  errCode: string,
  navigate: NavigateFunction,
): boolean {
  const ignoreErrors = ["I403", "M401", "C400"];
  const redirectToRefreshToken = ["J406", "J404"];
  const logoutErrors = ["J402", "J403"];
  const show404Errors = ["P400", "C400", "M400", "W400", "O400", "I401"];
  const show500Errors = ["S500"];

  if (ignoreErrors.includes(errCode)) {
    return false;
  }

  if (redirectToRefreshToken.includes(errCode)) {
    navigate("/refresh-token");
    return false;
  }

  if (logoutErrors.includes(errCode)) {
    // Trigger logout process here
    navigate("/logout");
    return false;
  }

  if (show404Errors.includes(errCode)) {
    navigate("/404");
    return false;
  }

  if (show500Errors.includes(errCode)) {
    navigate("/500");
    return false;
  }

  // If the error should be shown as a message
  return true;
}
