"use client";
import userStore from "@/utils/userStore";
import { redirect } from "next/navigation";

const IsNotAuthenticated = () => {
  const user = userStore((state) => state.getUser)();

  if (user) {
    redirect("/home");
  }

  return null;
};

export default IsNotAuthenticated;
