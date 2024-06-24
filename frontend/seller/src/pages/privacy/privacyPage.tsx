const PrivacyPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center">Hazina Privacy Policy</h2>
      <p className="text-center">
        Hazina respects the privacy of its users. This Privacy Policy describes
        how we collect, use, and disclose your personal information when you use
        our website and the services we offer.
      </p>

      <ol className="list-outside list-decimal pl-6 mt-4">
        <li>
          <h3 className="text-lg font-bold mt-2">Information We Collect</h3>
          <p>We collect the following types of information:</p>
          <ul className="list-outside list-disc pl-5">
            <li>
              <p>
                <span>Information you provide:</span> This includes information
                you provide when you create an account, place an order,
                subscribe to our newsletter, or contact us. This may include
                your name, email address, shipping address, billing address,
                phone number, and payment information.
              </p>
            </li>
            <li>
              <p>
                <span>Information collected automatically:</span> We may collect
                certain information automatically when you use the Site or
                Services. This may include your IP address, browser type,
                operating system, referring URL, and browsing activity on the
                Site.{" "}
              </p>
            </li>
            <li>
              <p>
                <span>Cookies and other tracking technologies:</span> We may use
                cookies and other tracking technologies to collect information
                about your activity on the Site. Cookies are small data files
                that are stored on your device. We use cookies to personalize
                your experience on the Site, keep track of your shopping cart,
                and analyze traffic to the Site. You can control or disable
                cookies through your browser settings. Please note that
                disabling cookies may limit your use of certain features of the
                Site.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Use of Your Information</h3>
          <p>We use your information for the following purposes:</p>
          <ul className="list-outside list-disc pl-5">
            <li>
              <p>To fulfill your orders and provide the Services.</p>
            </li>
            <li>
              <p>To send you marketing and promotional communications.</p>
            </li>
            <li>
              <p>To personalize your experience on the Site.</p>
            </li>
            <li>
              <p>To analyze traffic to the Site.</p>
            </li>
            <li>
              <p>To improve the Site and Services.</p>
            </li>
            <li>
              <p>To comply with the law.</p>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Sharing Your Information</h3>
          <p>
            We may share your information with third-party service providers who
            help us operate the Site and Services. These service providers are
            contractually obligated to keep your information confidential and
            secure.
          </p>
          <p>
            We may also share your information with third-party advertisers and
            marketing partners. We will obtain your consent before sharing your
            information with any third-party advertisers or marketing partners.
            You may opt out of receiving marketing communications from us at any
            time. Please see the {`"Your Choices"`} section below for more
            information.
          </p>
          <p>
            We may also disclose your information if we are required to do so by
            law or in the good faith belief that such disclosure is necessary to
            protect our rights or the rights of others.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Your Choices</h3>
          <p>You have the following choices regarding your information:</p>
          <ul className="list-outside list-disc pl-5">
            <li>
              <p>
                You can opt out of receiving marketing communications from us by
                clicking on the {`"unsubscribe"`} link in any marketing email we
                send you.
              </p>
            </li>
            <li>
              <p>
                You can access and update your account information at any time
                by logging into your account.
              </p>
            </li>
            <li>
              <p>
                You can request that we delete your information by contacting us
                at [your email address]. Please note that we may not be able to
                delete all of your information, such as information that is
                necessary to comply with the law.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Security</h3>
          <p>
            We take reasonable steps to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, no security measures are perfect, and we cannot guarantee
            that your information will never be accessed, disclosed, altered, or
            destroyed by a breach of any of our safeguards.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">{"Children's"} Privacy</h3>
          <p>
            Our Site and Services are not directed to children under the age of
            13. We do not knowingly collect personal information from children
            under the age of 13. If you are a parent or guardian and you believe
            that your child has provided us with personal information, please
            contact us at [your email address]. We will delete any personal
            information we have collected from your child.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">International Transfers</h3>
          <p>
            Your information may be transferred to and processed in countries
            other than your own country of residence. These countries may have
            different data protection laws than your own country. By using the
            Site or Services, you consent to the transfer of your information to
            these countries.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">
            Updates to this Privacy Policy
          </h3>
          <p>
            We may update this Privacy Policy from time to time. We will post
            any changes to this Privacy Policy on the Site. We encourage you to
            review the Privacy Policy periodically for any updates or changes.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Consent</h3>
          <p>
            By using the Site or Services, you consent to the collection, use,
            and disclosure of your information as described in this Privacy
            Policy.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us{" "}
            <a
              href="mailto:service@hazina.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </li>
      </ol>
    </div>
  );
};

export default PrivacyPage;
