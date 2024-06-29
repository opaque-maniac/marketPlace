import { Link } from "react-router-dom";
import RegisterForm from "./components/registerForm";

const RegisterPage = () => {
  return (
    <div className="md:pt-8 pt-4 flex lg:flex-row flex-col justify-center items-center lg:gap-14 gap-4">
      <section className=" md:block hidden">
        <img
          src="/images/cartBagImg.svg"
          alt="Login"
          className="object-fit-cover md:w-1/2 lg:w-500 rounded-3xl overflow-hidden lg:h-500 lg:mx-0 md:mx-auto block"
        />
      </section>
      <section>
        <h2
          className="font-sans font-semibold mb-4"
          style={{ fontSize: "1.8rem" }}
        >
          Log In To Hazina
        </h2>
        <p className="mb-8" style={{ fontSize: "0.9rem" }}>
          Enter your details below
        </p>
        <div>
          <RegisterForm />
        </div>
        <div className="pt-6 flex justify-center items-end lg:hover:underline lg:no-underline underline">
          <Link to="/login" className="">
            Log In Instead!
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
