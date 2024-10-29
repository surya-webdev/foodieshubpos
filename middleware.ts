import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("pos-token")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (cookie) {
    try {
      const { payload } = await jwtVerify(cookie, JWT_SECRET);

      if (!payload.id) {
        throw new Error("Not autheticated");
      } else {
        // const { id } = payload;

        return NextResponse.next();
      }
      //
    } catch (error) {
      console.error("ERROR MESSAGE", error);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!signin|signup|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
