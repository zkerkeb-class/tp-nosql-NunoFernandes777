import jwt from "jsonwebtoken";

function getTokenFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return request.cookies.get("token")?.value || null;
}

export function requireAuth(request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return { ok: false, status: 401, error: "Authentication required" };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return { ok: false, status: 500, error: "JWT_SECRET is missing" };
  }

  try {
    const payload = jwt.verify(token, secret);
    return { ok: true, user: payload };
  } catch (_error) {
    return { ok: false, status: 401, error: "Invalid or expired token" };
  }
}
