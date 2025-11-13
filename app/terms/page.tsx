import Link from 'next/link';

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-medium">Terms of Service</h1>
      <div className="mt-2 prose max-w-none space-y-6">
        <p className="text-zinc-400">Last Updated: July 27, 2025</p>

        <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
        <p className="text-zinc-200">
          Welcome to Predator (
          <Link
            href="https://predator.app"
            className="underline underline-offset-4"
          >
            predator.app
          </Link>
          ), a mobile application and website (collectively, the "Service")
          owned and operated by Prince Technologies LLC ("we," "our," or "us").
          By accessing or using the Service, you agree to be bound by these
          Terms of Service ("Terms"). If you do not agree with these Terms,
          please discontinue use of the Service immediately.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          2. Eligibility & Account Registration
        </h2>
        <p className="text-zinc-200">
          You must be at least 13 years of age (or older, if required by local
          law) to use Predator. Some features, including premium subscriptions, may
          require you to create an account. You agree to provide accurate
          information when creating an account and to keep that information up
          to date. You are responsible for all activities that occur under your
          account.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          3. Content and Intellectual Property
        </h2>
        <p className="text-zinc-200">
          Predator provides an interactive map of registered sex offenders,
          offender details, alerts, and community-submitted tips (unverified)
          ("Content") intended to help users stay informed and safe. Community
          tips are user-generated and may not be verified.
          Unless otherwise noted, all Content and software associated with the
          Service are the property of Prince Technologies LLC or its licensors
          and are protected by intellectual-property laws. You may not
          reproduce, distribute, modify, or create derivative works from the
          Service without our prior written permission.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          3.1 User-Generated Content
        </h3>
        <p className="text-zinc-200">
          If you submit community tips, reports, photos, feedback, or other
          materials ("User Content"),
          you grant us a non-exclusive, worldwide, royalty-free license to use,
          display, reproduce, and distribute that User Content in connection
          with the Service. You represent that you own or have the necessary
          rights to submit such User Content and that it does not infringe any
          third-party rights.
        </p>

        <h3 className="text-lg font-semibold mt-4">3.2 Data Sources</h3>
        <p className="text-zinc-200">
          Some information may originate from public registries, government or
          law-enforcement websites, community submissions, or third-party data
          providers. All information is provided "as is" and may not be verified
          for accuracy or completeness.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Acceptable Use</h2>
        <p className="text-zinc-200">You agree not to:</p>
        <ul className="list-disc pl-6 my-2">
          <li>Use the Service for any illegal or unauthorized purpose;</li>
          <li>
            Post or submit content that is defamatory, hateful, harassing, or
            violates any law;
          </li>
          <li>
            Attempt to reverse engineer, decompile, or otherwise interfere with
            the Service;
          </li>
          <li>
            Automate access to the Service (e.g., scraping, bots) without our
            prior consent;
          </li>
          <li>Share your account credentials or sell access to premium features.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          5. Premium Features & Subscriptions
        </h2>
        <p className="text-zinc-200">
          Predator offers premium features and subscription plans that unlock
          additional functionality (e.g., alerts, advanced filters, additional
          data). Prices, billing cycles, and renewal terms are
          presented in-app at the time of purchase. Payments are processed by
          Apple App Store or Google Play, and their respective terms apply. All
          subscription fees are non-refundable except as required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Sharing</h2>
        <p className="text-zinc-200">
          The Service may allow you to share screenshots or links to offender
          profiles or alerts. Shared content may include Predator branding and
          may be publicly visible on third-party platforms. You are solely
          responsible for the content you share and for complying with the terms
          of any platform where you post.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          7. Disclaimer of Warranties
        </h2>
        <p className="text-zinc-200">
          THE SERVICE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE"
          WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING
          BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE
          THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE OR THAT ALL
          INFORMATION WILL BE COMPLETE, CURRENT, OR ACCURATE.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          8. Limitation of Liability
        </h2>
        <p className="text-zinc-200">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRINCE TECHNOLOGIES LLC SHALL
          NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
          DIRECTLY OR INDIRECTly, OR ANY LOSS OF DATA, USE, GOOD-WILL, OR OTHER
          INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF THE
          SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY; OR (C)
          UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS.
        </p>

        <h2 className="text-xl font-semibold mt-6">9. Indemnification</h2>
        <p className="text-zinc-200">
          You agree to indemnify and hold harmless Prince Technologies LLC and
          its officers, directors, employees, and agents from any claims,
          damages, or expenses arising out of your use of the Service or
          violation of these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">10. Termination</h2>
        <p className="text-zinc-200">
          We may suspend or terminate your access to the Service at any time,
          with or without notice, if we believe you have violated these Terms or
          if necessary to protect the integrity of the Service.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          11. Governing Law & Dispute Resolution
        </h2>
        <p className="text-zinc-200">
          These Terms are governed by the laws of the State of North Carolina,
          without regard to its conflict of law provisions. Any dispute arising
          out of or relating to these Terms or the Service shall be resolved
          through binding arbitration in North Carolina under the rules of the
          American Arbitration Association.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          12. Changes to These Terms
        </h2>
        <p className="text-zinc-200">
          We may update these Terms periodically. Material changes will be
          posted on the Service or communicated to you through other reasonable
          means. Your continued use of the Service after such changes
          constitutes acceptance of the revised Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">13. Contact Us</h2>
        <p className="text-zinc-200">
          For questions, feedback, or legal inquiries, please email us at{' '}
          <Link
            className="text-white underline underline-offset-4"
            href="mailto:support@predator.app"
          >
            support@predator.app
          </Link>{' '}
          or{' '}
          <Link
            className="text-white underline underline-offset-4"
            href="mailto:legal@predator.app"
          >
            legal@predator.app
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
