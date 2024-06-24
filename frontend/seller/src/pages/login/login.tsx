import LoginForm from "./components/loginForm";

const LoginPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-serif font-extrabold text-center lg:pt-8 pt-4 md:pb-0 pb-4">
        Log in
      </h2>
      <section className="md:flex justify-center items-start gap-8 h-400 lg:w-800 md:w-10/12 mx-auto">
        <div className="md:w-1/2 md:h-400 md:block hidden">
          <img
            src="/images/cartBagImg.svg"
            alt="Login"
            className="h-full w-full object-fit-cover"
          />
        </div>
        <div className="md:w-1/2 md:h-400 flex justify-center items-center">
          <div className="w-full">
            <div className="mb-4 w-7/12 mx-auto text-center">
              <h3 className="text-xl font-serif font-extrabold mb-4">
                Hazina Seller App
              </h3>
              <p>Welcome back</p>
              <p>Enter credentials below</p>
            </div>
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
