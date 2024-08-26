import { Link } from "react-router-dom";
import Transition from "../../components/transition";

const TermsPage = () => {
  return (
    <Transition>
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Terms & Conditions</span>
        </p>
        <div>
          <div className="pb-8 md:pl-0 pl-4">
            <h2 className="text-2xl font-bold">Hazina Privacy Policy</h2>
          </div>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">1. Introduction</h3>
            <p>
              Welcome to Hazina, an online marketplace that connects sellers and
              buyers. By accessing or using our platform, you agree to be bound
              by these Terms and Conditions. If you do not agree to these terms,
              please do not use Hazina.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">2. Account Registration</h3>
            <p>
              To become a seller on Hazina, you must register for an account.
              You agree to provide accurate, current, and complete information
              during the registration process and update such information to
              keep it accurate and current.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">3. User Responsibilities</h3>
            <p>
              As a user of Hazina, you are responsible for maintaining the
              confidentiality of your account information, including your
              password, and for all activities that occur under your account.
              You agree to notify Hazina immediately of any unauthorized use of
              your account.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">4. Prohibited Activities</h3>
            <p>
              You agree not to engage in any of the following prohibited
              activities:
            </p>
            <ol className="list-disc pl-8">
              <li>
                <p>
                  Violating any local, state, national, or international law.
                </p>
              </li>
              <li>
                <p>
                  Posting, uploading, or transmitting any content that is
                  unlawful, defamatory, or otherwise objectionable.
                </p>
              </li>
              <li>
                <p>Engaging in fraudulent or deceptive practices.</p>
              </li>
              <li>
                <p>
                  Interfering with or disrupting the {`platform's`}{" "}
                  functionality.
                </p>
              </li>
              <li>
                <p>
                  Misrepresenting your identity or affiliation with any person
                  or entity.
                </p>
              </li>
            </ol>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">5. Product Listings</h3>
            <p>
              As a seller, you are responsible for the accuracy and legality of
              your product listings. You agree to comply with all applicable
              laws and regulations, including those related to consumer
              protection, product safety, and intellectual property.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">6. Payment and Fees</h3>
            <p>
              Hazina charges a commission on each sale made through the
              platform. By listing products on Hazina, you agree to the payment
              terms and fees outlined in the{" "}
              <Link className="undeline" to={"/fees"}>
                Seller Fees
              </Link>{" "}
              section. Hazina reserves the right to change its fees at any time,
              with notice provided to you in advance.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">7. Shipping and Fulfillment</h3>
            <p>
              You are responsible for shipping and fulfilling orders within the
              time frame specified in your product listings. You agree to
              provide accurate tracking information and ensure that products are
              delivered to buyers in a timely and safe manner.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">8. Returns and Refunds</h3>
            <p>
              Hazina provides a platform for handling returns and refunds. You
              agree to comply with {`Hazina's`} return and refund policies and
              respond promptly to any return requests. Refunds must be processed
              through Hazina, and any direct transactions between buyers and
              sellers outside the platform are prohibited.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">9. Intellectual Property</h3>
            <p>
              All content on Hazina, including text, graphics, logos, and
              images, is the property of Hazina or its content suppliers and is
              protected by intellectual property laws. You may not use,
              reproduce, or distribute any content from Hazina without express
              written permission.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">10. Privacy Policy</h3>
            <p>
              Your use of Hazina is also governed by our{" "}
              <Link className="underline" to={"/privacy"}>
                Privacy Policy
              </Link>
              , which outlines how we collect, use, and protect your personal
              information. By using Hazina, you consent to the collection and
              use of your information as described in the Privacy Policy.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">11. Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, Hazina and its affiliates
              shall not be liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to
              your use of the platform, including but not limited to loss of
              profits, data, or goodwill.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">12. Indemnification</h3>
            <p>
              You agree to indemnify and hold harmless Hazina and its affiliates
              from any claims, losses, damages, liabilities, including legal
              fees, arising out of your use of the platform, your violation of
              these terms, or your violation of any rights of another.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">13. Termination</h3>
            <p>
              Hazina reserves the right to terminate or suspend your account at
              any time, with or without cause, and with or without notice. Upon
              termination, you must cease all use of the platform and may not
              access your account or any data associated with it.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">14. Governing Law</h3>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of Kenya. Any disputes arising under or
              related to these terms shall be resolved in the courts of Kenya.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">15. Changes to Terms</h3>
            <p>
              Hazina reserves the right to modify these Terms and Conditions at
              any time. Any changes will be effective immediately upon posting.
              Your continued use of the platform after the changes constitutes
              your acceptance of the new terms.
            </p>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">16. Contact Information</h3>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at:
            </p>
            <ul>
              <li>
                <p>Email: legal@hazina.com</p>
              </li>
              <li>
                <p>Phone: +123-456-7890</p>
              </li>
              <li>
                <p>Address: 123 Hazina Street, City, Country</p>
              </li>
            </ul>
          </section>
          <section className="mb-4 md:px-0 px-2">
            <h3 className="text-xl pl-4 pb-2">17. Entire Agreement</h3>
            <p>
              These Terms and Conditions, together with our Privacy Policy and
              any other legal notices published by Hazina, constitute the entire
              agreement between you and Hazina concerning your use of the
              platform.
            </p>
          </section>
        </div>
      </main>
    </Transition>
  );
};

export default TermsPage;
