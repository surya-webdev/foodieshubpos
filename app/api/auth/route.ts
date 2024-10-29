import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import prisma from "../../lib/db";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  if (!data.userName || !data.password)
    return NextResponse.json({
      status: 411,
      message: "Please provide the details",
    });

  const response = await prisma.user.findUnique({
    where: {
      userName: data.userName,
      password: data.password,
    },
  });

  if (!response) {
    return NextResponse.json({ message: "Enter the correct credenitails" });
  } else {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const token = await new SignJWT({ id: response.id })
        .setProtectedHeader({
          alg: "HS256",
        })
        .setExpirationTime("365Days")
        .sign(JWT_SECRET);

      const cookieStore = await cookies();

      cookieStore.set("pos-token", token);

      return NextResponse.json({
        status: 200,
        message: "success",
      });
    } catch (error) {
      console.error("ERROR MESSAGE", error);
      return NextResponse.json({ message: "Excution failed" });
    }
  }
}
