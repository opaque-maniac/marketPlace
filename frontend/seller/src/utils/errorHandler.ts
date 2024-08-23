export default function errorHandler(
  errCode: string,
): [boolean, string | null] {
  const ignoreErrors = ["I403", "M401", "C400"];
  const redirectToRefreshToken = ["J406", "J404"];
  const logoutErrors = ["J402", "J403"];
  const show404Errors = ["P400", "C400", "M400", "W400", "O400", "I401"];
  const show500Errors = ["S500"];

  if (ignoreErrors.includes(errCode)) {
    return [true, null];
  }

  if (redirectToRefreshToken.includes(errCode)) {
    return [false, "/refresh-token"];
  }

  if (logoutErrors.includes(errCode)) {
    // Trigger logout process here
    return [false, "/logout"];
  }

  if (show404Errors.includes(errCode)) {
    return [false, "/404"];
  }

  if (show500Errors.includes(errCode)) {
    return [false, "/500"];
  }

  // If the error should be shown as a message
  return [true, null];
}
