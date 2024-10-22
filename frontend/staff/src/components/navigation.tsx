import CloseIcon from "./icons/closeIcon";
import userStore from "../utils/store";
import NoAuthNav from "./noAuthNav";
import AuthNavigation from "./authNav";

interface Props {
  callback: () => void;
}

const Navigation = ({ callback }: Props) => {
  const user = userStore((state) => state.user);

  return (
    <>
      <button
        aria-label="Close Menu"
        onClick={(e) => {
          e.preventDefault();
          callback();
        }}
        className="h-8 w-8 fixed top-4 left-4 z-40 bg-white rounded-lg border border-black flex items-center justify-center"
      >
        <CloseIcon />
      </button>
      <div className="fixed h-screen md:w-96 w-52 top-0 right-0 z-40 bg-white">
        <nav role="navigation">
          {user ? (
            <div>
              <AuthNavigation />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 md:h-600 h-400 px-2">
              <NoAuthNav callback={callback} />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
