import Loader from "./loader";
import Transition from "./transition";

const PageLoader = () => {
  const color = "#000000";

  return (
    <Transition time={1}>
      <main className="flex justify-center items-center h-screen w-full">
        <div className="w-10 h-10">
          <Loader color={color} />
        </div>
      </main>
    </Transition>
  );
};

export default PageLoader;
