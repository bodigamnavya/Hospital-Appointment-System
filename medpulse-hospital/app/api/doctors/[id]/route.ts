import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const doctorId = parseInt(resolvedParams.id, 10);

    if (isNaN(doctorId)) {
      return NextResponse.json({ error: "Invalid doctor ID." }, { status: 400 });
    }

    const doctor = await db.getDoctorById(doctorId);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found." }, { status: 404 });
    }

    return NextResponse.json({ doctor });
  } catch (error: unknown) {
    console.error("Fetch doctor by ID error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve doctor details." },
      { status: 500 }
    );
  }
}
