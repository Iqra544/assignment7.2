import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // If no token and accessing protected paths
  if (
    !token &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/user") ||
      pathname.startsWith("/attendance") ||
      pathname.startsWith("/payroll"))
  ) {
    console.log("No token, redirecting to login:", pathname);
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role;

    //  Protect admin route
    if (pathname.startsWith("/admin") && role !== "admin") {
      console.log("Admin only access denied:", role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    //  Protect user route
    if (pathname.startsWith("/user") && !["user", "admin"].includes(role)) {
      console.log("User section access denied:", role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    //  /attendance/mark → only for users
    if (pathname.startsWith("/attendance/mark") && role !== "user") {
      console.log("Attendance mark is user-only. Role:", role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // /attendance/history → user and admin
    if (
      pathname.startsWith("/attendance/history") &&
      !["user", "admin"].includes(role)
    ) {
      console.log("Attendance history access denied. Role:", role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    //payroll → admin only
    if (pathname.startsWith("/payroll") && role !== "admin") {
      console.log("Payroll access denied. Role:", role);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/attendance/:path*",
    "/payroll/:path*",
  ],
};
