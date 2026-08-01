const ONELINK_BASE = 'https://predator.onelink.me/RpE0';

export function getOneLinkUrl(slug: string): string {
  return `${ONELINK_BASE}/${slug}`;
}
