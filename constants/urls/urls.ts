const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_SEARCH: "/influencers/search",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  INFLUENCERS_DISABLED: "/admin/influencers/disabled",
  MESSAGES: "/messages",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
} as const;

export default ROUTES;
