import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { fetchOrderItems } from "../../utils/queries/orders";
import { MouseEventHandler, useState } from "react";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import OrderItemList from "../../components/orders/itemlist";

interface Props {
  id: string;
}

const OrderItems = ({ id }: Props) => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery({
    queryFn: fetchOrderItems,
    queryKey: ["orderItems", page, 10, id],
  });

  const data = query.data;

  const handlePrev: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      {query.isLoading ? (
        <section className="md:min-h-400 min-h-96 flex justify-center items-center">
          <div className="w-10 h-10">
            <Loader color="#000000" />
          </div>
        </section>
      ) : (
        <div className="pt-6">
          {data && (
            <>
              <section>
                <OrderItemList items={data.orderItems || []} />
              </section>
              <section className="flex justify-center items-center gap-6 pt-10 pb-4">
                <div>
                  <button
                    disabled={!data || page == 1}
                    className="w-8 h-8 p-1 rounded-full border border-black"
                    onClick={handlePrev}
                  >
                    <ArrowLeft />
                  </button>
                </div>
                <div>{page}</div>
                <div>
                  <button
                    disabled={!data || query.data?.hasNext === false}
                    className="w-8 h-8 p-1 rounded-full border border-black"
                    onClick={handleNext}
                  >
                    <ArrowRight />
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderItems;
