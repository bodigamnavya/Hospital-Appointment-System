import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

// GET: Fetch appointments for current logged-in patient
export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const appointments = await db.getPatientAppointments(session.id);
    return NextResponse.json({ appointments });
  } catch (error: unknown) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve appointments." },
      { status: 500 }
    );
  }
}

// POST: Create/book a new appointment
export async function POST(req: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to book an appointment." },
        { status: 401 }
      );
    }

    const { doctor_id, appointment_date, appointment_time, reason } = await req.json();

    if (!doctor_id || !appointment_date || !appointment_time) {
      return NextResponse.json(
        { error: "Doctor, appointment date, and appointment time are required." },
        { status: 400 }
      );
    }

    const doctorIdNum = parseInt(doctor_id, 10);
    const doctor = await db.getDoctorById(doctorIdNum);
    if (!doctor) {
      return NextResponse.json({ error: "Invalid doctor selected." }, { status: 404 });
    }

    // Check past date
    const selectedDate = new Date(appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return NextResponse.json(
        { error: "Appointment date cannot be in the past." },
        { status: 400 }
      );
    }

    // Conflict check
    const hasConflict = await db.checkAppointmentConflict(
      doctorIdNum,
      appointment_date,
      appointment_time
    );

    if (hasConflict) {
      return NextResponse.json(
        { error: "This time slot is already booked for this doctor. Please choose another time." },
        { status: 409 }
      );
    }

    // Generate unique token (e.g. MP-123 or MP-CARD-101)
    const deptPrefix = doctor.specialty ? doctor.specialty.substring(0, 4).toUpperCase() : "MED";
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const token_number = `MP-${deptPrefix}-${randomSuffix}`;

    const appointment = await db.createAppointment({
      patient_id: session.id,
      doctor_id: doctorIdNum,
      appointment_date,
      appointment_time,
      token_number,
      reason: reason || null,
    });

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully!",
      appointment,
    });
  } catch (error: unknown) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while booking appointment." },
      { status: 500 }
    );
  }
}
