const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  INFLUENCERS_DISABLED: "/admin/influencers/disabled",
  MESSAGES: "/messages",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
  MANAGEMENT: "/admin/users",
} as const;

export default ROUTES;
