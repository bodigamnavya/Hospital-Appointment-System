"use client";

import Link from "next/link";

const doctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    experience: "12 Years Experience",
    fee: "₹800",
    time: "10:00 AM - 1:00 PM",
  },
  {
    id: 2,
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    experience: "10 Years Experience",
    fee: "₹700",
    time: "11:00 AM - 2:00 PM",
  },
  {
    id: 3,
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    experience: "15 Years Experience",
    fee: "₹600",
    time: "9:00 AM - 12:00 PM",
  },
  {
    id: 4,
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    experience: "8 Years Experience",
    fee: "₹500",
    time: "2:00 PM - 5:00 PM",
  },
];

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
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

          {/* NAV BUTTONS */}
          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="hidden rounded-lg px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100 sm:block"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>

          </div>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="font-semibold text-blue-600">
              MEDPULSE DOCTORS
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Find a Doctor
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Search and book an appointment with qualified healthcare
              professionals.
            </p>
          </div>

          {/* DOCTOR CARDS */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* DOCTOR HEADER */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-3xl">
                      👨‍⚕️
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {doctor.name}
                      </h3>

                      <p className="mt-1 font-semibold text-blue-600">
                        {doctor.specialty}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {doctor.experience}
                      </p>
                    </div>

                  </div>

                  <span className="shrink-0 rounded-lg bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                    Available
                  </span>

                </div>

                {/* DOCTOR DETAILS */}
                <div className="mt-6 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Consultation
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {doctor.fee}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Available Time
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {doctor.time}
                    </p>
                  </div>

                </div>

                {/* VIEW PROFILE & BOOK */}
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-700"
                >
                  View Profile & Book
                </Link>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <h2 className="text-xl font-bold">
            🏥 MedPulse
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Healthcare made simple.
          </p>

          <p className="mt-5 text-sm text-slate-500">
            © 2026 MedPulse Hospital. All rights reserved.
          </p>

        </div>
      </footer>

    </main>
  );
}