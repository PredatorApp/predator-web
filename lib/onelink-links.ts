export const ONELINK_LINKS = {
  '/pedpatrol': 'https://predator.onelink.me/RpE0/pedpatrol',
  '/huntforpreds': 'https://predator.onelink.me/RpE0/huntforpreds',
  '/catchemonlive': 'https://predator.onelink.me/RpE0/catchemonlive',
  '/nypredhunters': 'https://predator.onelink.me/RpE0/nypredhunters',
  '/beatingpedos': 'https://predator.onelink.me/RpE0/beatingpedos',
  '/taquarshy': 'https://predator.onelink.me/RpE0/taquarshy',
  '/x': 'https://predator.onelink.me/RpE0/x',
  '/fb': 'https://predator.onelink.me/RpE0/fb',
  '/ig': 'https://predator.onelink.me/RpE0/ig',
  '/threads': 'https://predator.onelink.me/RpE0/threads',
  '/tt': 'https://predator.onelink.me/RpE0/tt',
  '/yt': 'https://predator.onelink.me/RpE0/yt',
} as const;

export type OneLinkPath = keyof typeof ONELINK_LINKS;
