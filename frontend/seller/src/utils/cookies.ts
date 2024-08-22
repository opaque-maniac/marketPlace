import Cookies from "universal-cookie";

const cookies = new Cookies();

// Function to set the access token in a secure cookie
export const setAccessToken = (accessToken: string) => {
  cookies.set("access_token", accessToken, {
    secure: true,
    sameSite: "strict",
  });
};

// Function to set the refresh token in a secure cookie
export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refresh_token", refreshToken, {
    secure: true,
    sameSite: "strict",
  });
};

// Function to get the access token from the secure cookie
export const getAccessToken = () => {
  return cookies.get("access_token") as string | undefined;
};

// Function to get the refresh token from the secure cookie
export const getRefreshToken = (): string | undefined => {
  return cookies.get("refresh_token") as string | undefined;
};

// Function to update the access token in the secure cookie
export const updateAccessToken = (newAccessToken: string) => {
  setAccessToken(newAccessToken);
};

// Function to update the refresh token in the secure cookie
export const updateRefreshToken = (newRefreshToken: string) => {
  setRefreshToken(newRefreshToken);
};
