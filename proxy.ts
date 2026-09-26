import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

// Next.js 16 a renommé `middleware.ts` en `proxy.ts` (et la fonction exportée
// `middleware` en `proxy`) ; il s'exécute désormais en runtime Node.js.
export async function proxy(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAdminRoute && (!session || session.role !== "admin")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", "/admin");
    return NextResponse.redirect(loginUrl);
  }

  if (isDashboardRoute && (!session || session.role !== "investor")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", "/dashboard");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
