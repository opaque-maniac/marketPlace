const TermsAndConditions = () => {
  return (
    <div>
      <h2 className="text-center text-xl font-bold">
        Hazina Terms and Conditions
      </h2>
      <p className="text-center">
        Welcome to Hazina! These Terms and Conditions below govern your use of
        our website and the services we offer. By accessing or using the Site or
        Services, you agree to be bound by these Terms. If you do not agree to
        all of the Terms, you are not authorized to use the site.
      </p>
      <ol className="list-decimal list-outside pl-5 mt-4">
        <li>
          <h3 className="text-lg font-bold">Acceptance of Terms</h3>

          <p>
            These Terms constitute a legally binding agreement between you{" "}
            {`("you" or "User")`} and Hazina. Your access to and use of the Site
            and Services is subject to these Terms and our Privacy Policy, which
            is incorporated into these Terms by reference. You acknowledge that
            you have read, understood, and agree to be bound by these Terms and
            our Privacy Policy.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Changes to Terms</h3>

          <p>
            We reserve the right to update or modify these Terms at any time.
            The amended Terms will be posted on the Site. Your continued use of
            the Site or Services following the posting of amended Terms
            constitutes your acceptance of the amended Terms. We recommend you
            review the Terms periodically for any updates or changes.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">User Accounts</h3>

          <p>
            You may need to create an account to access certain features of the
            Site or Services. You are responsible for maintaining the
            confidentiality of your account information, including your
            password. You are also responsible for all activity that occurs
            under your account. You agree to notify us immediately of any
            unauthorized use of your account or any other security breach.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">User Conduct</h3>

          <p>
            You agree to use the Site and Services in a lawful and respectful
            manner. You will not:
          </p>
          <ul className="list-outside list-disc pl-10">
            <li>
              <p>
                Use the Site or Services for any purpose that is unlawful or
                prohibited by these Terms.
              </p>
            </li>
            <li>
              <p>Violate any applicable laws or regulations.</p>
            </li>
            <li>
              <p>
                Infringe on the intellectual property rights of Hazina or any
                third party.
              </p>
            </li>
            <li>
              <p>
                Transmit any material that is defamatory, harassing,
                threatening, obscene, or hateful.
              </p>
            </li>
            <li>
              <p>Interfere with or disrupt the Site or Services.</p>
            </li>
            <li>
              <p>Impersonate any person or entity.</p>
            </li>
            <li>
              <p>
                Attempt to gain unauthorized access to the Site or Services.
              </p>
            </li>
          </ul>
        </li>

        <li>
          <h3 className="text-lg font-bold mt-2">Intellectual Property</h3>

          <p>
            The Site and Services contain intellectual property owned by Hazina
            or its licensors, including trademarks, copyrights, and patents. You
            are granted a non-exclusive, non-transferable license to use the
            Site and Services in accordance with these Terms. You agree not to
            use any intellectual property of Hazina or its licensors without our
            express written permission.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Disclaimer</h3>

          <p>
            The Site and Services are provided {`"as is"`} and without
            warranties of any kind, express or implied. Hazina disclaims all
            warranties, including, but not limited to, warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. Hazina does not warrant that the Site or Services
            will be uninterrupted or error-free, that defects will be corrected,
            or that the Site or Services or the server that makes them available
            are free of viruses or other harmful components. You use the Site
            and Services at your own risk.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Limitation of Liability</h3>

          <p>
            Hazina will not be liable for any damages arising out of or related
            to your use of the Site or Services, including, but not limited to,
            direct, indirect, incidental, consequential, or punitive damages.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Terminationy</h3>

          <p>
            We may terminate your access to the Site or Services for any reason,
            at any time, without notice. We may also suspend access to the Site
            or Services to perform maintenance or updates.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Governing Law</h3>

          <p>
            These Terms will be governed by and construed in accordance with the
            laws of Kenya, without regard to its conflict of law provisions.
          </p>
        </li>

        <li>
          <h3 className="text-lg font-bold mt-2">Entire Agreement</h3>

          <p>
            These Terms constitute the entire agreement between you and Hazina
            regarding your use of the Site and Services.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mt-2">Contact Us</h3>

          <p>
            If you have any questions about these Terms, please contact us{" "}
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

export default TermsAndConditions;
