import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const resolvedParams = await params;
    const appointmentId = parseInt(resolvedParams.id, 10);

    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: "Invalid appointment ID." }, { status: 400 });
    }

    const success = await db.cancelAppointment(appointmentId, session.id);
    if (!success) {
      return NextResponse.json(
        { error: "Appointment not found or you do not have permission to cancel it." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment cancelled successfully.",
    });
  } catch (error: unknown) {
    console.error("Cancel appointment error:", error);
    return NextResponse.json(
      { error: "Failed to cancel appointment." },
      { status: 500 }
    );
  }
}
