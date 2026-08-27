"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  department_name?: string;
  experience: string;
  fee: number;
  available_time: string;
  phone?: string | null;
  email?: string | null;
  status: string;
}

const defaultDoctorsMap: Record<string, Doctor> = {
  "1": {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    department_name: "Cardiology",
    experience: "12 Years Experience",
    fee: 800,
    available_time: "10:00 AM - 1:00 PM",
    phone: "+91 98765 43210",
    email: "rahul.sharma@medpulse.com",
    status: "Available",
  },
  "2": {
    id: 2,
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    department_name: "Neurology",
    experience: "10 Years Experience",
    fee: 700,
    available_time: "11:00 AM - 2:00 PM",
    phone: "+91 98765 43211",
    email: "priya.reddy@medpulse.com",
    status: "Available",
  },
  "3": {
    id: 3,
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    department_name: "Orthopedics",
    experience: "15 Years Experience",
    fee: 600,
    available_time: "9:00 AM - 12:00 PM",
    phone: "+91 98765 43212",
    email: "anil.kumar@medpulse.com",
    status: "Available",
  },
  "4": {
    id: 4,
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    department_name: "Dermatology",
    experience: "8 Years Experience",
    fee: 500,
    available_time: "2:00 PM - 5:00 PM",
    phone: "+91 98765 43213",
    email: "sneha.rao@medpulse.com",
    status: "Available",
  },
};

export default function DoctorProfilePage() {
  const params = useParams();
  const idStr = String(params.id);
  const [doctor, setDoctor] = useState<Doctor | null>(defaultDoctorsMap[idStr] || null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadDoctor() {
      try {
        const res = await fetch(`/api/doctors/${idStr}`);
        if (res.ok) {
          const data = await res.json();
          if (data.doctor) {
            setDoctor(data.doctor);
          }
        }
      } catch {
        // Fallback
        if (defaultDoctorsMap[idStr]) {
          setDoctor(defaultDoctorsMap[idStr]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadDoctor();
  }, [idStr]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium">Loading doctor profile...</div>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-4xl mb-3">👨‍⚕️</div>
          <h1 className="text-2xl font-bold text-slate-900">Doctor Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The doctor you are looking for does not exist or is currently inactive.
          </p>
          <Link
            href="/doctors"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-700 transition"
          >
            ← Back to Doctors
          </Link>
        </div>
      </main>
    );
  }

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

          <div className="flex items-center gap-3">
            <Link
              href="/doctors"
              className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 transition text-sm"
            >
              ← Back to Doctors
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="hidden rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition text-sm sm:block"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* PROFILE SECTION */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
            {/* DOCTOR HEADER */}
            <div className="text-center border-b border-slate-100 pb-8">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-6xl shadow-inner">
                👨‍⚕️
              </div>

              <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
                {doctor.name}
              </h1>

              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-lg font-bold text-blue-600">
                  {doctor.specialty}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-0.5 rounded-full font-medium">
                  {doctor.department_name || doctor.specialty} Department
                </span>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold text-green-700 border border-green-200">
                  ● {doctor.status || "Available for Appointments"}
                </span>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Experience
                </p>
                <p className="mt-1.5 font-bold text-slate-900 text-base">
                  ⭐ {doctor.experience}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Consultation Fee
                </p>
                <p className="mt-1.5 font-extrabold text-slate-900 text-xl text-blue-700">
                  ₹{doctor.fee}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100 sm:col-span-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Available Working Hours & Days
                </p>
                <p className="mt-1.5 font-bold text-slate-900 text-base">
                  ⏰ Monday – Saturday: {doctor.available_time}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Instant digital tokens issued upon confirmation.
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/doctors"
                className="flex-1 rounded-xl border border-slate-300 py-4 text-center font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                ← Back to Doctors
              </Link>
              <Link
                href={`/appointment/${doctor.id}`}
                className="flex-1 rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
              >
                📅 Book Appointment
              </Link>
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