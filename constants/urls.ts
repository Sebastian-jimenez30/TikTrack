const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  INFLUENCERS_DETAIL: "/influencers/[username]",
  MESSAGES: "/messages",
  MESSAGE_EDIT: "/messages/[id]",
} as const;

export default ROUTES;
