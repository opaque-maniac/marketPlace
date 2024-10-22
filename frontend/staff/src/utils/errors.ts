export const tokenError = () => {
  const errObj = {
    message: "Access token not found",
    errorCode: "J402",
  };
  const errString = JSON.stringify(errObj);
  const error = new Error(errString);
  return error;
};

export const refreshTokenError = () => {
  const errObj = {
    message: "Refresh token not found",
    errorCode: "J403",
  };

  const errString = JSON.stringify(errObj);
  const error = new Error(errString);
  return error;
};

export const responseError = () => {
  const errObj = {
    message: "Server error",
    errorCode: "S500",
  };

  const errString = JSON.stringify(errObj);
  const error = new Error(errString);
  return error;
};
