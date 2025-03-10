import CloseIcon from "./icons/closeIcon";
import userStore from "../utils/store";
import AuthNavigation from "./authNav";
import NoAuthNavigation from "./noAuthNav";
import { memo } from "react";

const MemoizedAuthNav = memo(AuthNavigation);
const NoAuthNav = memo(NoAuthNavigation);

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
        className="h-8 w-8 fixed top-4 left-4 z-40 bg-white rounded-full border border-black flex items-center justify-center p-[4px]"
      >
        <CloseIcon />
      </button>
      <div className="fixed h-screen md:w-72 w-52 top-0 right-0 z-40 bg-white">
        <nav role="navigation">
          {user ? (
            <div>
              <MemoizedAuthNav callback={callback} />
            </div>
          ) : (
            <div className="mt-10">
              <NoAuthNav callback={callback} />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
