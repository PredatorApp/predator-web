import Link from 'next/link';
import {
  ExternalLink,
  LegalCallout,
  LegalPage,
  LegalTable,
  type LegalSection,
} from '@/components/legal/legal-page';
import {
  LEGAL_CONTACT_EMAIL,
  legalEmailHref,
  legalMetadata,
} from '@/lib/legal';

export const metadata = legalMetadata(
  '/privacy',
  'Privacy Policy',
  'How Predator handles account information, location, analytics, subscriptions, public records, and privacy requests.'
);

const dataRows = [
  [
    'Account and session identifiers',
    'An anonymous account ID, generated account details, session credentials, linked provider IDs, session IP address, and user agent.',
    'Run the app without conventional sign-up, secure access, and connect your installation with subscription and service records.',
  ],
  [
    'Optional onboarding answers',
    'Goals, gender, age range, whether you have children, referral source, and experiment assignment where provided.',
    'Adapt onboarding, understand feature use, and evaluate product experiences. These answers can be associated with your app account and analytics profile.',
  ],
  [
    'Device location and map areas',
    'GPS coordinates when permission is granted, the area displayed on a map, and coordinates used for a nearby search.',
    'Center the map, calculate nearby results, and support location-related features. Coordinates can be transmitted to our API when a search requires them.',
  ],
  [
    'Search information',
    'Names, addresses, cities, ZIP codes, map bounds, and search inputs you submit.',
    'Return requested records and locate places. Address-search text and proximity coordinates can be sent to Mapbox. Request information can also appear in operational logs.',
  ],
  [
    'Subscription and purchase information',
    'App-store product and transaction identifiers, purchase and renewal events, entitlement status, expiry, store, currency, and subscription-provider identifiers.',
    'Unlock paid access, restore purchases, manage subscription status, measure purchases, and address billing or support issues. Complete card numbers are handled by the store.',
  ],
  [
    'Usage, device, and diagnostics',
    'App opens, screens and features used, record-view events, onboarding and paywall events, app and operating-system versions, device identifiers, IP-derived approximate location, and error information.',
    'Measure product and campaign performance, identify errors, improve features, and prevent abuse.',
  ],
  [
    'Notification information',
    'Push tokens, notification-permission state, opt-out preferences, and notification delivery or interaction events.',
    'Deliver permitted messages and respect notification settings.',
  ],
  [
    'Support and rights requests',
    'Your contact information, correspondence, record links or identifiers, explanation, and any evidence you choose to provide.',
    'Answer questions, verify requests, correct errors, comply with legal duties, and maintain a record of the response.',
  ],
] as const;

const recipientRows = [
  [
    'Hosting, security, and support',
    'Account and session records, requests, IP addresses, diagnostics, stored service data, and support correspondence used to operate, secure, and support Predator.',
  ],
  [
    'Maps and location services',
    'Searched places, map areas, coordinates, IP addresses, and technical requests needed to display maps, suggest places, and locate search areas.',
  ],
  [
    'App stores and subscription services',
    'App-user and transaction identifiers, purchase events, entitlement status, and related records used for billing, paid access, and purchase restoration.',
  ],
  [
    'Analytics and marketing measurement',
    'Pseudonymous identifiers, optional onboarding answers, usage and purchase events, IP/device information, approximate location, campaign parameters, and advertising identifiers where available, used for product analysis, attribution, and fraud prevention.',
  ],
  [
    'Communication services',
    'App identifiers, push tokens, preferences, relevant profile or purchase events, and message interactions used to deliver and manage communications.',
  ],
] as const;

const retentionRows = [
  [
    'Account, identity, and onboarding records',
    'Retained to maintain the installation, preferences, access, and support relationship. An approved deletion request covers these records, subject to the exceptions below.',
  ],
  [
    'Session credentials and local settings',
    'Session credentials remain usable until expiry or revocation. Device settings and stored preferences remain until cleared, replaced, or removed through the app or operating system; uninstall behavior can differ by platform.',
  ],
  [
    'Searches and location-related requests',
    'Used to respond to the request, with operational logs retained for troubleshooting, security, and legal needs under the relevant log lifecycle.',
  ],
  [
    'Analytics, attribution, and experiments',
    'Retained for product analysis, campaign measurement, fraud prevention, and related investigation, according to the relevant provider configuration and applicable deletion obligations.',
  ],
  [
    'Push tokens and message information',
    'Retained while needed for messaging, preferences, delivery records, and troubleshooting. Disabling delivery is distinct from deleting all historical message information.',
  ],
  [
    'Purchase and financial records',
    'Retained where needed to validate paid access, address refunds and disputes, prevent fraud, and meet accounting, tax, and other legal obligations. Store records are independently controlled by Apple or Google.',
  ],
  [
    'Support, corrections, and rights requests',
    'Retained to resolve and document the request, handle follow-up or disputes, and demonstrate legal compliance. Unnecessary supporting information is subject to deletion or redaction.',
  ],
  [
    'Backups and legally retained records',
    'Residual copies may remain until normal backup replacement or the end of a lawful preservation obligation. Retained information is restricted to the purpose that justifies keeping it.',
  ],
] as const;

