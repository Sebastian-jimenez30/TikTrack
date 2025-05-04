const TIKTRACK_SCRAPER_SYSTEM_URL =
  process.env.NEXT_PUBLIC_TIKTRACK_SCRAPER_SYSTEM_URL!;

const ROUTES = {
  GET_INFLUENCERS: TIKTRACK_SCRAPER_SYSTEM_URL + "influencers",
  SEND_MESSAGE: (username: string) =>
    TIKTRACK_SCRAPER_SYSTEM_URL + `messages/${username}`,
  
} as const;

export default ROUTES;
