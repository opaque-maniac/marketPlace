import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import Transition from "../../components/transition";
import ContactForm from "./form";

const ContactPage = () => {
  return (
    <Transition>
      <main className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Contact</span>
        </p>
        <div className="">
          <div>
            <div className="">
              <div>
                <div className="h-10 w-10 bg-red-400 rounded-full p-2">
                  <PhoneIcon />
                </div>
                <h3>Call To Us</h3>
              </div>
              <p>We are available 24/7 days a week.</p>
              <p>Phone: +12345678910</p>
            </div>
            <div>
              <div>
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
          <div>
            <ContactForm />
          </div>
        </div>
      </main>
    </Transition>
  );
};

export default ContactPage;
