"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [cancelled, setCancelled] = useState(false);

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

          {/* NAVIGATION */}
          <div className="flex items-center gap-3">

            <Link
              href="/doctors"
              className="hidden rounded-lg px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100 sm:block"
            >
              Find Doctor
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
            >
              Home
            </Link>

          </div>

        </div>
      </nav>

      {/* DASHBOARD */}
      <section className="px-6 py-12">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div>
            <p className="font-semibold text-blue-600">
              PATIENT DASHBOARD
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Welcome back, Navya 👋
            </h1>

            <p className="mt-3 text-slate-600">
              Manage your appointments and healthcare information.
            </p>
          </div>

          {/* PATIENT INFORMATION */}
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                👤
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Navya
                </h2>

                <p className="mt-1 text-slate-500">
                  Patient ID: MP-1001
                </p>

                <p className="mt-1 text-slate-500">
                  navya@example.com
                </p>
              </div>

            </div>

          </div>

          {/* UPCOMING APPOINTMENT */}
          <div className="mt-8">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-slate-900">
                Upcoming Appointment
              </h2>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {cancelled ? "Cancelled" : "Confirmed"}
              </span>

            </div>

            {!cancelled ? (
              <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                {/* DOCTOR */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                      👨‍⚕️
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Dr. Rahul Sharma
                      </h3>

                      <p className="mt-1 font-semibold text-blue-600">
                        Cardiology
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        12 Years Experience
                      </p>
                    </div>

                  </div>

                  <div className="rounded-xl bg-blue-50 px-5 py-4 text-center">
                    <p className="text-sm text-slate-500">
                      Token Number
                    </p>

                    <p className="mt-1 text-3xl font-bold text-blue-600">
                      A-012
                    </p>
                  </div>

                </div>

                {/* APPOINTMENT DETAILS */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      📅 Date
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      25 August 2026
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      ⏰ Time
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      10:30 AM
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      💰 Consultation Fee
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      ₹800
                    </p>
                  </div>

                </div>

                {/* STATUS */}
                <div className="mt-6 rounded-xl bg-green-50 p-4">

                  <div className="flex items-center gap-3">

                    <span className="text-xl">
                      ✅
                    </span>

                    <div>
                      <p className="font-bold text-green-800">
                        Appointment Confirmed
                      </p>

                      <p className="text-sm text-green-700">
                        Please arrive 10 minutes before your appointment.
                      </p>
                    </div>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href="/doctors"
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-bold text-white hover:bg-blue-700"
                  >
                    Book Another Appointment
                  </Link>

                  <button
                    onClick={() => setCancelled(true)}
                    className="flex-1 rounded-xl border border-red-300 py-3 font-bold text-red-600 hover:bg-red-50"
                  >
                    Cancel Appointment
                  </button>

                </div>

              </div>
            ) : (

              /* CANCELLED MESSAGE */
              <div className="mt-5 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                  ❌
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Appointment Cancelled
                </h3>

                <p className="mt-2 text-slate-500">
                  Your appointment has been cancelled successfully.
                </p>

                <Link
                  href="/doctors"
                  className="mt-6 inline-block rounded-xl bg-blue-600 px-7 py-3 font-bold text-white hover:bg-blue-700"
                >
                  Book New Appointment
                </Link>

              </div>
            )}

          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <Link
                href="/doctors"
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl">
                  🩺
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Find a Doctor
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Search doctors and book appointments.
                </p>
              </Link>

              <Link
                href="/doctors"
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl">
                  📅
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Book Appointment
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Schedule your next hospital visit.
                </p>
              </Link>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                <div className="text-3xl">
                  📋
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Appointment History
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  View your previous appointments.
                </p>

              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                <div className="text-3xl">
                  💬
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Support
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Get help with your healthcare journey.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-slate-200 bg-slate-950 px-6 py-10 text-white">

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