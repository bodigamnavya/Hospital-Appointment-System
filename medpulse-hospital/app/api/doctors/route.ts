import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const dept = searchParams.get("department") || undefined;

    const doctors = await db.getDoctors(q, dept);
    return NextResponse.json({ doctors });
  } catch (error: unknown) {
    console.error("Fetch doctors error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve doctors list." },
      { status: 500 }
    );
  }
}
