import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.soups.findMany({});

  return NextResponse.json(data);
}
