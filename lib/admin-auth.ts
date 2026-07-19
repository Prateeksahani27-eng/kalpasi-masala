import { siteConfig } from "@/lib/site-config";

export function isAdminAuthorized(request: Request): boolean {
  const secret = siteConfig.adminSecret;
  if (!secret) return false;

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7) === secret;
  }

  const header = request.headers.get("x-admin-secret");
  return header === secret;
}
