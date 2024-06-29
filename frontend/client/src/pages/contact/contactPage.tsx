import ContactDetails from "./components/details";
import ContactForm from "./components/form";

const ContactPage = () => {
  return (
    <div className="relative lg:pt-20 pt-16">
      <span className="absolute top-4 left-4">
        <span>Home</span> / <span className="font-bold">Contact</span>
      </span>
      <section className="lg:flex md:block lg:justify-center lg:items-start gap-8">
        <div className="lg:w-340 lg:h-357 rounded shadow-lg border w-340 lg:mx-0 mx-auto lg:py-0 py-4">
          <ContactDetails />
        </div>
        <div className="lg:w-800 md:w-700 md:mx-auto lg:mb-0 mb-4 lg:mt-0 mt-8 w-340 lg:mx-0 mx-auto lg:h-357 rounded shadow-lg border p-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
