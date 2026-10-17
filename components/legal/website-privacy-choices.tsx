'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useWebsitePrivacy } from '@/hooks/use-website-privacy';
import {
  saveWebsitePrivacy,
  type WebsitePrivacyChoice,
} from '@/lib/website-privacy';

export function WebsitePrivacyChoices() {
  const privacy = useWebsitePrivacy();
  const [notice, setNotice] = useState('');

  function update(choice: WebsitePrivacyChoice) {
    const { persisted } = saveWebsitePrivacy(choice);
    setNotice(
      persisted
        ? 'Saved.'
        : 'Applies to this tab. Your browser blocked saving this choice.'
    );
  }

  return (
    <div className="legal-privacy-choices" aria-label="Website privacy choices">
      <p>Optional measurement is off by default.</p>
      {privacy.signal ? (
        <p role="status">
          Global Privacy Control is on. Optional measurement is off.
        </p>
      ) : null}
      <fieldset disabled={!privacy.ready || privacy.signal}>
        <legend className="sr-only">Optional website measurement</legend>
        <Label htmlFor="website-analytics">
          <Checkbox
            id="website-analytics"
            aria-labelledby="website-analytics-label"
            aria-describedby="website-analytics-description"
            disabled={!privacy.ready || privacy.signal}
            checked={privacy.analytics}
            onCheckedChange={(checked) =>
              update({
                analytics: checked,
                attribution: privacy.attribution,
              })
            }
          />
          <span>
            <strong id="website-analytics-label">
              Website analytics and performance
            </strong>
            <small id="website-analytics-description">
              Measure visits and performance with Vercel.
            </small>
          </span>
        </Label>
        <Label htmlFor="website-attribution">
          <Checkbox
            id="website-attribution"
            aria-labelledby="website-attribution-label"
            aria-describedby="website-attribution-description"
            disabled={!privacy.ready || privacy.signal}
            checked={privacy.attribution}
            onCheckedChange={(checked) =>
              update({
                analytics: privacy.analytics,
                attribution: checked,
              })
            }
          />
          <span>
            <strong id="website-attribution-label">Download attribution</strong>
            <small id="website-attribution-description">
              Measure app downloads with AppsFlyer.
            </small>
          </span>
        </Label>
      </fieldset>
      <Button
        type="button"
        disabled={!privacy.ready}
        onClick={() => update({ analytics: false, attribution: false })}
      >
        Turn off measurement
      </Button>
      <p className="legal-privacy-status" role="status" aria-live="polite">
        {notice || (privacy.saved ? 'Saved in this browser.' : '')}
      </p>
      <noscript>
        <p>Optional measurement is off while JavaScript is disabled.</p>
      </noscript>
    </div>
  );
}
