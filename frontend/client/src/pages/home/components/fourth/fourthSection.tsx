import { Link } from "react-router-dom";

const FourthSection = () => {
  return (
    <section className="h-518">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <div className="h-8 w-4 roundend animate-bounce bg-red-500 rounded-lg"></div>
          <div>
            <p className="text-red-400 text-lg">Today</p>
          </div>
        </div>
        <div>
          <Link
            to={""}
            className="w-159 h-56 bg-red-500 text-white flex justify-center items-center rounded"
          >
            <p>View all</p>
          </Link>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">Deals of the Day</h2>
      </div>
    </section>
  );
};

export default FourthSection;
