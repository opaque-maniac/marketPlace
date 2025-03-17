import StarIcon from "../icons/star";

interface Props {
  count: number;
  value: number;
}

export default function ProductRatings({ count, value }: Props) {
  const array = new Array(5).fill(0);

  return (
    <div className="h-180 md:w-399 w-80 mx-auto border border-black rounded-lg">
      <div className="w-10/12 mx-auto">
        <h4 className="text-lg font-semibold">Ratings:</h4>
        <div className="flex gap-2">
          <p>
            <span className="text-lg font-semibold">{value}</span>
            <span className="text-sm">/5</span>
          </p>
          <p>Reviews: {count}</p>
        </div>
      </div>
      <ul className="w-full flex justify-evenly items-center mt-4">
        {array.map((_, idx) => (
          <li key={idx}>
            <div className="w-8 h-8">
              <StarIcon fill={idx < value ? "#000" : undefined} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
