"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AppointmentSuccessContent() {
  const searchParams = useSearchParams();

  const doctor = searchParams.get("doctor") || "Doctor";
  const date = searchParams.get("date") || "Not selected";
  const time = searchParams.get("time") || "Not selected";
  const token = searchParams.get("token") || "Pending";

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        ✅
      </div>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Appointment Confirmed!
      </h1>

      <p className="mt-3 text-slate-600">
        Your appointment has been successfully booked.
      </p>

      <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Appointment Details
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-slate-500">Doctor</span>
            <span className="font-semibold text-slate-900">{doctor}</span>
          </div>

          <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-slate-500">Date</span>
            <span className="font-semibold text-slate-900">{date}</span>
          </div>

          <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-slate-500">Time</span>
            <span className="font-semibold text-slate-900">{time}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Token Number</span>
            <span className="font-bold text-blue-600">{token}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/dashboard"
          className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/doctors"
          className="rounded-xl border border-slate-300 px-7 py-3.5 font-bold text-slate-700 hover:bg-slate-50"
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
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🏥
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-700">MedPulse</h1>
              <p className="text-xs text-slate-500">Healthcare made simple</p>
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

      <section className="flex min-h-[80vh] items-center justify-center px-6 py-12">
        <Suspense fallback={<div className="text-slate-500">Loading appointment details...</div>}>
          <AppointmentSuccessContent />
        </Suspense>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 MedPulse Hospital. All rights reserved.
      </footer>
    </main>
  );
}