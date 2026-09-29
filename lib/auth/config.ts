const jwtSecret = process.env.ADMIN_JWT_SECRET;

if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error("ADMIN_JWT_SECRET must be configured with at least 32 characters.");
}

export const SESSION_COOKIE_NAME = "unibox_admin_session";
export const encodedJwtKey = new TextEncoder().encode(jwtSecret);
