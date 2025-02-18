import MetaTags from "../../components/metacomponent";
import Transition from "../../components/transition";

const PrivacyPage = () => {
  return (
    <Transition>
      <MetaTags
        title="Privacy | Hazina"
        description="Hazina Privacy Policy"
        keywords={[
          "privacy",
          "privacy policy",
          "data protection",
          "data privacy",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Privacy</span>
        </p>

        <div className="pb-8 md:pl-0 pl-4">
          <h2 className="text-2xl font-bold">Hazina Privacy Policy</h2>
        </div>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">1. Introduction</h3>
          <p>
            At Hazina, we are committed to protecting your privacy and ensuring
            that your personal information is handled in a safe and responsible
            manner. This Privacy Policy explains how we collect, use, and share
            information about you when you use our platform.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">2. Information We Collect</h3>
          <p>
            We collect various types of information to provide and improve our
            services. This includes:
          </p>
          <ol className="list-disc pl-8">
            <li>
              <p>
                <strong>Personal Information:</strong> Information that can be
                used to identify you, such as your name, email address, phone
                number, and payment details.
              </p>
            </li>
            <li>
              <p>
                <strong>Account Information:</strong> Information related to
                your account, such as your username, password, and order
                history.
              </p>
            </li>
            <li>
              <p>
                <strong>Transaction Information:</strong> Details about
                purchases and sales you make on Hazina, including product
                details, shipping information, and payment data.
              </p>
            </li>
            <li>
              <p>
                <strong>Technical Information:</strong> Information about your
                device and usage of our platform, such as IP address, browser
                type, operating system, and access times.
              </p>
            </li>
          </ol>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">3. How We Use Your Information</h3>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ol className="list-disc pl-8">
            <li>
              <p>
                <strong>To Provide Our Services:</strong> We use your
                information to facilitate transactions, process payments, and
                manage your account.
              </p>
            </li>
            <li>
              <p>
                <strong>To Improve Our Platform:</strong> We analyze usage data
                to improve our website, mobile app, and overall user experience.
              </p>
            </li>
            <li>
              <p>
                <strong>To Communicate With You:</strong> We use your contact
                information to send you updates, promotions, and important
                notices related to your account.
              </p>
            </li>
            <li>
              <p>
                <strong>To Protect Against Fraud:</strong> We use your
                information to detect and prevent fraudulent activities on our
                platform.
              </p>
            </li>
            <li>
              <p>
                <strong>To Comply With Legal Obligations:</strong> We may use
                your information to comply with applicable laws, regulations,
                and legal processes.
              </p>
            </li>
          </ol>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">4. Sharing Your Information</h3>
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your information with
          </p>
          <ol className="list-disc pl-8">
            <li>
              <p>
                <strong>Service Providers:</strong> Third-party vendors who
                assist us in providing our services, such as payment processors,
                shipping companies, and customer support.
              </p>
            </li>
            <li>
              <p>
                <strong>Business Partners:</strong> Partners with whom we
                collaborate to offer joint products or services, subject to your
                consent.
              </p>
            </li>
            <li>
              <p>
                <strong>Legal Authorities:</strong> Law enforcement or
                government agencies when required by law or to protect the
                rights and safety of Hazina and our users.
              </p>
            </li>
          </ol>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">
            5. Cookies and Tracking Technologies
          </h3>
          <p>
            Hazina uses cookies and similar tracking technologies to enhance
            your browsing experience and gather information about how you use
            our platform. Cookies are small data files that are stored on your
            device. You can manage your cookie preferences through your browser
            settings, but disabling cookies may limit your ability to use
            certain features of our platform.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">6. Data Security</h3>
          <p>
            We take data security seriously and implement appropriate measures
            to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the internet or electronic storage is 100% secure,
            and we cannot guarantee the absolute security of your data.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">7. Your Rights and Choices</h3>
          <p>
            You have certain rights regarding your personal information,
            including:
          </p>
          <ol className="list-disc pl-8">
            <li>
              <p>
                <strong>Access:</strong> You can request a copy of the personal
                information we hold about you.
              </p>
            </li>
            <li>
              <p>
                <strong>Correction:</strong> You can request that we correct any
                inaccurate or incomplete information.
              </p>
            </li>
            <li>
              <p>
                <strong>Deletion:</strong> You can request that we delete your
                personal information, subject to certain exceptions.
              </p>
            </li>
            <li>
              <p>
                <strong>Opt-Out:</strong> You can opt out of receiving
                promotional communications from us by following the unsubscribe
                instructions in our emails or contacting us directly.
              </p>
            </li>
          </ol>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">8. {`Children's`} Privacy</h3>
          <p>
            Hazina is not intended for use by children under the age of 13, and
            we do not knowingly collect personal information from children. If
            we become aware that we have collected information from a child
            under 13, we will take steps to delete it as soon as possible.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">9. International Data Transfers</h3>
          <p>
            Your information may be transferred to and processed in countries
            other than your own. We ensure that such transfers comply with
            applicable data protection laws and that your information remains
            protected.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">
            10. Changes to This Privacy Policy
          </h3>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any significant changes by
            posting the updated policy on our platform and updating the{" "}
            {'"Last Updated"'} date at the top of this page.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">11. How to Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </p>
          <ol className="list-disc pl-8">
            <li>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@hazina.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy@hazina.com
                </a>
              </p>
            </li>
            <li>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+254123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +254-123-456-789
                </a>
              </p>
            </li>
            <li>
              <p>
                <strong>Address:</strong> Moi Avenue, Nairobi
              </p>
            </li>
          </ol>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">12. Consent</h3>
          <p>
            By using Hazina, you consent to the collection, use, and sharing of
            your information as described in this Privacy Policy. If you do not
            agree with our practices, please do not use our platform.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">13. Third-Party Links</h3>
          <p>
            Our platform may contain links to third-party websites or services.
            We are not responsible for the privacy practices of these third
            parties, and we encourage you to review their privacy policies
            before providing any personal information.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">14. Data Retention</h3>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </p>
        </section>
        <section className="mb-4 md:px-0 px-2">
          <h3 className="text-xl pl-4 pb-2">15. Dispute Resolution</h3>
          <p>
            Any disputes arising from or relating to this Privacy Policy or your
            use of Hazina will be resolved through binding arbitration in
            accordance with {`Kenya's`} laws. You agree to resolve any disputes
            on an individual basis and waive your right to participate in a
            class action.
          </p>
        </section>
      </main>
    </Transition>
  );
};

export default PrivacyPage;
