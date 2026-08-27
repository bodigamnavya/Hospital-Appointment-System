import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { name, phone, gender, date_of_birth } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const updated = await db.updatePatient(session.id, {
      name,
      phone,
      gender: gender || null,
      date_of_birth: date_of_birth || null,
    });

    if (!updated) {
      return NextResponse.json({ error: "Patient record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully!",
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        gender: updated.gender,
        date_of_birth: updated.date_of_birth,
      },
    });
  } catch (error: unknown) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile." },
      { status: 500 }
    );
  }
}
