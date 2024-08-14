"use client";
import useUserStore from "@/utils/userStore";
import { redirect } from "next/navigation";

const Home = () => {
  const user = useUserStore((state) => state.getUser)();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
  return null;
};

export default Home;
