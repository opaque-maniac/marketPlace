export default function errorHandler(
  errCode: string,
): [boolean, string | null] {
  const ignoreErrors = [
    "C400",
    "M400",
    "W400",
    "O401",
    "I400",
    "I401",
    "I403",
    "I402",
  ];
  const redirectToRefreshToken = ["J401"];
  const logoutErrors = ["J400", "J402", "J403", "J404", "J405", "R400"];
  const show404Errors = ["J406", "P400", "M402", "O400"];
  const show500Errors = ["S500", "M401", "BD100", "BD101", "BD102", "BD103"];

  if (!errCode) {
    return [false, "/500"];
  }

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

  if (ignoreErrors.includes(errCode)) {
    return [true, null];
  }

  // If the error should be shown as a message
  return [false, "/500"];
}
