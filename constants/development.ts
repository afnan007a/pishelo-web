export const isDev = process.env.NODE_ENV !== "production";
export const serverAddress = isDev
  ? "http://localhost:3000"
  : process.env.VERCEL_URL || "https://aprilbeat.vercel.app";
export const deploymentMode = process.env.NEXT_PUBLIC_VERCEL_ENV;
export const serverRegion = process.env.VERCEL_REGION || 'Unavailable';
export const gitSHA = process.env.VERCEL_GIT_COMMIT_SHA || 'Unavailable';
export const gitBranch = process.env.VERCEL_GIT_COMMIT_REF || "Unavailable";

export const serverVersion = "2022.407.0";