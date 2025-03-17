/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Cookies from "universal-cookie";

const cookies = new Cookies();

const accessLabel: string = "hazina-customer-access-token";
const refreshLabel: string = "hazina-customer-refresh-token";
const profileImageLabel: string = "hazina-customer-profile-image";
const userIDLabel: string = "hazina-customer-user-id";

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

export const setUserID = (id: string) => {
  cookies.set(userIDLabel, id, {
    sameSite: "strict",
    expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 30),
  });
};

export const setProfileImage = (url: string | null) => {
  cookies.set(profileImageLabel, url, {
    expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 30),
  });
};

export const getAccessToken = () => {
  return cookies.get(accessLabel) as string | undefined;
};

export const getRefreshToken = () => {
  return cookies.get(refreshLabel) as string | undefined;
};

export const getUserID = () => {
  return cookies.get(userIDLabel) as string | undefined;
};

export const getProfileImage = () => {
  return cookies.get(profileImageLabel) as string | null;
};

export const removeAccessToken = () => {
  cookies.remove(accessLabel);
};

export const removeRefreshToken = () => {
  cookies.remove(refreshLabel);
};

export const removeUserID = () => {
  cookies.remove(userIDLabel);
};

export const removeProfileImage = () => {
  cookies.remove(profileImageLabel);
};
