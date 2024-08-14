import Image from "next/image";
import IsNotAuthenticated from "./_components/isNotAuthenticated";

interface PropType {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: PropType) => {
  return (
    <>
      <IsNotAuthenticated />
      <main
        className="md:flex justify-center items-center gap-10 pb-4"
        style={{ minHeight: "calc(100vh - 30vh)" }}
      >
        <div className="md:px-0 px-4 md:mx-0 mx-auto">
          <Image
            src="/auth-bg.jpg"
            width={450}
            height={450}
            alt="Picture of the a cart and shopping bag"
          />{" "}
        </div>
        <div>{children}</div>
      </main>
    </>
  );
};

export default AuthLayout;
