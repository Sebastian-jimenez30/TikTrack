const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  INFLUENCERS_MANAGEMENT: "http://127.0.0.1:8000/api/v1/",
  PROFILE: "/profile",
} as const;

export default ROUTES;
