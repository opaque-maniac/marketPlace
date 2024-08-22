import FacebookIcon from "./icons/facebook";
import InstagramIcon from "./icons/instagram";
import LinkedinIcon from "./icons/linkedin";
import TwitterIcon from "./icons/twitter";

const Footer = () => {
  return (
    <footer className="bg-black w-full flex lg:justify-evenly justify-center lg:items-start items-center center lg:flex-row flex-col text-white pt-4 lg:pb-4 pb-2">
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Support</h3>
        <ul className="flex justify-center items-center flex-col gap-2">
          <li>
            <p>Hazina office</p>
          </li>
          <li>
            <p>+254 123 456 789</p>
          </li>
          <li>
            <p>complaints@hazina.com</p>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Accout</h3>
        <ul className="flex justify-center items-center flex-col gap-2">
          <li>
            <p>My Account</p>
          </li>
          <li>
            <p>Cart</p>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Quick Link</h3>
        <ul className="flex justify-center items-center flex-col gap-2">
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Socials</h3>
        <ul className="flex justify-center items-center flex-col gap-4">
          <li>
            <a
              href="http://www.facebook.com/hazina"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-6 w-6"
            >
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a
              href="http://www.twitter.com/hazina"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-6 w-6"
            >
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a
              href="http://www.instagram.com/hazina"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-6 w-6"
            >
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a
              href="http://www.linkedin.com/hazina"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-6 w-6"
            >
              <LinkedinIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
