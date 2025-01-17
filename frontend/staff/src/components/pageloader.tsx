import Loader from "./loader";
import Transition from "./transition";

const PageLoader = () => {
  return (
    <Transition time={1}>
      <main className="flex justify-center items-center min-h-screen">
        <div className="h-10 w-10">
          <Loader color="#000" />
        </div>
      </main>
    </Transition>
  );
};

export default PageLoader;
