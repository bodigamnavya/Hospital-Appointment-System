"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const doctors: Record<
  string,
  {
    name: string;
    specialty: string;
    experience: string;
    fee: string;
    time: string;
  }
> = {
  "1": {
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    experience: "12 Years Experience",
    fee: "₹800",
    time: "10:00 AM - 1:00 PM",
  },
  "2": {
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    experience: "10 Years Experience",
    fee: "₹700",
    time: "11:00 AM - 2:00 PM",
  },
  "3": {
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    experience: "15 Years Experience",
    fee: "₹600",
    time: "9:00 AM - 12:00 PM",
  },
  "4": {
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    experience: "8 Years Experience",
    fee: "₹500",
    time: "2:00 PM - 5:00 PM",
  },
};

export default function DoctorProfilePage() {
  const params = useParams();

  const id = String(params.id);

  const doctor = doctors[id];

  if (!doctor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Doctor Not Found
          </h1>

          <Link
            href="/doctors"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
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
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🏥
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-700">
                MedPulse
              </h1>

              <p className="text-xs text-slate-500">
                Healthcare made simple
              </p>
            </div>
          </Link>

          <Link
            href="/doctors"
            className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
          >
            ← Back to Doctors
          </Link>

        </div>
      </nav>

      {/* PROFILE */}
      <section className="px-6 py-14">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            {/* DOCTOR */}
            <div className="text-center">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-6xl">
                👨‍⚕️
              </div>

              <h1 className="mt-6 text-3xl font-bold text-slate-900">
                {doctor.name}
              </h1>

              <p className="mt-2 text-lg font-semibold text-blue-600">
                {doctor.specialty}
              </p>

              <span className="mt-4 inline-block rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                ✓ Available
              </span>

            </div>

            {/* DETAILS */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Experience
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {doctor.experience}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Consultation Fee
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {doctor.fee}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5 sm:col-span-2">
                <p className="text-sm text-slate-500">
                  Available Time
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {doctor.time}
                </p>
              </div>

            </div>

            {/* CONTINUE BOOKING */}
            <Link
              href={`/appointment/${id}`}
              className="mt-8 block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg hover:bg-blue-700"
            >
              📅 Continue Booking
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}