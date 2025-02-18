import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import Transition from "../../components/transition";
import ContactForm from "./form";
import MetaTags from "../../components/metacomponent";

const ContactPage = () => {
  return (
    <Transition>
      <MetaTags
        title="Contact | Hazina"
        description="Contact Hazina marketplace"
        keywords={[
          "contact",
          "complaints page",
          "contact hazina",
          "hazina contact",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main" className="h-full pt-20 relative md:pb-0 pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Contact</span>
        </p>
        <div className="flex justify-center items-center md:flex-row flex-col gap-4">
          <div className="shadow-xl border rounded-lg lg:w-auto md:w-250 w-80 md:mx-0 mx-auto px-2 py-2">
            <div className="">
              <div className="flex justify-start items-center gap-2">
                <div className="h-10 w-10 bg-red-400 rounded-full p-2">
                  <PhoneIcon />
                </div>
                <h3>Call To Us</h3>
              </div>
              <p>We are available 24/7 days a week.</p>
              <p>Phone: +12345678910</p>
            </div>
            <hr className="block my-4" />
            <div>
              <div className="flex justify-start items-center gap-2">
                <div className="h-10 w-10 bg-red-400 rounded-full p-2">
                  <EmailIcon />
                </div>
                <h3>Write To Us</h3>
              </div>
              <p>Fill out the form and we will contact you within 24 hours.</p>
              <p>Email: support@hazina.com</p>
              <p>Email: complaints@hazina.com</p>
            </div>
          </div>
          <div className="lg:w-600 md:w-500 shadow-xl border rounded-lg">
            <ContactForm />
          </div>
        </div>
      </main>
    </Transition>
  );
};

export default ContactPage;
