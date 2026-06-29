export const APPSTACK_LINKS = {
  '/pedpatrol': 'https://appstack.link/EhzLFnmC?media_source=Influencers&campaign_name=pedpatrol&campaign_id=3ea08afe-707f-4faa-b224-611001784f94',
  '/huntforpreds': 'https://appstack.link/DZOYF5tU?media_source=Influencers&campaign_name=huntforpreds&campaign_id=08ae533b-deeb-43cb-9b85-ee0ec00a6679',
  '/highervids': 'https://appstack.link/abElohVc?media_source=Influencers&campaign_name=highervids&campaign_id=2bb67f34-2646-4acd-9aee-9c427225ff3c',
  '/catchemonlive': 'https://appstack.link/U7znX4R9?media_source=Influencers&campaign_name=catchemonlive&campaign_id=48009ab5-25e5-4982-a723-aceb7059b012',
  '/nypredhunters': 'https://appstack.link/U8mJKcyy?media_source=Influencers&campaign_name=nypredhunters&campaign_id=e8c4a93b-ddb1-4380-9618-0a9535a3b52f',
  '/beatingpedos': 'https://appstack.link/NsgTJRBL?media_source=Influencers&campaign_name=beatingpedos&campaign_id=e109e31d-7911-43dd-a25b-356bd21893fb',
  '/x': 'https://appstack.link/wuSTcrDM?media_source=Social_x&campaign_name=brand_x&campaign_id=333d22b0-6df2-4c31-86b1-224d7704e192',
} as const;

export type AppstackLinkPath = keyof typeof APPSTACK_LINKS;
