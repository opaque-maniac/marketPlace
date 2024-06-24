const RegisterForm = () => {
  return (
    <form className="w-400 md:mx-0 mx-auto">
      <div className="mb-6 lg:w-350 md:w-300 w-8/12 mx-auto">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="block w-full h-full px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-300 w-8/12 mx-auto">
        <label htmlFor="email" className="sr-only">
          First NAme
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          className="block w-full h-full px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-300 w-8/12 mx-auto">
        <label htmlFor="email" className="sr-only">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          className="block w-full h-full px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-300 w-8/12 mx-auto">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="block w-full h-full px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-black"
        />
      </div>
      <div>
        <button
          type="submit"
          className="block bg-gray-300 w-20 h-10 rounded shadow-lg mx-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-400 hover:text-white text-black transition duration-300 ease-in-out"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
