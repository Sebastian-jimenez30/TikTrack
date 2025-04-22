const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  INFLUENCERS_DISABLED: "/admin/influencers/disabled",
  MESSAGES: "/messages/[username]",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
  MANAGEMENT: "/admin/users",
  MANAGEMENT_MANAGE: "/admin/users/manage", 
  MANAGEMENT_MANAGE_USER: "/admin/users/manage", 
} as const;

export default ROUTES;
