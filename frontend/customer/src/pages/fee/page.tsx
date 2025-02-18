import MetaTags from "../../components/metacomponent";
import Transition from "../../components/transition";

const FeePage = () => {
  return (
    <Transition>
      <MetaTags
        title="Fee | Hazina"
        description="Hazina marketplace fee structure"
        keywords={[
          "fees",
          "fee structure",
          "fees page",
          "fee hazina",
          "hazina fees",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Fee</span>
        </p>
        <div>
          <div className="pb-8 md:pl-0 pl-4">
            <h2 className="text-2xl font-bold">Fees Page</h2>
          </div>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">1. Introduction</h3>
            <p>
              At Hazina, we strive to keep our fee structure simple and
              transparent. Our primary source of revenue is a small share of the
              money you earn from sales made through our platform. This ensures
              that we only succeed when you do.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">2. Account Registration Fees</h3>
            <p>
              Creating a seller account on Hazina is completely free. You can
              register, set up your store, and start listing products without
              any upfront costs.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">3. Listing Fees</h3>
            <p>
              Hazina does not charge any fees for listing products. You can list
              as many products as you like across various categories without
              incurring any charges.{" "}
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">4. Transaction Fees</h3>
            <p>
              Hazina earns revenue through a small transaction fee, which is a
              percentage of the total sale price (including any shipping fees).
              This fee is automatically deducted from the funds you receive when
              a sale is completed. The standard transaction fee is:
            </p>
            <ul className="list-decimal pl-8">
              <li>
                <p>
                  <strong>Hazina Transaction Fee:</strong> 10% of the total sale
                  price
                </p>
              </li>
            </ul>
            <p>
              This transaction fee helps us maintain and improve the platform,
              providing you with the tools and services needed to succeed as a
              seller.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">5. Payment Processing</h3>
            <p>
              We handle all payment processing to ensure secure and efficient
              transactions between you and your buyers. The payment processing
              fee is included in the transaction fee, so you won’t see any
              separate charges for this service. Once a transaction is complete,
              the net amount after fees will be credited to your Hazina account.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">6. Payouts</h3>
            <p>
              Funds from your sales will be available for withdrawal once the
              order is confirmed by the buyer. You can request a payout to your
              bank account at any time. Hazina does not charge any additional
              fees for payouts, but please note that your bank may apply its own
              fees for receiving funds.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">7. Refunds and Returns</h3>
            <p>
              If a refund is issued to a buyer, the transaction fee is
              non-refundable. However, Hazina will handle the payment processing
              fees associated with the refund. We encourage sellers to maintain
              clear communication with buyers to minimize disputes and returns.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">8. Taxes</h3>
            <p>
              As a seller, you are responsible for collecting and remitting any
              applicable taxes on your sales. Hazina provides tools to help you
              calculate and apply taxes to your product prices. Depending on
              your location and the {`buyer's`} location, taxes such as VAT or
              sales tax may be required.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">9. Fee Changes</h3>
            <p>
              Hazina reserves the right to modify its fees at any time. Any
              changes to the fee structure will be communicated to sellers in
              advance and will take effect on the date specified in the notice.
              Continued use of the platform after fee changes take effect
              constitutes acceptance of the new fees.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">10. Contact Us</h3>
            <p>
              If you have any questions or concerns about {`Hazina's`} fees and
              payments, please contact our support team:
            </p>
            <ul className="list-decimal pl-8">
              <li>
                <p>
                  <strong>Email:</strong> fees@hazina.com
                </p>
              </li>
              <li>
                <p>
                  <strong>Phone:</strong> +254-123-456-789
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </Transition>
  );
};

export default FeePage;
