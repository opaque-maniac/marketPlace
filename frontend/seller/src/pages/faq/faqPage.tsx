const FAQPage = () => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Hazina FAQs</h2>
      <div className="lg:w-10/12 mx-auto text-center">
        <h3 className="text-xl text-center font-bold mb-4">
          About Products & Ordering
        </h3>

        <h4 className="text-lg font-bold text-center">
          What kind of products does Hazina offer?
        </h4>
        <p>
          Hazina offers a curated selection of stylish and affordable clothing,
          accessories, and tech gear for the modern man on the go. Find
          everything you need to look and feel your best, from everyday
          essentials to statement pieces.
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          How do I find the right size?
        </h4>
        <p>
          We recommend checking out our sizing guide [link to sizing guide]
          before placing your order. It provides detailed measurements for each
          product to ensure a perfect fit. If you have any further questions
          about sizing, feel free to contact our customer service team!
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          Do your products have warranties?
        </h4>
        <p>
          The warranty policy varies depending on the product. Most clothing and
          accessories come with a standard warranty against manufacturing
          defects. For tech gear, the warranty information is usually included
          with the product itself. If you have any questions about a specific
          {"product's"} warranty, {"don't"} hesitate to ask!
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          How can I place an order?
        </h4>
        <p>
          Ordering on Hazina is easy! Simply browse our website, add your
          desired items to your cart, and proceed to checkout. During checkout,
          {"you'll"} be able to create an account (recommended for faster future
          purchases) or checkout as a guest. Follow the on-screen instructions
          and choose your preferred payment method.
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          What are the different payment methods available?
        </h4>
        <p>
          Hazina accepts all major credit cards (Visa, Mastercard, American
          Express), debit cards, and most mobile wallets like Apple Pay and
          Google Pay.
        </p>
      </div>
      <div className="w-10/12 mx-auto text-center">
        <h3 className="text-xl text-center font-bold mt-8 mb-4">
          About Customer Service
        </h3>

        <h4 className="text-lg font-bold text-center">
          What are your shipping rates and times?
        </h4>
        <p>
          Shipping rates and times depend on your location and chosen shipping
          method. We offer various options to suit your needs, from express
          delivery to standard shipping. You can see the estimated delivery
          window for each option during checkout. For more detailed information
          on shipping costs and times, visit our dedicated shipping information
          page [link to shipping info page].
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          Do you offer free returns or exchanges?
        </h4>
        <p>
          Absolutely! Hazina offers a hassle-free return and exchange policy.
          You can return or exchange most items within 30 days of purchase,
          provided they are unworn and have their original tags attached. For
          full details and instructions, please visit our returns and exchanges
          page [link to returns and exchanges page].
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          How can I track my order?
        </h4>
        <p>
          Once your order ships, {"you'll"} receive a confirmation email.{" "}
          {"You'll"} also recieve two more, one for when the order leaves the
          warehouse and when it arrives at the nearest pick up station.
        </p>
        <h4 className="text-lg font-bold text-center mt-2">
          How can I contact customer service?
        </h4>
        <p>
          Our friendly customer service team is here to help! You can reach us
          by email{" "}
          <a target="_blank" rel="noreferrer" href="mailto:support@hazina.com">
            here
          </a>{" "}
          or by phone{" "}
          <a target="_blank" rel="noreferrer" href="tel:+254712345678">
            here
          </a>
          . We also offer live chat support during business hours
          (Monday-Friday, 9am-5pm EST).
        </p>
        <p>
          We hope this FAQ has been helpful! If you have any further questions,
          please {"don't"} hesitate to contact us.
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
