export const CREATOR_ONELINKS = {
  '/pedpatrol': 'https://predator.onelink.me/RpE0/8jjt6f2t',
  '/huntforpreds': 'https://predator.onelink.me/RpE0/rexk1nss',
  '/highervids': 'https://predator.onelink.me/RpE0/heiwqqh4',
  '/catchemonlive': 'https://predator.onelink.me/RpE0/d8mz0963',
  '/nypredhunters': 'https://predator.onelink.me/RpE0/a4iku9xx',
} as const;

export type CreatorPath = keyof typeof CREATOR_ONELINKS;
