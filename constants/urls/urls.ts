const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  INFLUENCERS_DISABLED: "/admin/influencers/disabled",
  MESSAGES: "/messages/[username]",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile/[id]",
  USER_MANAGEMENT_INDEX: "/admin/users-management",
  USER_MANAGEMENT_DETAIL: "/admin/users-management/[id]",
} as const;

export default ROUTES;
