import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import prisma from "../../lib/db";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {

  const data = await req.json();

  if (!data.userName || !data.password)
    return NextResponse.json({
      status: 411,
      message: "Please provide the details",
      valid: "empty",
    });

  const response = await prisma.user.findUnique({
    where: {
      userName: data.userName,
      password: data.password,
    },
  });

  if (!response) {
    return NextResponse.json({
      message: "Enter the correct credenitails",
      authorized: false,
    });
  } else {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const token = await new SignJWT({ id: response.id })
        .setProtectedHeader({
          alg: "HS256",
        })
        .setExpirationTime("30d")
        .sign(JWT_SECRET);

      const cookieStore = await cookies();

      cookieStore.set("pos-token", token, {
        maxAge: 2419200, // 7 days in seconds
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return NextResponse.json({
        status: 200,
        message: "success",
      });
    } catch (error) {
      console.error("ERROR MESSAGE", error);
      return NextResponse.json({ message: "failed" });
    }
  }
}