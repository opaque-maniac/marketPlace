"use client";
import useUserStore from "@/utils/userStore";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const user = useUserStore((state) => state.getUser)();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <form>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input type="email" name="email" id="email" placeholder="email" />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default LoginForm;
