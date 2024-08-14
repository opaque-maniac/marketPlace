import Cookies from "universal-cookie";

const cookies = new Cookies();

export const login = (authToken: string, refreshToken: string) => {
  cookies.set("authToken", authToken, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthToken = () => {
  return cookies.get("authToken") as string | undefined;
};

export const getRefreshToken = () => {
  return cookies.get("refreshToken") as string | undefined;
};

export const setAuthToken = (authToken: string) => {
  cookies.set("authToken", authToken, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const logout = () => {
  cookies.remove("authToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
};
