'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import type { OffenderSlideOffender } from '../actions';

const APP_ICON_URL =
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/50/4d/4f/504d4fe9-322c-5ae8-bebe-12404d237ccd/Placeholder.mill/400x400bb-75.webp';

interface OffenderSlideFrameProps {
  offender: OffenderSlideOffender;
}

function getPhotoSrc(imageUrl: string | null) {
  if (!imageUrl) return null;
  return `/tools/offender-slides/image?url=${encodeURIComponent(imageUrl)}`;
}

function getProxiedImageSrc(imageUrl: string) {
  return `/tools/offender-slides/image?url=${encodeURIComponent(imageUrl)}`;
}

function initials(name: string) {
  const parts = name
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function computeAge(birthDate: string | null) {
  if (!birthDate) return null;
  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  const beforeBirthday =
    now.getMonth() < date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());

  if (beforeBirthday) age -= 1;
  return age >= 0 && age <= 130 ? String(age) : null;
}

function toFeetInches(height: number | null) {
  if (height === null) return null;

  let inches = height;
  if (height >= 100 && height <= 250) {
    inches = Math.round(height / 2.54);
  }

  if (inches < 40 || inches > 96) return null;

  const feet = Math.floor(inches / 12);
  const rest = Math.round(inches % 12);
  return `${feet}' ${rest}"`;
}

function formatWeight(weight: number | null) {
  if (weight === null) return null;

  const pounds =
    weight < 140 ? Math.round(weight * 2.20462) : Math.round(weight);
  if (pounds < 60 || pounds > 500) return null;

  return `${pounds} lbs`;
}

function cleanValue(value: string | number | null | undefined) {
  if (value === null || value === undefined) return null;
  const label = String(value).trim();
  return label.length > 0 ? label : null;
}

const STATE_ABBREVIATIONS: Record<string, string> = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

function formatCityState(city: string | null, state: string | null) {
  const cityLabel = cleanValue(city);
  const stateLabel = cleanValue(state);
  const abbreviatedState = stateLabel
    ? (STATE_ABBREVIATIONS[stateLabel] ?? stateLabel)
    : null;

  return [cityLabel, abbreviatedState].filter(Boolean).join(', ');
}

function DetailPill({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;

  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.06] px-7 py-5">
      <div className="text-[24px] font-medium uppercase tracking-[0.18em] text-white/45">
        {label}
      </div>
      <div className="mt-2 break-words text-[39px] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
        {value}
      </div>
    </div>
  );
}

const OffenderSlideFrame = forwardRef<HTMLDivElement, OffenderSlideFrameProps>(
  ({ offender }, ref) => {
    const name = offender.fullName?.trim() || 'Unknown';
    const cityState = formatCityState(offender.city, offender.state);
    const photoSrc = getPhotoSrc(offender.imageUrl);
    const age = computeAge(offender.birthDate);
    const height = toFeetInches(offender.height);
    const weight = formatWeight(offender.weight);
    const ethnicity =
      cleanValue(offender.ethnicity) ?? cleanValue(offender.race) ?? null;

    return (
      <div
        ref={ref}
        className="relative h-[1920px] w-[1080px] overflow-hidden bg-black text-white"
      >
        <div className="relative flex h-full flex-col px-[132px] pb-[300px] pt-[230px]">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-[390px] w-[390px] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] shadow-[0_40px_130px_rgba(0,0,0,0.65)]">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={name}
                  width={390}
                  height={390}
                  unoptimized
                  className="h-full w-full object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/[0.08] text-[120px] font-semibold tracking-[-0.08em] text-white/50">
                  {initials(name) || '?'}
                </div>
              )}
            </div>

            <div className="mt-[40px] max-w-[760px]">
              <div className="text-[30px] font-semibold uppercase tracking-[0.18em] text-red-500">
                Registered Sex Offender
              </div>
              <h1 className="mt-[12px] text-[64px] font-semibold leading-[0.98] tracking-[-0.07em] text-white">
                {name}
              </h1>
              <div className="mt-[32px] text-[36px] font-semibold leading-[1.14] tracking-[-0.04em] text-white/82">
                {offender.crime}
              </div>
              <div className="mt-[14px] text-[30px] font-medium tracking-[-0.03em] text-white/52">
                {cityState || 'Location available in app'}
              </div>
            </div>
          </div>

          <div className="mt-[40px] grid grid-cols-2 gap-[14px]">
            <DetailPill label="Age" value={age} />
            <DetailPill label="Gender" value={cleanValue(offender.gender)} />
            <DetailPill label="Height" value={height} />
            <DetailPill label="Weight" value={weight} />
            <DetailPill label="Ethnicity" value={ethnicity} />
            <DetailPill label="Hair" value={cleanValue(offender.hairColor)} />
          </div>
        </div>

        <div className="absolute inset-x-[132px] bottom-[240px] border-t border-white/10 bg-black pt-[16px]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-[30px] border border-white/20 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
              <Image
                src={getProxiedImageSrc(APP_ICON_URL)}
                alt="Predator"
                width={140}
                height={140}
                unoptimized
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="mt-[16px] flex items-center justify-center gap-[12px]">
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={177}
                height={58}
                className="h-[58px] w-auto"
                priority
              />
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={174}
                height={52}
                className="h-[88px] w-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

OffenderSlideFrame.displayName = 'OffenderSlideFrame';

export default OffenderSlideFrame;
