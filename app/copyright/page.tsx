import Link from 'next/link';
import {
  ExternalLink,
  LegalPage,
  type LegalSection,
} from '@/components/legal/legal-page';
import {
  LEGAL_CONTACT_EMAIL,
  legalEmailHref,
  legalMetadata,
} from '@/lib/legal';

export const metadata = legalMetadata(
  '/copyright',
  'Copyright Policy',
  'Predator content rights, permitted use, copyright inquiries, and map attribution.'
);

const sections: LegalSection[] = [
  {
    id: 'ownership',
    title: 'Content ownership',
    content: (
      <>
        <p>
          Prince Technologies LLC or its licensors own Predator’s original
          software, designs, content, and branding. Third-party materials remain
          subject to their owners’ rights.
        </p>
        <p>
          Availability through Predator does not transfer ownership or grant a
          right to reproduce, redistribute, sell, or otherwise exploit material
          beyond the permission provided by the rights holder, our Terms, or
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'permitted-use',
    title: 'Using Predator content',
    content: (
      <>
        <p>
          Use and sharing are subject to our{' '}
          <Link href="/terms#content">Terms of Service</Link>. Preserve required
          notices and attribution. Do not imply endorsement or present material
          misleadingly.
        </p>
        <p>
          For permission beyond what is already allowed, email{' '}
          <a href={legalEmailHref('copyright')}>{LEGAL_CONTACT_EMAIL}</a> with
          the material and proposed use. Silence or attribution alone does not
          grant permission. Applicable legal rights and exceptions remain in
          place, and Predator reserves its rights and defenses.
        </p>
      </>
    ),
  },
  {
    id: 'copyright-requests',
    title: 'Copyright inquiries',
    content: (
      <>
        <p>
          If you believe material made available by Predator infringes a
          copyright you own or are authorized to enforce, email{' '}
          <a href={legalEmailHref('copyright')}>{LEGAL_CONTACT_EMAIL}</a> with
          the subject <strong>Predator copyright inquiry</strong>. Include:
        </p>
        <ul>
          <li>
            Your name, contact information, and the basis of your ownership or
            authority to act for the rights holder.
          </li>
          <li>
            Identification of the copyrighted work, with an original link or
            other information sufficient to identify it.
          </li>
          <li>
            The specific Predator page, record, post, or other material at
            issue, with its URL or enough detail to locate it. Include relevant
            timestamps for audiovisual material.
          </li>
          <li>
            An explanation of the rights involved and why you believe the use is
            unauthorized.
          </li>
        </ul>
        <p>
          Provide accurate information and submit only claims you are authorized
          to make. We may ask for a signature, evidence of authority, or
          statements required by applicable law when relevant to your notice.
        </p>
      </>
    ),
  },
  {
    id: 'review',
    title: 'How we review concerns',
    content: (
      <>
        <p>
          We review sufficiently detailed concerns under applicable law and may
          request clarification. We may remove, restrict, correct, or retain
          material as appropriate. A request does not establish infringement or
          guarantee removal; applicable legal obligations control our response.
        </p>
        <p>
          Review or removal is not an admission of liability or a waiver of
          rights. Other platforms control their own reporting and dispute
          processes; we cannot promise their outcome.
        </p>
      </>
    ),
  },
  {
    id: 'other-requests',
    title: 'Other requests',
    content: (
      <p>
        Copyright inquiries are separate from{' '}
        <Link href="/terms#requests">registry correction or removal</Link> and{' '}
        <Link href="/privacy#account-deletion">app-account deletion</Link>.
        Appearing in a record or image does not by itself establish ownership of
        its copyright. For personal information, follow our{' '}
        <Link href="/privacy#your-choices">privacy request instructions</Link>.
      </p>
    ),
  },
  {
    id: 'maps-and-attribution',
    title: 'Maps and attribution',
    content: (
      <>
        <p>
          Mapbox and OpenStreetMap map data is separate from registry
          information and does not verify or endorse a Predator record.
          Applicable credits include:
        </p>
        <ul>
          <li>
            <ExternalLink href="https://www.mapbox.com/about/maps/">
              © Mapbox
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.openstreetmap.org/copyright">
              © OpenStreetMap contributors
            </ExternalLink>
          </li>
        </ul>
        <p>
          Preserve required map credits in permitted screenshots. This page does
          not replace attribution required on a map or output.
        </p>
        <p>
          Google Maps geocoding results in the website’s slide tool are subject
          to the{' '}
          <ExternalLink href="https://maps.google.com/help/terms_maps/">
            Google Maps additional terms
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://policies.google.com/privacy">
            Google Privacy Policy
          </ExternalLink>
          . Preserve applicable Google Maps credit.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact and updates',
    content: (
      <>
        <p>
          Copyright questions and permission inquiries go to{' '}
          <strong>Prince Technologies LLC</strong> at{' '}
          <a href={legalEmailHref('copyright')}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
        <p>
          We may update this Policy as the Services or applicable requirements
          change. The published effective date identifies the applicable
          version. Our <Link href="/terms">Terms</Link> and{' '}
          <Link href="/privacy">Privacy Policy</Link> continue to apply.
        </p>
      </>
    ),
  },
];

export default function CopyrightPage() {
  return <LegalPage title="Copyright Policy" sections={sections} />;
}
