"use client";

import Link from "next/link";

export default function AppointmentSuccessPage() {
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
            href="/dashboard"
            className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
          >
            Dashboard
          </Link>

        </div>
      </nav>

      {/* SUCCESS SECTION */}
      <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">

        <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200 sm:p-12">

          {/* SUCCESS ICON */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
            ✅
          </div>

          {/* TITLE */}
          <h1 className="mt-7 text-4xl font-bold text-slate-900">
            Appointment Confirmed!
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Your appointment has been successfully booked.
          </p>

          {/* APPOINTMENT DETAILS */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left">

            <h2 className="text-xl font-bold text-slate-900">
              Appointment Details
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Doctor
                </span>

                <span className="font-bold text-slate-900">
                  Dr. Rahul Sharma
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Department
                </span>

                <span className="font-bold text-blue-600">
                  Cardiology
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Date
                </span>

                <span className="font-bold text-slate-900">
                  25 August 2026
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Time
                </span>

                <span className="font-bold text-slate-900">
                  10:30 AM
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Token Number
                </span>

                <span className="font-bold text-blue-600">
                  A-012
                </span>
              </div>

            </div>

          </div>

          {/* DASHBOARD BUTTON */}
          <Link
            href="/dashboard"
            className="mt-8 block w-full rounded-xl bg-blue-600 px-6 py-4 text-center font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Go to Patient Dashboard →
          </Link>

          {/* BOOK ANOTHER */}
          <Link
            href="/doctors"
            className="mt-4 block w-full rounded-xl border border-slate-300 px-6 py-4 text-center font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
          >
            Book Another Appointment
          </Link>

          {/* HOME */}
          <Link
            href="/"
            className="mt-5 inline-block text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            ← Back to Home
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-center text-white">

        <h2 className="font-bold">
          🏥 MedPulse
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Healthcare made simple.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          © 2026 MedPulse Hospital. All rights reserved.
        </p>

      </footer>

    </main>
  );
}