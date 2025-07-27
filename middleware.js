import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // ✅ If NO token, block access to /admin and /user
  if (!token) {
    console.log("❌ No token, redirecting:", url.pathname);
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // ✅ Verify JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // ✅ Block non-admin users from /admin
    if (url.pathname.startsWith("/admin") && payload.role !== "admin") {
      console.log("❌ Unauthorized role for admin:", payload.role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // ✅ Block users without proper role
    if (url.pathname.startsWith("/user") && !["user", "admin"].includes(payload.role)) {
      console.log("❌ Unauthorized role for user:", payload.role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("❌ JWT verify failed:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/user", "/user/:path*"],
};
