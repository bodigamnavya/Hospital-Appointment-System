"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  department_name?: string;
  fee: number;
  available_time: string;
}

const defaultDoctorsMap: Record<string, Doctor> = {
  "1": {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    department_name: "Cardiology",
    fee: 800,
    available_time: "10:00 AM - 1:00 PM",
  },
  "2": {
    id: 2,
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    department_name: "Neurology",
    fee: 700,
    available_time: "11:00 AM - 2:00 PM",
  },
  "3": {
    id: 3,
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    department_name: "Orthopedics",
    fee: 600,
    available_time: "9:00 AM - 12:00 PM",
  },
  "4": {
    id: 4,
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    department_name: "Dermatology",
    fee: 500,
    available_time: "2:00 PM - 5:00 PM",
  },
};

export default function AppointmentBookingPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = String(params.id);

  const { user, loading: authLoading } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(defaultDoctorsMap[idStr] || null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await fetch(`/api/doctors/${idStr}`);
        if (res.ok) {
          const data = await res.json();
          if (data.doctor) setDoctor(data.doctor);
        }
      } catch {
        if (defaultDoctorsMap[idStr]) setDoctor(defaultDoctorsMap[idStr]);
      }
    }
    fetchDoctor();
  }, [idStr]);

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Please login to your account before booking an appointment.");
      return;
    }

    if (!date || !time) {
      setError("Please select both appointment date and time.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: idStr,
          appointment_date: date,
          appointment_time: time,
          reason: reason.trim() || undefined,
        }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (res.ok && data.appointment) {
        const queryParams = new URLSearchParams({
          doctor: data.appointment.doctor_name || doctor?.name || "Doctor",
          specialty: data.appointment.specialty || doctor?.specialty || "General",
          date: data.appointment.appointment_date,
          time: data.appointment.appointment_time,
          token: data.appointment.token_number,
        });

        router.push(`/appointment-success?${queryParams.toString()}`);
      } else {
        setError(data.error || "Failed to book appointment. Please try again.");
      }
    } catch {
      setSubmitting(false);
      setError("Network error occurred while booking. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white shadow-md shadow-blue-200">
              🏥
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-700">MedPulse</h1>
              <p className="text-xs text-slate-500">Healthcare made simple</p>
            </div>
          </Link>

          <Link
            href="/doctors"
            className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 transition text-sm"
          >
            ← Back to Doctors
          </Link>
        </div>
      </nav>

      {/* APPOINTMENT BOOKING SECTION */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              MedPulse Booking Portal
            </p>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Book Your Appointment
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Confirm your schedule with {doctor?.name || "your specialist"} and get your token.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* DOCTOR SUMMARY CARD */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 h-fit">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-4xl shadow-inner">
                  👨‍⚕️
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {doctor?.name || "Doctor"}
                </h2>

                <p className="mt-1 font-semibold text-blue-600 text-sm">
                  {doctor?.specialty}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  {doctor?.department_name || doctor?.specialty} Department
                </p>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Consultation Fee</p>
                  <p className="mt-0.5 font-bold text-slate-900 text-base">
                    ₹{doctor?.fee || 500}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Available Working Hours</p>
                  <p className="mt-0.5 font-bold text-slate-800 text-xs">
                    {doctor?.available_time || "10:00 AM - 1:00 PM"}
                  </p>
                </div>
              </div>
            </div>

            {/* BOOKING FORM */}
            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Appointment Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Fill out your preferred appointment schedule.</p>
                </div>
                {user && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    Patient: {user.name}
                  </span>
                )}
              </div>

              {/* AUTH ALERT IF GUEST */}
              {!authLoading && !user && (
                <div className="mt-5 rounded-2xl bg-amber-50 p-4 border border-amber-200">
                  <p className="text-xs font-bold text-amber-800">⚠️ Account Required</p>
                  <p className="text-xs text-amber-700 mt-1">
                    You must be logged in to confirm your appointment and receive a token.
                  </p>
                  <Link
                    href="/login"
                    className="mt-3 inline-block rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition"
                  >
                    Login to Continue
                  </Link>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="mt-5 rounded-xl bg-red-50 p-4 text-xs sm:text-sm font-semibold text-red-700 border border-red-200">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleConfirm} className="mt-6 space-y-4">
                {/* DATE */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                  />
                </div>

                {/* TIME SLOTS */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                  >
                    <option value="">Select time slot</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>

                {/* REASON FOR VISIT */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Reason for Visit / Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    placeholder="Describe your symptoms or purpose of consultation..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm resize-none"
                  />
                </div>

                {/* CONFIRM BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-50 text-base mt-4"
                >
                  {submitting ? "Confirming & Generating Token..." : "✅ Confirm Appointment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-center text-xs text-slate-400 mt-12">
        © 2026 MedPulse Hospital. All rights reserved.
      </footer>
    </main>
  );
}