import ContactIcon from "../../../components/icons/Contact";
import EmailIcon from "./email";

const ContactDetails = () => {
  return (
    <div>
      <div>
        <div className="flex justify-start items-center gap-4 ml-4 mt-2">
          <div
            aria-label="Phone Icon"
            className="bg-red-500 w-8 h-8 rounded-full flex justify-center items-center"
          >
            <ContactIcon />
          </div>
          <h3>Call to us</h3>
        </div>
        <div className="flex justify-center items-center">
          <div className="pl-4">
            <p>We are available, 24 hours for 7 days a week</p>
            <p>
              Phone:{" "}
              <a
                className="underline"
                href="tel:+254720123456"
                rel="noreferrer"
                target="_blank"
              >
                +254 720 123 456
              </a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-start items-center gap-4 ml-4 mt-2">
          <div
            aria-label="Email Icon"
            className="bg-red-500 w-8 h-8 rounded-full flex justify-center items-center"
          >
            <EmailIcon />
          </div>
          <h3>Write to us</h3>
        </div>
        <div className="flex justify-center items-center">
          <div className="pl-4">
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p className="mt-4">
              Emails:{" "}
              <a
                className="underline"
                href="mailto:customer@hazina.com"
                rel="noreferrer"
                target="_blank"
              >
                customer@hazina.com
              </a>
            </p>
            <p className="mt-2">
              Emails:{" "}
              <a
                className="underline"
                href="mailto:support@hazina.com"
                rel="noreferrer"
                target="_blank"
              >
                support@hazina.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
