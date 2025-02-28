/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Cookies from "universal-cookie";
import { ROLE } from "./types";

const cookies = new Cookies();

const accessLabel: string = "hazina-staff-access-token";
const refreshLabel: string = "hazina-staff-refresh-token";
const userIDLabel: string = "hazina-staff-user-id";
const staffRoleLabel: string = "hazina-staff-status";

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

export const setStaffRole = (status: string) => {
  cookies.set(staffRoleLabel, status, {
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

export const getUserID = () => {
  return cookies.get(userIDLabel) as string | undefined;
};

export const getStaffRole = () => {
  return cookies.get(staffRoleLabel) as ROLE | undefined;
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

export const removeStaffRole = () => {
  cookies.remove(staffRoleLabel);
};
