import Link from 'next/link';
import {
  ExternalLink,
  LegalCallout,
  LegalPage,
  type LegalSection,
} from '@/components/legal/legal-page';
import {
  LEGAL_CONTACT_EMAIL,
  legalEmailHref,
  legalMetadata,
} from '@/lib/legal';

export const metadata = legalMetadata(
  '/terms',
  'Terms of Service',
  'Understand Predator subscriptions, public registry information, acceptable use, safety limitations, and your rights.'
);

const sections: LegalSection[] = [
  {
    id: 'agreement',
    title: 'Our agreement with you',
    content: (
      <>
        <p>
          These Terms of Service are an agreement between you and Prince
          Technologies LLC, the operator of Predator (Predator, we, us, or our).
          They govern use of Predator’s iOS and Android services, predator.app,
          and related services that link to these Terms (the Services). The app
          software license is addressed in{' '}
          <a href="#platform-terms">Section 17</a>. Our{' '}
          <Link href="/privacy">Privacy Policy</Link> explains information
          practices, and our <Link href="/copyright">Copyright Policy</Link>{' '}
          addresses content rights and copyright concerns.
        </p>
        <p>
          When effective, these Terms apply to your use or acceptance to the
          extent permitted by law. If you do not agree, stop using the Services.
          Arbitration requires the separate adult acceptance described in{' '}
          <a href="#disputes">Section 16</a>. These Terms do not replace any
          separate consent required by law.
        </p>
        <LegalCallout title="Important notices">
          <p>
            Predator is an information service. It does not guarantee safety,
            monitor your personal safety, or dispatch assistance. Public records
            can be inaccurate or outdated. Misusing them can harm people and
            violate the law.
          </p>
          <p>
            <a href="#disputes">Section 16</a> contains a conditional individual
            arbitration agreement and class-action waiver, with exceptions and a
            30-day opt-out. <a href="#liability">Section 14</a> describes
            limitations on liability. Mandatory consumer rights continue to
            apply.
          </p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: 'Eligibility and minors',
    content: (
      <>
        <p>
          You must be at least 13 and meet any higher age required by law or
          applicable store rules. The Services are not directed to children
          under 13. Store ratings and parental controls may further restrict
          access.
        </p>
        <p>
          If you are below legal adulthood, a parent or legal guardian must
          permit your use, review these Terms with you, and agree where
          required. Parents and guardians are responsible for supervision to the
          extent required by law.
        </p>
        <p>
          You must be legally permitted to use the Services and able to enter
          this agreement, personally or through a parent or guardian where
          permitted. You may not use the Services in violation of applicable
          law, sanctions, or an enforceable restriction on your use. If you act
          for an organization, you represent that you can bind it; the
          personal-use and screening restrictions below still apply.
        </p>
      </>
    ),
  },
  {
    id: 'service',
    title: 'What Predator provides',
    content: (
      <>
        <p>
          Predator helps you find publicly available sex offender registry
          information through maps, location and name searches, record details,
          and related features. Availability varies by device, app version,
          location, source coverage, and subscription. The features included in
          a purchase are described in the app and at checkout. A subscription
          pays for those features, not a government fee.
        </p>
        <p>
          Predator is independently operated. We are not a government agency,
          law-enforcement agency, or emergency service. A registry link, agency
          name, or source reference does not imply affiliation, approval, or
          endorsement.
        </p>
      </>
    ),
  },
  {
    id: 'public-records',
    title: 'Public records and accuracy',
    content: (
      <>
        <p>
          Records originate with state, territorial, tribal, and other registry
          authorities. Their rules, published fields, schedules, availability,
          and coverage vary, which can affect Predator’s results.
        </p>
        <ul>
          <li>
            Information can be incomplete, duplicated, misspelled, outdated,
            incorrectly matched, or incorrectly located. A person may appear in
            more than one jurisdiction.
          </li>
          <li>
            A registered address is a reported address, not a statement that
            someone is currently there. Source or geocoded coordinates can be
            approximate, including a street, block, city, or ZIP-code area.
            Overlapping pins and rounded distances can affect the display.
          </li>
          <li>
            A name, photograph, address, or description resembling someone does
            not establish their identity or the identity of a property’s current
            occupants. Do not treat a resemblance or map position as proof that
            someone is associated with a record.
          </li>
          <li>
            Registry status is not a complete criminal history or a prediction
            of future conduct. Offense descriptions and risk classifications may
            have jurisdiction-specific meanings.
          </li>
          <li>
            No search results does not establish that an area is safe, that
            every relevant record was searched, or that a person has no criminal
            history.
          </li>
        </ul>
        <p>
          We do not guarantee complete coverage, live updates, a fixed refresh
          interval, or independently verified accuracy. Changes can be delayed,
          and a Predator timestamp need not reflect an authority’s verification
          date. Do not rely on the Services as the sole basis for a
          consequential decision. Report suspected errors through our{' '}
          <a href="#requests">correction process</a>.
        </p>
      </>
    ),
  },
  {
    id: 'permitted-use',
    title: 'Personal awareness and prohibited screening',
    content: (
      <>
        <p>
          The Services are intended for lawful, personal safety awareness. They
          are not offered as a background-screening or consumer-reporting
          service.
        </p>
        <p>
          <strong>
            You must not use Predator or its information, in whole or in part,
            to determine eligibility for employment, housing or tenancy, credit,
            insurance, education, or another benefit, transaction, or
            opportunity governed by the Fair Credit Reporting Act or similar
            laws.
          </strong>{' '}
          Do not use the Services to make unlawful discriminatory decisions.
        </p>
        <p>
          Public access does not mean unrestricted use. Comply with the
          originating jurisdiction’s restrictions, including any limits on
          redistribution, commercial use, solicitation, and discrimination.
          These Terms do not override those restrictions.
        </p>
      </>
    ),
  },
  {
    id: 'safety',
    title: 'Safety, emergencies, and notifications',
    content: (
      <>
        <LegalCallout title="In an emergency, call 911 or your local emergency number">
          <p>
            Predator does not contact emergency services for you, dispatch
            assistance, or watch over you. Do not rely on it as your only source
            of safety information.
          </p>
        </LegalCallout>
        <p>
          Do not approach, follow, confront, threaten, target, or interfere with
          a person or property because of a record shown in Predator. You are
          responsible for your conduct and decisions; the Services do not
          authorize investigation or enforcement.
        </p>
        <p>
          Where alerts are available, delivery depends on the underlying data,
          your settings and permissions, device compatibility, platform
          restrictions, and network conditions. Alerts may be delayed,
          incomplete, inaccurate, or not delivered. Enabling notifications does
          not create continuous personal monitoring or guarantee that a move,
          registry change, or danger will be detected. Promotional, account, and
          product messages should not be treated as verified registry-change
          alerts.
        </p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: 'Accounts, devices, and permissions',
    content: (
      <>
        <p>
          The app can create an account without conventional sign-up. Account,
          device, usage, and purchase information may still be linked as
          explained in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          Protect your device and any credentials or purchase account you use.
          Do not sell, share, or transfer access in violation of these Terms or
          store rules. Tell us about suspected unauthorized use. An app
          identifier helps us locate records but is not, by itself, proof of
          ownership or authority to access an account.
        </p>
        <p>
          You are responsible for compatible hardware, supported software,
          connectivity, and carrier charges. You control location, tracking, and
          notification permissions through your device. Some features need a
          permission to perform their requested function; changing permissions
          does not change an existing subscription.
        </p>
      </>
    ),
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions, trials, and billing',
    content: (
      <>
        <p>
          Paid features may be offered through auto-renewing subscriptions. The
          purchase screen identifies the product, price, period, included
          features, and any trial or introductory terms. Prices and offers may
          vary by platform, region, and eligibility.
        </p>
        <p>
          Apple or Google processes in-app payments under its billing terms. We
          do not receive your complete payment-card number from store purchases.
        </p>
        <h3>Automatic renewal and offers</h3>
        <p>
          A subscription renews automatically unless cancelled according to the
          applicable store’s requirements. A trial or discounted period, if
          offered, converts to the price and period disclosed at purchase unless
          cancelled in time. Check your purchase confirmation for the exact
          terms. For Apple subscriptions, cancel at least 24 hours before the
          current period or trial ends to avoid renewal.
        </p>
        <h3>Managing and cancelling</h3>
        <ul>
          <li>
            <strong>Apple:</strong> open device Settings, tap your name, then
            Subscriptions, and select Predator. See{' '}
            <ExternalLink href="https://support.apple.com/118428">
              Apple’s cancellation instructions
            </ExternalLink>
            .
          </li>
          <li>
            <strong>Google Play:</strong> select your profile, then Payments
            &amp; subscriptions, then Subscriptions, and select Predator. See{' '}
            <ExternalLink href="https://support.google.com/googleplay/answer/7018481">
              Google’s cancellation instructions
            </ExternalLink>
            .
          </li>
        </ul>
        <p>
          Cancellation normally stops renewal while access continues for the
          paid period, subject to store rules.{' '}
          <strong>
            Uninstalling Predator, disabling notifications, or requesting data
            deletion does not cancel a subscription.
          </strong>{' '}
          Manage each purchase account or subscription separately.
        </p>
        <h3>Refunds, restoration, and price changes</h3>
        <p>
          Refund eligibility follows applicable law and store policies. Request
          Apple refunds through{' '}
          <ExternalLink href="https://reportaproblem.apple.com/">
            Report a Problem
          </ExternalLink>
          . For Google Play, use{' '}
          <ExternalLink href="https://support.google.com/googleplay/answer/2479637">
            Google’s refund process
          </ExternalLink>{' '}
          or contact us for assistance. These Terms preserve any refund or
          remedy you are legally entitled to receive.
        </p>
        <p>
          If paid access is missing, use purchase restoration with the store
          account that made the purchase. Restoration depends on a valid
          purchase and the applicable store and subscription systems. Price
          changes follow store notice and consent rules and applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: (
      <>
        <p>You must not use the Services, or assist others, to:</p>
        <ul>
          <li>
            Harass, stalk, intimidate, dox, threaten, discriminate against,
            incite violence against, or commit a crime against anyone, including
            their family, neighbors, or property.
          </li>
          <li>
            Publish or distribute records to shame, falsely identify, expose, or
            target a person, or conduct vigilante activity.
          </li>
          <li>
            Make a prohibited screening decision, solicit people unlawfully, or
            violate source conditions.
          </li>
          <li>
            Scrape, bulk download, harvest, resell, sublicense, or build a
            competing database from the Services without our written permission
            and any required source permission.
          </li>
          <li>
            Bypass a paywall, access control, or security protection; use stolen
            credentials; interfere with the Services; or introduce malicious
            code.
          </li>
          <li>
            Reverse engineer or extract source code except where a restriction
            is prohibited by law.
          </li>
          <li>
            Submit false or abusive reports, impersonate someone, infringe
            rights, or use our branding in a misleading way.
          </li>
        </ul>
        <p>
          We may investigate misuse, restrict access, preserve relevant
          evidence, and respond to valid legal requests, consistent with the
          Privacy Policy and law. Registry misuse can result in civil or
          criminal penalties independently of any action we take.
        </p>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Content, sharing, and third parties',
    content: (
      <>
        <p>
          Subject to these Terms and any applicable app license, you may access
          the Services for their intended personal use. No other rights are
          granted, and use remains subject to applicable store rules.
        </p>
        <p>
          Our software, original design, branding, and original materials belong
          to Prince Technologies LLC or its licensors. Underlying records,
          photographs, maps, and third-party material remain subject to their
          respective rights and conditions.
        </p>
        <p>
          If you share a permitted link, screenshot, or output, you remain
          responsible for its context and use. Sharing does not remove the
          accuracy cautions, screening restrictions, source conditions, or
          prohibitions on targeting people. Do not imply that a resemblance
          establishes identity or that Predator or a government agency endorses
          your statement.
        </p>
        <p>
          Third-party websites, map services, stores, and platforms have their
          own terms. We do not control their content or availability. Relevant
          Mapbox and OpenStreetMap credits appear in our{' '}
          <Link href="/copyright#maps-and-attribution">
            map attribution information
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'requests',
    title: 'Corrections, requests, and feedback',
    content: (
      <>
        <p>
          Email registry correction or removal requests to{' '}
          <a href={legalEmailHref('correction')}>{LEGAL_CONTACT_EMAIL}</a>. Use
          the subject{' '}
          <strong>Predator registry correction or removal request</strong>.
        </p>
        <ul>
          <li>
            Include a Predator record link or identifier if available.
            Otherwise, provide enough public record details to locate the issue,
            such as the listed name and jurisdiction.
          </li>
          <li>
            Explain what is inaccurate, outdated, duplicated, incorrectly
            located, or associated with the wrong person, and identify the
            affected fields.
          </li>
          <li>
            Provide relevant public documentation if available, a contact email,
            and whether you are the person concerned or an authorized
            representative.
          </li>
        </ul>
        <p>
          You can report a possible error without supporting evidence. Do not
          include a password, Social Security number, full payment-card number,
          or unnecessary government ID in your initial message. If additional
          evidence or proportionate verification is needed, we will explain what
          is relevant and how to provide it appropriately.
        </p>
        <p>
          We review the Predator record, available source information, and
          applicable law to determine whether correction, suppression, removal,
          or another action is appropriate or required. We may ask for
          clarification and will respond within any applicable legal deadline. A
          request does not guarantee removal of lawfully displayed information.
          Our review includes display and matching errors and any applicable
          correction or removal duty. Our response concerns Predator; it does
          not change an authority’s records or a person’s registration
          obligations.
        </p>
        <p>
          For requests about your own app-user information, follow the{' '}
          <Link href="/privacy#your-choices">Privacy Policy instructions</Link>.
          We may need proportionate verification before disclosure or action. A
          request does not automatically remove an official record or cancel a
          subscription.
        </p>
        <p>
          You retain rights in support materials and permit us to process them
          to handle requests and meet legal obligations. We may use product
          suggestions without compensation; this does not authorize publication
          of private correspondence or supporting documents.
        </p>
        <p>
          For copyright concerns, follow our{' '}
          <Link href="/copyright#copyright-requests">
            copyright inquiry instructions
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'communications',
    title: 'Communications and service changes',
    content: (
      <>
        <p>
          We may send operational messages about security, purchases, support,
          and material service or policy changes. Promotional messages use the
          consent and opt-out mechanisms required by law. Change push
          preferences in the app or device settings. See our{' '}
          <Link href="/privacy#notifications">Privacy Policy</Link>.
        </p>
        <p>
          We may maintain, update, change, or discontinue features. A change
          materially affecting an ongoing paid service is subject to any notice,
          cancellation, refund, or other remedy required by store rules or law.
          We do not promise indefinite availability of every feature, source, or
          supported device.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    content: (
      <>
        <p>
          To the maximum extent permitted by law, the Services and content are
          provided <strong>as is and as available</strong>, without express,
          implied, or statutory warranties, including merchantability, fitness
          for a particular purpose, title, or non-infringement.
        </p>
        <p>
          We do not warrant that records, geocoding, searches, subscriptions, or
          notifications will be accurate, complete, current, uninterrupted,
          secure against every threat, or error-free. We do not warrant that
          Predator will identify every registered person, predict conduct,
          prevent harm, or establish that anyone or any place is safe or
          dangerous.
        </p>
        <p>
          These disclaimers do not exclude warranties, guarantees, or remedies
          that cannot lawfully be excluded. Mandatory consumer rights remain
          available.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Limitations of liability',
    content: (
      <>
        <p>
          To the maximum extent permitted by law, Prince Technologies LLC and
          its officers, employees, agents, and licensors will not be liable for
          indirect, incidental, special, consequential, exemplary, or punitive
          damages, or loss of profits, revenue, goodwill, use, or data, arising
          from or relating to the Services or these Terms, even if advised of
          those possibilities.
        </p>
        <p>
          Subject to the exceptions below, our total aggregate liability for
          related claims will not exceed{' '}
          <strong>
            the greater of US $100 or the amount you paid for Predator in the 12
            months immediately before the event giving rise to the claim
          </strong>
          .
        </p>
        <p>
          Nothing excludes or limits liability for fraud, willful misconduct,
          gross negligence, death or personal injury where exclusion is
          prohibited, or any liability or consumer remedy that cannot legally be
          excluded or limited. An otherwise impermissible limitation applies
          only to the extent permitted by law.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Responsibility and ending access',
    content: (
      <>
        <p>
          If you are an adult, and to the extent permitted by law, you agree to
          indemnify Prince Technologies LLC and its officers, employees, and
          agents against third-party claims and reasonable costs arising from
          your unlawful misuse of registry information, infringement of rights,
          or material breach of these Terms. This does not cover our own
          unlawful conduct or liability that cannot legally be shifted to you.
          We will give reasonable notice of a claim and an opportunity to
          participate in its defense.
        </p>
        <p>
          You may stop using Predator and request data deletion at any time.
          Separately cancel store subscriptions if you want renewal to stop.
        </p>
        <p>
          We may suspend or terminate access for misuse, a material breach,
          legal or security risk, or discontinuation. We will give notice and an
          opportunity to resolve an issue where reasonable and legally required;
          urgent protective action may occur without notice. Applicable refund
          and consumer rights remain in place.
        </p>
        <p>
          Provisions that by their nature should survive continue to apply,
          including use restrictions, intellectual property, accrued payment
          obligations, disclaimers, liability limits, disputes, and general
          provisions. Retained information remains subject to the Privacy
          Policy.
        </p>
      </>
    ),
  },
  {
    id: 'disputes',
    title: 'Governing law and dispute resolution',
    content: (
      <>
        <p>
          North Carolina law governs these Terms, excluding conflict-of-law
          rules. The Federal Arbitration Act governs arbitration to the extent
          applicable. This choice does not take away mandatory consumer
          protections where you live.
        </p>
        <h3>When arbitration applies</h3>
        <p>
          The arbitration agreement and associated class-action waiver apply
          only if you are an adult and affirmatively accept them through a
          separate acceptance presented by Predator. They do not apply to a
          minor or arise merely from visiting the website, using the app, or
          viewing these Terms. Without that separate acceptance, the court
          provisions below apply, subject to mandatory law.
        </p>
        <h3>Informal resolution first</h3>
        <p>
          Before arbitration, either party must send written notice describing
          the dispute, contact details, and requested resolution. Send yours to{' '}
          <a href={legalEmailHref('dispute')}>{LEGAL_CONTACT_EMAIL}</a>. We will
          use an address you provided or an available account communication
          channel. Both sides will try in good faith to resolve the dispute for
          60 days after receipt. This process does not prevent a small-claims
          filing, urgent provisional relief, a regulator complaint, or action
          needed to preserve a legal deadline.
        </p>
        <p>
          To the extent permitted by law, any applicable limitation period for
          the notified claim is suspended during this 60-day process. Neither
          party may use informal resolution to prevent a timely claim.
        </p>
        <h3>Individual arbitration and exceptions</h3>
        <p>
          If you have accepted the arbitration agreement as described above, and
          except as stated here, you and we agree to binding, individual
          arbitration administered by the American Arbitration Association under
          its{' '}
          <ExternalLink href="https://www.adr.org/rules-forms-and-fees/consumer/">
            Consumer Arbitration Rules and applicable consumer fee schedule
          </ExternalLink>
          . A neutral arbitrator may award individual relief available under
          law. An award may be entered in a court with jurisdiction.
        </p>
        <p>
          Either party may bring an eligible individual claim in small-claims
          court, or seek temporary or emergency court relief to protect rights
          while a dispute is resolved. Claims, remedies, or public injunctive
          relief that cannot lawfully be arbitrated remain available in the
          appropriate court.
        </p>
        <p>
          Fees and hearing arrangements follow AAA consumer rules and mandatory
          law. You may request a permitted remote, documents-only, or reasonably
          convenient hearing. This agreement does not require travel to North
          Carolina contrary to those rules. We will pay fees allocated to a
          business and any additional fees required by law, including fees
          necessary to avoid making a consumer’s access to arbitration
          prohibitively expensive. If AAA will not administer a dispute because
          we failed to meet its consumer requirements, you may bring it in a
          court with jurisdiction.
        </p>
        <h3>Jury trial and class-action waiver</h3>
        <p>
          For arbitrated disputes, both parties waive a court trial before a
          judge or jury. To the extent permitted by law, claims must be brought
          individually, rather than as a plaintiff or class member in a class,
          consolidated, or representative proceeding. An arbitrator cannot
          consolidate different people’s claims without agreement. Legally
          protected public remedies and complaints to government agencies remain
          available. If the class or representative waiver is unenforceable for
          a particular claim or remedy, that part proceeds in court rather than
          class arbitration.
        </p>
        <h3>Your 30-day opt-out</h3>
        <p>
          Opt out of arbitration and the associated class-action waiver by
          emailing{' '}
          <a href={legalEmailHref('arbitration')}>{LEGAL_CONTACT_EMAIL}</a>{' '}
          within 30 days after first accepting this arbitration provision.
          Include your name, a contact email, an app or purchase identifier if
          available, and a clear opt-out statement. No fee or identity document
          is required. Opting out does not affect other Terms or access.
        </p>
        <h3>Changes and courts</h3>
        <p>
          A later arbitration change will not apply to an already-notified
          dispute. We will honor any new acceptance or opt-out right required by
          law. Formation of an arbitration agreement and enforceability of the
          class waiver are questions for a court; other matters follow AAA rules
          and applicable law.
        </p>
        <p>
          For disputes properly heard in court, both parties consent to state or
          federal courts in North Carolina, subject to small-claims rules and
          mandatory local consumer venue rights.
        </p>
      </>
    ),
  },
  {
    id: 'platform-terms',
    title: 'Apple and Google platform terms',
    content: (
      <>
        <p>
          These Terms govern the Predator Services and do not replace the
          software license supplied with an app through its store. That license
          controls the app software if these Terms conflict with it. For an app
          acquired through Apple, Apple’s{' '}
          <ExternalLink href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">
            Standard End User License Agreement
          </ExternalLink>{' '}
          applies where no custom license agreement has been supplied. These
          Terms are not a custom Apple app license.
        </p>
        <p>
          This service agreement is with Prince Technologies LLC, not Apple or
          Google. Contact us for Predator support. Store usage rules, purchase
          terms, and mandatory consumer rights continue to apply, and you must
          comply with applicable third-party agreements.
        </p>
        <p>
          Google Maps location lookup in the website’s slide tool is also
          subject to the{' '}
          <ExternalLink href="https://policies.google.com/terms">
            Google Terms of Service
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://maps.google.com/help/terms_maps/">
            Google Maps additional terms
          </ExternalLink>
          , and{' '}
          <ExternalLink href="https://policies.google.com/privacy">
            Google Privacy Policy
          </ExternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'changes-and-contact',
    title: 'Changes, general provisions, and contact',
    content: (
      <>
        <p>
          We may revise these Terms. The published effective date identifies the
          applicable version. We will give notice of material changes and obtain
          additional acceptance where legally required. Changes do not
          retroactively take away accrued rights or affect an already-notified
          dispute as described above. Posting a page alone does not replace an
          acceptance mechanism where one is required.
        </p>
        <p>
          These Terms, applicable purchase disclosures, and expressly
          incorporated service terms form our agreement about the Services. If a
          provision is unenforceable, the remainder continues, subject to the
          class-arbitration rule above. Failure to enforce a term is not a
          waiver. You may not assign this agreement without permission except
          where law permits. We may transfer it in a lawful reorganization or
          business transfer, subject to mandatory rights.
        </p>
        <p>
          Send questions, legal notices, complaints, and requests for an
          accessible alternative format to{' '}
          <strong>Prince Technologies LLC</strong> at{' '}
          <a href={legalEmailHref()}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" sections={sections} />;
}
