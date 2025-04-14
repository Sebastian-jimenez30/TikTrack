const NEXT_PUBLIC_BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API!;
const ROUTES = {
    START_JOB: NEXT_PUBLIC_BASE_URL_API + "/api/backend/jobs/start-job",
    OPENAI: NEXT_PUBLIC_BASE_URL_API + "/api/backend/services/openai/generate-text",
  } as const;
  
export default ROUTES;
  