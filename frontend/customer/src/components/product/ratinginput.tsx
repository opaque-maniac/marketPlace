import { MouseEvent, MouseEventHandler, useState } from "react";
import StarIcon from "../icons/star";
import { useMutation } from "@tanstack/react-query";
import { sendProductRating } from "../../utils/mutations/product/sendproductratings";
import Loader from "../loader";

interface Props {
  productID: string;
  initial: number;
  callback: () => void;
}

export default function RatingsInput({ productID, initial, callback }: Props) {
  const [value, setValue] = useState<number>(initial);
  const [error, setError] = useState<boolean>(false);
  const range = new Array(5).fill(0);

  const { isPending, mutate } = useMutation({
    mutationFn: sendProductRating,
    onError: () => {
      setError(true);
    },
    onSuccess: () => {
      callback();
    },
  });

  const clickHandler = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    setValue(idx + 1);
  };

  const submitHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ value, id: productID });
  };

  const errorClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setError(false);
  };

  if (error) {
    return (
      <div className="h-300 flex justify-center items-center">
        <div>
          <p>Something went wrong</p>
          <button
            aria-label="Send rating again"
            onClick={errorClickHandler}
            className="w-32 h-10 rounded flex justify-center items-center bg-black text-white"
          >
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex justify-evenly items-center mb-2">
        {range.map((_, idx) => (
          <li key={idx}>
            <button
              aria-label={`Rate product at ${idx + 1}`}
              onClick={(e) => clickHandler(e, idx)}
              style={{ color: idx < value ? "#FFFF00" : "#000" }}
              className="w-8 h-8 rounded"
            >
              <StarIcon fill={idx < value ? "#FFFF00" : undefined} />
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          disabled={isPending}
          onClick={submitHandler}
          aria-label="Send rating"
          className="flex justify-center items-center w-32 h-10 rounded bg-blue-500 text-white mx-auto"
        >
          {isPending ? (
            <div className="w-6 h-6">
              <Loader color="#fff"></Loader>
            </div>
          ) : (
            <span>Rate</span>
          )}
        </button>
      </div>
    </div>
  );
}
