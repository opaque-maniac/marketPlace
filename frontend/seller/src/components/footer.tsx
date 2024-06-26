import { Link } from "react-router-dom";
import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";
import TwitterIcon from "./icons/Twitter";
import LinkedinIcon from "./icons/LinkedIn";

const Footer = () => {
  return (
    <footer className="w-screen bg-black text-white md:flex justify-center items-start lg:gap-32 md:gap-14 py-4">
      <div>
        <h3 className="text-xl text-center font-bold mb-2">Support</h3>
        <ul className="md:mb-0 mb-8">
          <li className="mb-2 md:block flex justify-center">
            <p className="mx-auto">11th Kimathi Street, Nairobi</p>
          </li>
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:support@hazina.com"
            >
              support@hazina.com
            </a>
          </li>
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <a target="_blank" rel="noreferrer" href="tel:+254712345678">
              +254 712 345 678
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl text-center font-bold mb-2">Account</h3>
        <ul className="md:mb-0 mb-8">
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <Link to={"/profile"}>My Account</Link>
          </li>
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <Link to={"/login"}>Log In</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl text-center font-bold mb-2">Quick Links</h3>
        <ul className="md:mb-0 mb-8">
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <Link to={"/privacy"}>Privacy Policy</Link>
          </li>
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <Link to={"/terms"}>Terms Of Use</Link>
          </li>
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <Link to={"/faq"}>FAQ</Link>
          </li>
          <li className="mb-2 md:block flex justify-center">
            {" "}
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl text-center font-bold mb-2">Socials</h3>
        <ul className="md:mb-0 mb-8">
          <li className="flex justify-center mb-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/hazina"
              aria-label="Facebook link with facebook icon"
            >
              <FacebookIcon />
            </a>
          </li>
          <li className="flex justify-center mb-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/hazina"
              aria-label="Instagram link with instagram icon"
            >
              <InstagramIcon />
            </a>
          </li>
          <li className="flex justify-center mb-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.x.com/hazina"
              aria-label="Twitter link with twitter icon"
            >
              <TwitterIcon />
            </a>
          </li>
          <li className="flex justify-center mb-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/hazina"
              aria-label="Linked link with linked in icon"
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
