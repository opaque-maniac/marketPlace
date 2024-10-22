export const tokenError = () => {
  const errObj = {
    message: "Access token not found",
    errorCode: "J402",
  };
  const errString = JSON.stringify(errObj);
  const error = new Error(errString);
  return error;
};
