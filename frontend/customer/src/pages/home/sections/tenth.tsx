import PhoneIcon from "../../../components/icons/phone";
import ShieldIcon from "../../../components/icons/shield";
import TruckIcon from "../../../components/icons/truck";

const TenthSection = () => {
  return (
    <section className="min-h-80 md:flex justify-center items-center md:py-0 py-10">
      <div className="w-full">
        <ul className="flex md:justify-evenly justify-center md:flex-row flex-col items-center md:gap-0 gap-4">
          <li>
            <div
              style={{ width: "249px", height: "161px" }}
              className="flex justify-center items-center flex-col gap-4"
            >
              <div className="rounded-full bg-gray-500 h-20 w-20 p-2">
                <div className="rounded-full bg-black h-16 w-16 text-white p-3">
                  <TruckIcon />
                </div>
              </div>
              <div className="text-center">
                <h3>FREE AND FAST DELIVERY</h3>
                <p>Free delieries for all orders over $140</p>
              </div>
            </div>
          </li>
          <li>
            <div
              style={{ width: "249px", height: "161px" }}
              className="flex justify-center items-center flex-col gap-4"
            >
              <div className="rounded-full bg-gray-500 h-20 w-20 p-2">
                <div className="rounded-full bg-black h-16 w-16 text-white p-3">
                  <PhoneIcon />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">24/7 CUSTOMER SERVICE</h3>
                <p>Friendly 24/7 customer support</p>
              </div>
            </div>
          </li>
          <li>
            <div
              style={{ width: "249px", height: "161px" }}
              className="flex justify-center items-center flex-col gap-4"
            >
              <div className="rounded-full bg-gray-500 h-20 w-20 p-2">
                <div className="rounded-full bg-black h-16 w-16 text-white p-3">
                  <ShieldIcon />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">MONEY BACK GUARANTEE</h3>
                <p>We return money within 30 days</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TenthSection;
