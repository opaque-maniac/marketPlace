import { MouseEventHandler, Suspense, useEffect } from "react";
import Modal from "../modal";
import CloseIcon from "../icons/closeIcon";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";
import MoreComments from "./fetchmorecomments";
import IndividualComment from "./indivudalcomment";
import ArrowLeft from "../icons/arrowleft";

interface Props {
  productID: string;
}
const Fallback = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function MoreCommentsButton({ productID }: Props) {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const open = params.get("open") === "true" ? true : false;
  const commentID = params.get("id");

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(`?open=true`, { replace: true });
  };

  useEffect(() => {
    return () => {
      if (open) {
        navigate("", { replace: true });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        onClick={onclick}
        aria-label="See more comments"
        className="xl:no-underline xl:hover:underline underline"
      >
        See more
      </button>
      {open && (
        <Modal
          callback={() => {
            navigate(`/products/${productID}`, { replace: true });
          }}
        >
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="bg-white xl:w-7/12 md:w-10/12 w-full xl:h-[600px] md:h-[800px] h-screen relative">
              <div className="absolute top-0 w-full bg-white z-40 flex gap-2 items-center pl-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("", { replace: true });
                  }}
                  aria-label="close comments"
                  className="block w-8 h-8 order-2"
                >
                  <CloseIcon />
                </button>
                {commentID && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("?open=true", { replace: true });
                    }}
                    aria-label="go back to comments"
                    className="block w-5 h-5"
                  >
                    <ArrowLeft />
                  </button>
                )}
              </div>
              <div className="h-full pt-9 overflow-scroll no-scrollbar flex justify-center items-start">
                <Suspense fallback={<Fallback />}>
                  {!commentID ? (
                    <MoreComments productID={productID} />
                  ) : (
                    <IndividualComment />
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
