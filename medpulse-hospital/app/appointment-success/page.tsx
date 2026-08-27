"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AppointmentSuccessContent() {
  const searchParams = useSearchParams();

  const doctor = searchParams.get("doctor") || "Doctor";
  const specialty = searchParams.get("specialty") || "Consultant Specialist";
  const date = searchParams.get("date") || "Not selected";
  const time = searchParams.get("time") || "Not selected";
  const token = searchParams.get("token") || "Pending";

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200 sm:p-12">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl shadow-inner">
        ✅
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
        Appointment Confirmed!
      </h1>

      <p className="mt-2 text-slate-600 text-sm sm:text-base">
        Your appointment has been successfully booked with MedPulse Hospital.
      </p>

      {/* APPOINTMENT DETAILS CARD */}
      <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left border border-slate-100">
        <h2 className="mb-5 text-base font-bold text-slate-900 uppercase tracking-wide">
          Appointment Details
        </h2>

        <div className="space-y-3.5 text-sm">
          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Doctor</span>
            <span className="font-bold text-slate-900">{doctor}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Department / Specialty</span>
            <span className="font-bold text-blue-700">{specialty}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Appointment Date</span>
            <span className="font-bold text-slate-900">{date}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Appointment Time</span>
            <span className="font-bold text-slate-900">{time}</span>
          </div>

          <div className="flex justify-between items-center pt-1">
            <div>
              <span className="text-slate-500 font-medium block">Digital Token Number</span>
              <span className="text-xs text-slate-400">Present this token at the reception desk</span>
            </div>
            <span className="font-extrabold text-2xl text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-100">
              {token}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/dashboard"
          className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-md hover:bg-blue-700 transition text-center"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/doctors"
          className="rounded-xl border border-slate-300 px-7 py-3.5 font-bold text-slate-700 hover:bg-slate-50 transition text-center"
        >
          Book Another Appointment
        </Link>
      </div>
    </div>
  );
}

export default function AppointmentSuccessPage() {
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
            href="/dashboard"
            className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 transition text-sm"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* SUCCESS CONTENT */}
      <section className="flex min-h-[80vh] items-center justify-center px-6 py-12">
        <Suspense
          fallback={
            <div className="text-slate-500 font-medium">
              Loading appointment confirmation...
            </div>
          }
        >
          <AppointmentSuccessContent />
        </Suspense>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-center text-xs text-slate-400">
        © 2026 MedPulse Hospital. All rights reserved.
      </footer>
    </main>
  );
}