import { Link } from "react-router-dom";
import Transition from "../../components/transition";

const FaqPage = () => {
  return (
    <Transition>
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">FAQ</span>
        </p>
        <div>
          <div className="pb-8 md:pl-0 pl-4">
            <h2 className="text-2xl font-bold">FAQ Page</h2>
          </div>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">1. What is Hazina?</h3>
            <p>
              Hazina is an online marketplace that connects sellers with buyers
              across various categories, making it easy to sell products to a
              wide audience. We provide tools to help you manage your store,
              track orders, and grow your business.
            </p>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              2. How do I sign up as a seller?
            </h3>
            <p>It is really easy:</p>
            <ol className="list-disc pl-8">
              <li>Go to the Hazina homepage and click on {`"Sign Up."`}</li>
              <li>
                Choose the {`"Seller"`} option and fill in the required details.
              </li>
              <li>Verify your email address and complete your profile.</li>
              <li>
                Once approved, you can start listing products on the
                marketplace.
              </li>
            </ol>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              3. What are the fees associated with selling on Hazina?
            </h3>
            <p>
              Hazina charges a small commission fee on each sale you make. There
              may also be fees for additional services, such as promotional
              tools or premium store features. For detailed information, please
              visit our Seller{" "}
              <Link className="underline" to={"/fees  "}>
                Fees page.
              </Link>
            </p>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              4. How do I list a product on Hazina?
            </h3>
            <p>You can do this by:</p>
            <ol className="list-disc pl-8">
              <li>Log in to your seller account.</li>
              <li>Go to the navigation and click {`"Add New Product."`}</li>
              <li>
                Enter the product details, such as name, description, price, and
                category.
              </li>
              <li>Upload high-quality images of the product.</li>
              <li>Click {`"Submit"`} to make your product live on Hazina.</li>
            </ol>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">5. How do I manage orders?</h3>
            <p>Can be achieved by:</p>
            <ol className="list-disc pl-8">
              <li>
                When a customer places an order, you’ll receive a notification.
              </li>
              <li>Go to the {`"Orders"`} section in your seller dashboard.</li>
              <li>
                Review the order details and prepare the product for shipment.
              </li>
              <li>
                Mark the order as shipped once {`it's`} dispatched, and provide
                tracking information if available.
              </li>
              <li>Monitor the order status until {`it's`} delivered.</li>
            </ol>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              6. What shipping options are available?
            </h3>
            <p>We have three shipping options:</p>
            <ul className="list-decimal pl-8">
              <li>
                <strong>Standard Shipping:</strong> Delivery within 3-5 business
                days.
              </li>
              <li>
                <strong>Express Shipping:</strong> Delivery within 1-2 business
                days.
              </li>
              <li>
                <strong>Custom Shipping:</strong> Set your own shipping options
                based on your preferred logistics partner.
              </li>
            </ul>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">7. How do I get paid?</h3>
            <p>
              Hazina processes payments securely. After an order is completed
              and confirmed, the payment will be transferred to your designated
              bank account. Payments are typically processed within 7 business
              days.
            </p>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              8. What can I do if I encounter a problem with a buyer?
            </h3>
            <p>You can:</p>
            <ol className="list-disc pl-8">
              <li>
                Try to resolve the issue directly through the messaging system.
              </li>
              <li>
                If unresolved, you can escalate the issue to {`Hazina's`}{" "}
                support team.
              </li>
              <li>
                Provide all necessary documentation and evidence to support your
                case.
              </li>
            </ol>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              9. Can I promote my products on Hazina?
            </h3>
            <p>
              Yes! Hazina offers promotional tools such as featured listings,
              discounts, and advertising opportunities to help you reach more
              customers. Visit the {`"Promotions"`} section in your seller
              dashboard to explore your options.
            </p>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              10. How do I close my seller account?
            </h3>
            <p>Follow these steps:</p>
            <ol className="list-disc pl-8">
              <li>
                Ensure all pending orders are fulfilled and disputes are
                resolved.
              </li>
              <li>
                Go to the {`"Account Settings"`} section in your dashboard.
              </li>
              <li>Click on {`"Close Account"`} and follow the prompts.</li>
              <li>
                Once your account is closed, you will receive a confirmation
                email.
              </li>
            </ol>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              11. How can I contact Hazina support?
            </h3>
            <p>You can reach us through:</p>
            <ul className="list-decimal pl-8">
              <li>
                <strong>Email:</strong> support@hazina.com
              </li>
              <li>
                <strong>Phone:</strong> +123-456-7890
              </li>
              <li>
                <strong>Live Chat:</strong> Available in your seller dashboard.
              </li>
            </ul>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              12. Is there a mobile app for sellers?
            </h3>
            <p>
              Yes, Hazina offers a mobile app that allows you to manage your
              store, track orders, and communicate with buyers on the go.
              Download it from the App Store or Google Play.
            </p>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              13. What resources are available to help me succeed on Hazina?
            </h3>
            <ul className="list-decimal pl-8">
              <li>
                <strong>Seller Academy:</strong> Tutorials and courses on how to
                optimize your store.
              </li>
              <li>
                <strong>Webinars:</strong> Live sessions with experts on
                e-commerce trends.
              </li>
              <li>
                <strong>Community Forum:</strong> Connect with other sellers to
                share tips and experiences.
              </li>
            </ul>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              14. Can I integrate Hazina with my existing e-commerce platform?
            </h3>
            <p>
              Hazina does supports integrations with several popular e-commerce
              platforms. We are hoping we can work on this feature soon enough.
            </p>
          </section>

          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">
              15. How does Hazina handle returns and refunds?
            </h3>
            <p>Here is how:</p>
            <ol className="list-disc pl-8">
              <li>Review the return request in the {`"Returns"`} section.</li>
              <li>Approve or deny the request based on the return policy.</li>
              <li>If approved, arrange for the product to be returned.</li>
              <li>
                Once the product is received and inspected, issue a refund
                through the platform.
              </li>
            </ol>
          </section>
        </div>
      </main>
    </Transition>
  );
};

export default FaqPage;
