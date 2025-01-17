import Loader from "./loader";
import Transition from "./transition";

const PageLoader = () => {
  const color = "#000000";

  return (
    <Transition time={1}>
      <main
        style={{
          height: "calc(100vh + 3.5rem)",
        }}
        className="flex justify-center items-center"
      >
        <div className="h-10 w-10">
          <Loader color={color} />
        </div>
      </main>
    </Transition>
  );
};

export default PageLoader;
