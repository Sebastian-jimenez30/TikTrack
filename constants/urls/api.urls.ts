const NEXT_PUBLIC_BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API!;
const ROUTES_API = {
  START_JOB: NEXT_PUBLIC_BASE_URL_API + "/api/backend/jobs/start-job",
  OPENAI:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/services/openai/generate-text",
  HOME_INDEX: NEXT_PUBLIC_BASE_URL_API + "/api/backend/home/index",
  INFLUENCER_INDEX: NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/index",
  INFLUENCER_SHOW: NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/show",
  INFLUENCER_DEACTIVATE:
    NEXT_PUBLIC_BASE_URL_API + "/api/backend/influencer/deactivate",
  LOGIN: NEXT_PUBLIC_BASE_URL_API + "/api/backend/auth/login",
  SIGN_UP: NEXT_PUBLIC_BASE_URL_API + "/api/backend/auth/sign-up",
  PROFILE_SHOW: NEXT_PUBLIC_BASE_URL_API + "/api/backend/profile/show",
} as const;

export default ROUTES_API;
