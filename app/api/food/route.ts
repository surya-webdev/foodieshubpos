import { NextResponse } from "next/server";

export async function GET() {
  const data = "hey";

  return NextResponse.json(data);
}
