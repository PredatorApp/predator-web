import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-medium">Privacy Policy</h1>
      <div className="mt-2 prose max-w-none space-y-6">
        <p className="text-zinc-400">Last Updated: July 27, 2025</p>

        <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
        <p className="text-zinc-200">
          Prince Technologies LLC ("we," "our," or "us") values your privacy.
          This Privacy Policy explains how Predator (the "Service") available via
          our website{' '}
          <Link
            href="https://predator.app"
            className="underline underline-offset-4"
          >
            predator.app
          </Link>{' '}
          and the Predator mobile applications for iOS and Android collect, use,
          and safeguards your information. By using the Service, you consent to
          the practices described below.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          2. Information We Collect
        </h2>
        <p className="text-zinc-200">
          We collect the following types of information:
        </p>
        <ul className="list-disc pl-6 my-2 text-zinc-200">
          <li>
            <strong>Account Information:</strong> Information you provide when
            creating an account or purchasing a subscription, such as name,
            email address, and payment details.
          </li>
          <li>
            <strong>User Content:</strong> Community tips (unverified), photos,
            feedback, or other content you submit via the app.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with
            the Service, including device information, operating system, pages
            or screens viewed, and timestamps.
          </li>
          <li>
            <strong>Cookies & Similar Technologies:</strong> Data collected
            through cookies, local storage, and analytics tools to remember
            preferences and measure app performance.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          3. How We Use Your Information
        </h2>
        <p className="text-zinc-200">We use your information to:</p>
        <ul className="list-disc pl-6 my-2 text-zinc-200">
          <li>
            Provide, operate, and maintain the Service, including maps, offender
            data, and alerts.
          </li>
          <li>
            Process payments and manage subscriptions for premium features (e.g.,
            alerts, advanced filters).
          </li>
          <li>Personalize content and remember saved locations and preferences.</li>
          <li>
            Send administrative messages, safety alerts, updates, and
            promotional offers (you may opt out).
          </li>
          <li>
            Analyze usage to improve safety features and expand data coverage.
          </li>
          <li>
            Detect, prevent, and address technical issues or fraudulent
            activity.
          </li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          4. Sharing Your Information
        </h2>
        <p className="text-zinc-200">
          We do not sell your personal information. We may share it with:
        </p>
        <ul className="list-disc pl-6 my-2 text-zinc-200">
          <li>
            <strong>Service Providers:</strong> Vendors who assist with payment
            processing, analytics, hosting, or customer support.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required to comply with law
            or protect our rights and users.
          </li>
          <li>
            <strong>Aggregated or Anonymized Data:</strong> We may share
            non-identifiable data for analytics or marketing.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">5. Data Retention</h2>
        <p className="text-zinc-200">
          We retain your information as long as necessary to provide the Service
          and fulfill legal obligations. You may request deletion of your
          account data; some records (e.g., purchase history) may be retained as
          required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Security</h2>
        <p className="text-zinc-200">
          We use industry-standard safeguards to protect your data. No method of
          transmission or storage is 100% secure, so we cannot guarantee
          absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Your Rights</h2>
        <p className="text-zinc-200">
          Depending on your location, you may have rights to access, correct,
          delete, or export your personal data, or to object to certain
          processing. To exercise these rights, contact us at{' '}
          <Link
            href="mailto:support@predator.app"
            className="text-white underline underline-offset-4"
          >
            support@predator.app
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Children’s Privacy</h2>
        <p className="text-zinc-200">
          The Service is not directed to children under 13. We do not knowingly
          collect personal information from children under 13. If we discover
          such information, we will delete it promptly.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          9. Third-Party Links & Integrations
        </h2>
        <p className="text-zinc-200">
          The Service may include links or integrations with third-party
          platforms (e.g., social media for sharing images) and public registry
          sources. We are not responsible for their content or privacy
          practices. Review their policies before interacting.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          10. International Transfers
        </h2>
        <p className="text-zinc-200">
          Your information may be processed in the United States or other
          countries where we or our service providers operate. These locations
          may have data-protection laws differing from your jurisdiction. By
          using the Service, you consent to such transfers.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          11. Cookies & Tracking Technologies
        </h2>
        <p className="text-zinc-200">
          We use cookies and similar technologies to keep you logged in,
          remember preferences, and analyze usage. You may disable cookies via
          browser or device settings, but some features may not function
          properly.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          12. Changes to This Privacy Policy
        </h2>
        <p className="text-zinc-200">
          We may update this Policy from time to time. Material changes will be
          posted here and, where appropriate, notified via email or in-app
          message. Continued use of the Service after changes signifies
          acceptance.
        </p>

        <h2 className="text-xl font-semibold mt-6">13. Contact Us</h2>
        <p className="text-zinc-200">
          If you have questions or concerns regarding this Policy, contact us at{' '}
          <Link
            href="mailto:support@predator.app"
            className="text-white underline underline-offset-4"
          >
            support@predator.app
          </Link>
          . For legal inquiries, email{' '}
          <Link
            href="mailto:legal@predator.app"
            className="text-white underline underline-offset-4"
          >
            legal@predator.app
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
