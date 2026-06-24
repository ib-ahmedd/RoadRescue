import { NextRequest, NextResponse } from "next/server";
import { getProviders } from "@/lib/db";

export async function GET() {
  try {
    const data = getProviders();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/providers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
