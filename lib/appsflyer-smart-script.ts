export const APPSFLYER_SMART_SCRIPT_SRC =
  'https://onelinksmartscript.appsflyersdk.com/onelink-smart-script-latest.js';

export const APPSFLYER_SMART_SCRIPT_READY_EVENT =
  'appsflyer-smart-script-ready';

const oneLinkURL = 'https://predator.onelink.me/RpE0';

export const APPSFLYER_DEFAULT_ONELINK_URL =
  `${oneLinkURL}?pid=website&c=website&af_channel=website&af_ss_ui=true`;

type AppsFlyerParameter = {
  keys?: string[];
  defaultValue?: string;
};

type AppsFlyerCustomParameter = AppsFlyerParameter & {
  paramKey: string;
};

type AppsFlyerGenerateOneLinkArgs = {
  oneLinkURL: string;
  afParameters: {
    mediaSource: AppsFlyerParameter;
    campaign?: AppsFlyerParameter;
    channel?: AppsFlyerParameter;
    ad?: AppsFlyerParameter;
    afCustom?: AppsFlyerCustomParameter[];
  };
};

type AppsFlyerSmartScriptResult = {
  clickURL: string;
};

declare global {
  interface Window {
    AF_SMART_SCRIPT?: {
      generateOneLinkURL: (
        args: AppsFlyerGenerateOneLinkArgs,
      ) => AppsFlyerSmartScriptResult | null;
    };
  }
}

export function generateAppsFlyerOneLinkURL(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const result = window.AF_SMART_SCRIPT?.generateOneLinkURL({
    oneLinkURL,
    afParameters: {
      mediaSource: { keys: ['pid', 'utm_source'], defaultValue: 'website' },
      campaign: { keys: ['c', 'utm_campaign'], defaultValue: 'website' },
      channel: { keys: ['utm_medium'], defaultValue: 'website' },
      ad: { keys: ['utm_content'] },
      afCustom: [{ paramKey: 'af_ss_ui', defaultValue: 'true' }],
    },
  });

  return result?.clickURL ?? null;
}
