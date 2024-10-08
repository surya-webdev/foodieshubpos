import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await prisma.starters.findMany();
  console.log(data);
  return NextResponse.json(data);
}
