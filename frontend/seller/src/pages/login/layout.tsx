interface Props {
  children: React.ReactNode;
  page: string;
}

const AuthLayout = ({ children, page }: Props) => {
  return (
    <main className="h-full pt-20 relative">
      <p className="absolute top-4 left-4">
        {" "}
        Home / <span className="font-extrabold">{page}</span>
      </p>
      <section className="flex justify-center items-center gap-4 lg:pb-16 lg:flex-row flex-col">
        <div className="md:block hidden">
          <img
            src="/images/auth-image.svg"
            alt="Shopping cart and shopping bag"
            className="md:w-600 md:h-450"
          />
        </div>
        <div>{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