const sections: LegalSection[] = [
  {
    id: 'about-this-policy',
    title: 'Who we are and what this covers',
    content: (
      <>
        <p>
          Prince Technologies LLC operates Predator, including our iOS and
          Android apps, predator.app, and related services that link to this
          Policy (the Services). We are the controller of personal information
          we decide to process, where applicable law uses that term.
        </p>
        <p>
          This Policy covers app users and website visitors, and separately
          addresses people shown in public registry records. Our{' '}
          <Link href="/terms">Terms of Service</Link> govern use. Privacy
          questions and requests go to{' '}
          <a href={legalEmailHref('privacy')}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect and why',
    content: (
      <>
        <p>
          Information comes from you, your device or browser, your interactions
          with the Services, app stores and service providers, and official
          public-record sources. The categories below apply according to the
          features and version you use.
        </p>
        <LegalTable
          caption="App-user and website information"
          columns={['Category', 'Information involved', 'Purpose']}
          rows={dataRows}
        />
        <p>
          We do not require a conventional name-and-email registration to start
          using the app. An anonymous account still has persistent identifiers
          and can be linked to subscription, analytics, and messaging records.
        </p>
      </>
    ),
  },
  {
    id: 'location-and-search',
    title: 'Location, searches, and device storage',
    content: (
      <>
        <p>
          Foreground location permission lets the app center the map and find
          nearby records. Your device controls precise or approximate location.
          You can deny or revoke permission and use supported manual searches.
          The app does not request continuous background-location permission.
        </p>
        <p>
          Nearby coordinates and map boundaries can reach our servers. Address
          searches and proximity coordinates can reach Mapbox, which also
          receives IP addresses and technical requests. See{' '}
          <ExternalLink href="https://www.mapbox.com/legal/privacy">
            Mapbox’s privacy information
          </ExternalLink>
          . Search and location requests may appear in operational logs.
        </p>
        <p>
          The website’s slide tool uses Google Maps geocoding for typed places
          when configured. Entering coordinates skips that lookup. The search
          area reaches our API to retrieve records. These requested lookups are
          separate from optional website measurement. See the{' '}
          <ExternalLink href="https://policies.google.com/privacy">
            Google Privacy Policy
          </ExternalLink>
          .
        </p>
        <p>
          Device storage can hold session credentials, anonymous identifiers,
          onboarding answers, location or preview state, experiment assignment,
          and notification preferences. Clearing local information or
          uninstalling does not itself erase server or provider records.
          Record-view events can be linked to an analytics identifier; viewing a
          record does not notify the person listed.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    title: 'How we use information',
    content: (
      <ul>
        <li>
          Provide maps, searches, account sessions, settings, and paid access.
        </li>
        <li>
          Validate subscriptions, restore purchases, and handle billing and
          support.
        </li>
        <li>Deliver permitted communications and administer preferences.</li>
        <li>
          Analyze usage, onboarding, experiments, purchases, and campaign
          performance.
        </li>
        <li>
          Diagnose errors, maintain security, prevent fraud, and investigate
          misuse.
        </li>
        <li>
          Handle rights requests, meet legal obligations, and enforce our Terms.
        </li>
      </ul>
    ),
  },
  {
    id: 'providers',
    title: 'How we disclose information',
    content: (
      <>
        <p>
          We disclose information to the following categories of providers and
          partners according to the features, permissions, and services used:
        </p>
        <LegalTable
          caption="Recipients and purposes"
          columns={['Recipient category', 'Information and purpose']}
          rows={recipientRows}
        />
        <p>
          Linked identifiers connect account, subscription, analytics,
          attribution, and messaging records. Campaign and conversion
          information may reach advertising and measurement partners, subject to
          platform restrictions and applicable law. We and our providers may use
          aggregated or de-identified information for analysis and service
          improvement. Pseudonymous identifiers are not automatically anonymous.
        </p>
        <p>
          We may disclose relevant information to professional advisers, to
          comply with law or valid legal process, to protect rights and safety,
          in a financing or business transfer, or with your authorization.
        </p>
        <p>
          Separately operated services have their own policies. Loading an
          externally hosted record photo or other content can disclose your IP
          address, the requested resource, and technical network information to
          that host.
        </p>
      </>
    ),
  },
  {
    id: 'tracking-and-advertising',
    title: 'Tracking and advertising measurement',
    content: (
      <>
        <p>
          Analytics and attribution tools measure feature use, purchases, and
          marketing performance. We use AppsFlyer for attribution and download
          links, which can carry campaign and referral parameters. See its{' '}
          <ExternalLink href="https://www.appsflyer.com/legal/services-privacy-policy/">
            services privacy policy
          </ExternalLink>
          . Optional website analytics, performance measurement, and download
          attribution stay off until enabled through{' '}
          <Link id="website-privacy-choices" href="/privacy/choices">
            browser settings
          </Link>
          .
        </p>
        <p>
          The iOS app requests App Tracking Transparency permission. On Android,
          advertising identifiers depend on device and platform settings.
          Denying tracking permission restricts covered tracking; it does not
          disable every operational, subscription, security, or
          product-analytics event.
        </p>
        <p>
          Applicable law may treat advertising-related disclosures as a sale,
          sharing, or targeted advertising even without payment. Email{' '}
          <a href={legalEmailHref('privacy')}>{LEGAL_CONTACT_EMAIL}</a> to
          exercise an applicable app-related opt-out. Website settings apply
          separately. Resetting identifiers or clearing storage does not delete
          information already received.
        </p>
        <p>
          Enabled measurement services may collect information over time and
          across websites or apps. We honor Global Privacy Control for this
          website. Other browser Do Not Track signals do not currently change
          our processing.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies, local storage, and similar tools',
    content: (
      <>
        <p>
          We use device storage, cookies or similar technologies, SDK
          identifiers, and logs to maintain sessions, save preferences and
          onboarding state, operate the Services, and support enabled analytics
          and attribution. Agreeing to our Terms or this Policy does not replace
          consent required for particular processing.
        </p>
        <p>
          Browser and device settings control available storage and privacy
          permissions. Blocking necessary storage may affect access and saved
          preferences.
        </p>
      </>
    ),
  },
  {
    id: 'notifications',
    title: 'Notifications and other communications',
    content: (
      <>
        <p>
          Messaging providers and device platforms use push tokens, permission
          state, app identifiers, and message interactions to deliver and manage
          communications. Turn notifications off in Predator’s Alerts or
          Settings controls or your device settings. Queued messages may still
          arrive.
        </p>
        <p>
          Promotional communications use applicable permissions and opt-out
          mechanisms. Use an email’s unsubscribe link or contact us to stop
          promotional email. Necessary security, transaction, and support
          messages are separate. Turning off messages does not cancel a
          subscription or delete historical records.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Retention and deletion limits',
    content: (
      <>
        <p>
          Retention depends on the category, the reason it was collected, the
          service relationship, provider configuration, a verified request, and
          legal obligations. We assess whether information remains necessary for
          the purposes below rather than treating every category as having the
          same lifetime.
        </p>
        <LegalTable
          caption="Retention criteria by category"
          columns={['Information', 'Retention approach']}
          rows={retentionRows}
        />
        <p>
          An approved request may require action in our own database and in
          multiple provider systems. We may retain limited information for a
          legal obligation, fraud prevention, a dispute, security, or a record
          that a rights request was handled. We will explain an applicable
          exception and restrict retained information to the justified purpose.
          Removing direct identifiers does not necessarily make all remaining
          information anonymous.
        </p>
      </>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices and email requests',
    content: (
      <>
        <h3>Access, correction, or another privacy request</h3>
        <p>
          Email <a href={legalEmailHref('privacy')}>{LEGAL_CONTACT_EMAIL}</a>{' '}
          with the subject <strong>Predator privacy request</strong>. Tell us
          what you want to access, correct, export, restrict, or object to.
          Include your country or state if relevant to your request and an app
          or purchase identifier if available. You do not have to buy a
          subscription to make a request.
        </p>
        <h3 id="account-deletion">Request account deletion</h3>
        <p>
          Email <a href={legalEmailHref('deletion')}>{LEGAL_CONTACT_EMAIL}</a>{' '}
          with the subject <strong>Predator account deletion request</strong>.
          Identify the installation or account as best you can. The app’s
          Settings screen displays a User ID for subscription support that can
          help us locate related records; if you no longer have the app or that
          ID, explain this in your message and we will discuss another
          proportionate way to locate and verify the request.
        </p>
        <p>
          These requests are reviewed by our team. We may ask you to demonstrate
          control of an account, device session, or purchase relationship before
          disclosing or deleting private information.{' '}
          <strong>
            An App User ID or other SDK identifier is a lookup aid, not
            sufficient proof of ownership.
          </strong>{' '}
          Do not send a password, complete payment-card number, or government ID
          in an initial email. We will explain any additional information needed
          and how to provide it appropriately.
        </p>
        <LegalCallout title="Deletion and cancellation are separate">
          <p>
            Deleting app-user information, uninstalling the app, and cancelling
            a store subscription are different actions. Cancel renewals through
            Apple or Google Play as explained in our{' '}
            <Link href="/terms#subscriptions">subscription instructions</Link>.
            We will explain any purchase information that must be retained and
            how deletion may affect access or restoration.
          </p>
        </LegalCallout>
        <h3>How requests are handled</h3>
        <p>
          We will review and respond within the time required by applicable law,
          give any legally required acknowledgment, and explain an allowed
          extension or refusal. Where the law provides an appeal, reply to our
          decision with <strong>Privacy appeal</strong> in the subject.
          Authorized agents may need to show authority and meet applicable
          verification requirements. We do not discriminate against you for
          exercising protected privacy rights.
        </p>
        <p>
          The suggested email subjects help route your message. We review a
          recognizable rights request even if you use a different subject or
          cannot provide an app identifier. You do not need to create an account
          or prove your identity to turn off this browser’s optional
          measurement.
        </p>
        <p>
          For an error or removal request concerning a public registry record,
          use our{' '}
          <Link href="#public-record-information">
            registry correction instructions
          </Link>
          . Deleting an app account does not delete an official registry record.
        </p>
      </>
    ),
  },
  {
    id: 'regional-rights',
    title: 'Regional privacy rights',
    content: (
      <>
        <p>
          Rights depend on the law that applies to you and to the processing,
          including statutory thresholds and exceptions.
        </p>
        <h3>United States</h3>
        <p>
          Applicable state laws may provide rights to know about processing,
          access and portability, correction, deletion, opt-out of sale or
          sharing, targeted advertising or certain profiling, limits on
          sensitive-data processing, and appeal. You can ask us to apply these
          rights by email. Precise geolocation may be sensitive personal
          information. Use{' '}
          <a href={legalEmailHref('privacy')}>{LEGAL_CONTACT_EMAIL}</a> for a
          request, including a request to limit a covered use or disclosure.
        </p>
        <p>
          For California residents, the information categories described above
          include identifiers, commercial information, internet or network
          activity, geolocation, and optional demographic or household-related
          information. Sources are you, your device, stores, providers, and
          public authorities as described in this Policy. Purposes, recipients,
          and retention criteria are set out in the corresponding sections.
          Advertising and attribution disclosures may be covered by opt-out
          rights even when no money changes hands. You can contact us to ask
          about those disclosures or exercise an applicable right.
        </p>
        <p>
          Where the CCPA applies, requests to know, correct, or delete are
          acknowledged within 10 business days and answered within 45 calendar
          days. A permitted extension of up to 45 additional days requires
          notice. Covered opt-out and sensitive-information limitation requests
          are handled as soon as feasible, within 15 business days.
        </p>
        <h3>EEA, United Kingdom, and Switzerland</h3>
        <p>
          Where the GDPR, UK GDPR, or Swiss data-protection law applies, rights
          may include access, rectification, erasure, portability, restriction,
          objection, withdrawal of consent, and a complaint to your supervisory
          authority. We rely on contractual necessity for requested service and
          purchase functions; legitimate interests where appropriate for
          security, support, and proportionate improvement; consent where
          required for permissions or tracking; and legal obligations for
          required records or responses. These bases depend on the processing
          and do not replace special requirements for sensitive or
          criminal-record information.
        </p>
        <p>
          Where the GDPR or UK GDPR applies, we respond without undue delay,
          normally within one calendar month. A permitted extension of up to two
          further months for complex or numerous requests requires notice and an
          explanation within the first month. We explain any lawful
          verification, clarification, or exception that affects a request.
        </p>
        <p>
          Where processing depends on consent, you can withdraw it without
          affecting the lawfulness of earlier processing. You can object to
          processing based on legitimate interests and to direct marketing as
          applicable. We do not offer automated eligibility decisions about
          employment, housing, credit, or insurance; such uses are prohibited by
          our Terms.
        </p>
        <h3>Other locations</h3>
        <p>
          If another jurisdiction gives you relevant privacy rights, explain
          your request and location in your email. We will assess it under the
          applicable law and explain the response, verification, or exception
          involved. You may contact a competent regulator in addition to
          contacting us.
        </p>
      </>
    ),
  },
  {
    id: 'public-record-information',
    title: 'Information about people in public records',
    content: (
      <>
        <p>
          Registry records can include a person’s name, photograph, reported
          address, date of birth or other identifying details, physical
          description, offense description, classification, and registration
          information made public by the originating authority. Not every source
          provides every field, and public availability and permitted uses vary.
        </p>
        <p>
          These records are separate from app-user information and remain
          subject to applicable legal restrictions and correction duties.
        </p>
        <p>
          If a record relates to you or is incorrectly associated with you,
          email <a href={legalEmailHref('correction')}>{LEGAL_CONTACT_EMAIL}</a>{' '}
          with the subject{' '}
          <strong>Predator registry correction or removal request</strong>.
          Include a Predator record link or identifier if available, or enough
          public details to locate it, the jurisdiction, what is wrong, a
          contact email, and whether you are the person concerned or an
          authorized representative. Relevant public documentation can help but
          is not required to report a possible error.
        </p>
        <p>
          We review the Predator record, available source information, and any
          applicable correction, removal, or privacy duty, including errors in
          how we display or match information. We may request proportionate
          clarification or verification and will respond within applicable legal
          deadlines. Do not send unnecessary sensitive documents in an initial
          message; we will explain any further information needed and how to
          provide it appropriately.
        </p>
        <p>
          Correction, suppression, or removal depends on the facts, applicable
          source restrictions, and law. A request does not automatically remove
          lawfully displayed information, change an originating authority’s
          records or registration requirements, delete an app account, or cancel
          a subscription. See our{' '}
          <Link href="/terms#requests">request-handling terms</Link> and{' '}
          <a href="#account-deletion">account-deletion instructions</a>.
        </p>
      </>
    ),
  },
  {
    id: 'children-and-teens',
    title: 'Children and teens',
    content: (
      <>
        <p>
          Predator is not directed to children under 13. Our Terms require users
          to be at least 13, or older where local law requires, with appropriate
          parental or guardian permission below legal adulthood. We do not
          knowingly collect app-user information from children under 13. If you
          believe a child has provided information contrary to these
          requirements, contact us so that we can investigate and take
          appropriate deletion or other protective action.
        </p>
        <p>
          Applicable protections for teens, parental rights, and consent
          requirements for advertising or sensitive-data processing continue to
          apply. General agreement to the Terms does not replace them.
        </p>
      </>
    ),
  },
  {
    id: 'security-and-transfers',
    title: 'Security and international processing',
    content: (
      <>
        <p>
          We use technical and organizational safeguards, including encrypted
          service communications, secure credential storage, and access
          controls. No service can guarantee absolute security. Contact us if
          you suspect a security issue; avoid sending unnecessary sensitive
          information.
        </p>
        <p>
          We, our providers, and authorized personnel may process information in
          the United States and other countries, whose laws may differ from
          yours. Transfers requiring legal safeguards must use an applicable
          mechanism, such as approved contractual protections or an adequacy
          arrangement. Contact us for information about applicable safeguards,
          subject to lawful confidentiality limits.
        </p>
      </>
    ),
  },
  {
    id: 'changes-and-contact',
    title: 'Changes and contact',
    content: (
      <>
        <p>
          We may update this Policy as the Services and information practices
          change. The published date identifies the applicable version. We will
          give notice of material changes and obtain any additional consent
          required by law before the relevant new processing. Continued use does
          not replace legally required consent.
        </p>
        <p>
          Privacy questions, requests, and complaints go to{' '}
          <strong>Prince Technologies LLC</strong> at{' '}
          <a href={legalEmailHref('privacy')}>{LEGAL_CONTACT_EMAIL}</a>. Ask for
          an accessible alternative format if needed. You may also consult our{' '}
          <Link href="/terms">Terms</Link> and{' '}
          <Link href="/copyright">Copyright Policy</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" sections={sections} />;
}
