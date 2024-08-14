"use client";
import userStore from "@/utils/userStore";
import { redirect } from "next/navigation";

const IsAuthenticated = () => {
  const user = userStore((state) => state.getUser)();

  if (!user) {
    redirect("/login");
  }

  return null;
};

export default IsAuthenticated;
