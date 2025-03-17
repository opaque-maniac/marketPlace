import { MouseEventHandler } from "react";
import { Misconduct } from "../utils/types";

interface Props {
  misconduct: Misconduct;
  current: number;
  index: number;
  setSelected: (n: number) => void;
}

export default function RadioInput({
  misconduct,
  current,
  index,
  setSelected,
}: Props) {
  const isSelected = index === current;

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSelected(index);
  };

  return (
    <button
      onClick={clickHandler}
      aria-label={`Select ${misconduct.misconduct}`}
      className={`block text-start h-[100px] border border-black/20 p-[5px] w-full ${
        isSelected ? "bg-blue-100" : "bg-gray-50"
      }`}
    >
      <input
        type="radio"
        id={misconduct.id}
        name="misconduct-id"
        value={misconduct.id}
        className="mr-2"
        checked={isSelected}
        onChange={() => setSelected(index)}
        required
      />
      <label htmlFor={misconduct.id}>{misconduct.misconduct}</label>
      <p className="text-xs">
        {misconduct.description.length > 100
          ? `${misconduct.description.substring(0, 100)}...`
          : misconduct.description}
      </p>
    </button>
  );
}
