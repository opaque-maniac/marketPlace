import { Link } from "react-router-dom";
import userStore from "../utils/store";
import FacebookIcon from "./icons/facebook";
import InstagramIcon from "./icons/instagram";
import LinkedinIcon from "./icons/linkedin";
import TwitterIcon from "./icons/twitter";

const Footer = () => {
  const user = userStore((state) => state.user);

  return (
    <footer
      role="contentinfo"
      className="bg-black w-full flex lg:justify-evenly justify-center lg:items-start items-center center lg:flex-row flex-col text-white pt-4 lg:pb-4 pb-2"
    >
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Support</h3>
        <ul className="flex justify-center items-center flex-col gap-2">
          <li>
            <a
              className="lg:no-underline underline hover:underline"
              href="https://www.google.com/maps/place/Moi+Ave,+Nairobi/data=!4m2!3m1!1s0x182f10d6678064cf:0x956bb6f5e0ab2aac?sa=X&ved=1t:242&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Hazina office</p>
            </a>
          </li>
          <li>
            <a
              className="lg:no-underline underline hover:underline"
              href="tel:+254123456789"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>+254 123 456 789</p>
            </a>
          </li>
          <li>
            <a
              className="lg:no-underline underline hover:underline"
              href="mailto:complaints@hazina.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>complaints@hazina.com</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Accout</h3>
        <ul className="flex justify-center items-center flex-col gap-2">
          {user ? (
            <>
              <li>
                <Link
                  className="lg:no-underline underline hover:underline"
                  to={"/profile"}
                >
                  <p>My Account</p>
                </Link>
              </li>
              <li>
                <Link
                  className="lg:no-underline underline hover:underline"
                  to={"/logout"}
                >
                  <p>Log Out</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="lg:no-underline underline hover:underline"
                  to={"/login"}
                >
                  <p>Log In</p>
                </Link>
              </li>
              <li>
                <Link
                  className="lg:no-underline underline hover:underline"
                  to={"/register"}
                >
                  <p>Sign Up</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex justify-center items-center flex-col lg:mb-0 mb-8">
        <h3 className="text-lg font-bold">Quick Link</h3>
        <ul className="flex justify-center items-center flex-col gap-2">
          <li>
            <Link
              to={"/privacy"}
              className="lg:no-underline underline hover:underline"
            >
              <p>Privacy Policy</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/terms"}
              className="lg:no-underline underline hover:underline"
            >
              <p>Terms & Conditions</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/faq"}
              className="lg:no-underline underline hover:underline"
            >
              <p>FAQ</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="lg:no-underline underline hover:underline"
            >
              <p>Contact</p>
            </Link>
          </li>
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
