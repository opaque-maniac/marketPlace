/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Cookies from "universal-cookie";

const cookies = new Cookies();

const accessLabel: string = "azina-staff-access-token";
const refreshLabel: string = "hazina-staff-refresh-token";

export const setAccessToken = (token: string) => {
  cookies.set(accessLabel, token, {
    sameSite: "strict",
    expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 7),
  });
};

export const setRefreshToken = (token: string) => {
  cookies.set(refreshLabel, token, {
    sameSite: "strict",
    expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 30),
  });
};

export const getAccessToken = () => {
  return cookies.get(accessLabel) as string | undefined;
};

export const getRefreshToken = () => {
  return cookies.get(refreshLabel) as string | undefined;
};

export const removeAccessToken = () => {
  cookies.remove(accessLabel);
};

export const removeRefreshToken = () => {
  cookies.remove(refreshLabel);
};
