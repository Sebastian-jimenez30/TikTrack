const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  MESSAGES: "/messages",
  MESSAGE_EDIT: "/messages/[id]",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  INFLUENCERS_MANAGEMENT: "http://127.0.0.1:8000/api/v1/",
} as const;

export default ROUTES;
