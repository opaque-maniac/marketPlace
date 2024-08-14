"use client";
import { logout } from "@/utils/cookieManagement";
import userStore from "@/utils/userStore";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

const LogoutPage = () => {
  const user = userStore(() => userStore((state) => state.getUser))();
  const stateReset = userStore((state) => state.logout);

  useLayoutEffect(() => {
    if (!user) {
      redirect("/login");
    }
  });

  logout();
  stateReset();

  return (
    <div>
      <h2>Please wait while we log you out</h2>
    </div>
  );
};

export default LogoutPage;
