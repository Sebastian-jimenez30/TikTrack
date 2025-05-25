const NEXT_PUBLIC_BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API!;
const ROUTES_API = {
  START_JOB: NEXT_PUBLIC_BASE_URL_API + "/api/backend/jobs/start-job",
  OPENAI:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/services/openai/generate-text",
  HOME_INDEX: NEXT_PUBLIC_BASE_URL_API + "/api/backend/home/index",
  INFLUENCER_INDEX: NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/index",
  INFLUENCER_SHOW: NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/show",
  INFLUENCER_DISABLED:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/disabled",
  INFLUENCER_REPORTED:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/reported",  
  INFLUENCER_DEACTIVATE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/admin/influencer/deactivate",
  INFLUENCER_ACTIVATE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/admin/influencer/activate",
  INFLUENCER_REPORT:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/report",
  INFLUENCER_REMOVE_REPORT:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/removeReport",
  INFLUENCER_COMPARE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/compare",
  INFLUENCER_LIKE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/like",
  INFLUENCER_UNLIKE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/unlike",
  LOGIN: NEXT_PUBLIC_BASE_URL_API + "/api/backend/auth/login",
  SIGN_UP: NEXT_PUBLIC_BASE_URL_API + "/api/backend/auth/sign-up",
  PROFILE_SHOW: NEXT_PUBLIC_BASE_URL_API + "/api/backend/profile/show",

  MESSAGE_INDEX: NEXT_PUBLIC_BASE_URL_API + "/api/backend/message/index",
  MESSAGE_CREATE: NEXT_PUBLIC_BASE_URL_API + "/api/backend/message/create",
  MESSAGE_EDIT: NEXT_PUBLIC_BASE_URL_API + "/api/backend/message/edit",
  MESSAGE_DELETE: NEXT_PUBLIC_BASE_URL_API + "/api/backend/message/delete",
  MESSAGE_SEND: (username: string) =>
    NEXT_PUBLIC_BASE_URL_API + `/api/backend/services/messages/${username}`,

  USER_MANAGEMENT_SHOW:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/admin/user-management/show",
  USER_MANAGEMENT_INDEX:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/admin/user-management/index",
  USER_MANAGEMENT_UPDATE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/admin/user-management/update",
} as const;

export default ROUTES_API;
