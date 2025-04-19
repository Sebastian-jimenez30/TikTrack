const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  INFLUENCERS_DISABLED: "/admin/influencers/disabled",
  MESSAGES: "/messages",
  MESSAGES_DETAIL: "/messages/[id]",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
} as const;

export default ROUTES;
