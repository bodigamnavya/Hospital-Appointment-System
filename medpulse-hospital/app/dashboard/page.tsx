"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  doctor_name?: string;
  specialty?: string;
  department_name?: string;
  appointment_date: string;
  appointment_time: string;
  token_number: string;
  reason?: string | null;
  status: string;
  fee?: number;
  created_at: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [cancelModalId, setCancelModalId] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState("");

  // Route protection
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load appointments
  const fetchAppointments = async () => {
    if (!user) return;
    setLoadingApps(true);
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  // Handle cancellation
  const handleConfirmCancel = async () => {
    if (!cancelModalId) return;
    setCancelling(true);
    setCancelMessage("");

    try {
      const res = await fetch(`/api/appointments/${cancelModalId}/cancel`, {
        method: "PUT",
      });
      const data = await res.json();
      setCancelling(false);

      if (res.ok) {
        setCancelModalId(null);
        setCancelMessage("Appointment has been successfully cancelled.");
        // Refresh list
        fetchAppointments();
      } else {
        alert(data.error || "Failed to cancel appointment.");
      }
    } catch {
      setCancelling(false);
      alert("Network error occurred while cancelling appointment.");
    }
  };

  if (authLoading || (!user && authLoading)) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500 font-medium">Loading your dashboard...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  // Find latest active / upcoming appointment
  const upcomingAppointment = appointments.find((a) => a.status === "Confirmed") || appointments[0] || null;

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
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
              className="hidden rounded-lg px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 transition text-sm sm:block"
            >
              Find a Doctor
            </Link>
            <Link
              href="/profile"
              className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition text-sm"
            >
              My Profile
            </Link>
            <button
              onClick={() => logout()}
              className="rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-600 hover:bg-red-100 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* DASHBOARD CONTAINER */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* WELCOME HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Patient Portal
              </p>
              <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-slate-900">
                Welcome back, {user.name} 👋
              </h1>
              <p className="mt-1.5 text-slate-600 text-sm">
                Manage your hospital visits, upcoming appointments, and personal health details.
              </p>
            </div>

            <Link
              href="/doctors"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              + Book New Appointment
            </Link>
          </div>

          {/* STATUS ALERT */}
          {cancelMessage && (
            <div className="rounded-2xl bg-green-50 p-4 border border-green-200 text-sm font-semibold text-green-800 flex items-center justify-between">
              <span>✅ {cancelMessage}</span>
              <button
                onClick={() => setCancelMessage("")}
                className="text-green-600 hover:text-green-900"
              >
                ✕
              </button>
            </div>
          )}

          {/* PATIENT INFO BANNER */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-3xl shadow-inner">
                  👤
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                    <span>Patient ID: <strong className="text-slate-700">MP-{1000 + user.id}</strong></span>
                    <span>•</span>
                    <span>✉️ {user.email}</span>
                    <span>•</span>
                    <span>📞 {user.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* UPCOMING APPOINTMENT SECTION */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Featured / Upcoming Appointment</h2>
              {upcomingAppointment && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    upcomingAppointment.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  ● {upcomingAppointment.status}
                </span>
              )}
            </div>

            {loadingApps ? (
              <div className="rounded-3xl bg-white p-8 text-center text-slate-500 text-sm">
                Loading appointments...
              </div>
            ) : !upcomingAppointment ? (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="text-lg font-bold text-slate-900">No appointments yet</h3>
                <p className="mt-1 text-xs text-slate-500">
                  You haven't scheduled any doctor consultation with MedPulse yet.
                </p>
                <Link
                  href="/doctors"
                  className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Find a Doctor →
                </Link>
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-200">
                {/* TOP ROW: DOCTOR & TOKEN */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                      👨‍⚕️
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {upcomingAppointment.doctor_name || "Doctor"}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600">
                        {upcomingAppointment.specialty || "Specialist"} • {upcomingAppointment.department_name || "Medical Care"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-blue-50/80 px-5 py-3 text-center sm:text-right border border-blue-100">
                    <p className="text-xs text-slate-500 font-medium">Digital Token</p>
                    <p className="text-2xl font-extrabold text-blue-700">
                      {upcomingAppointment.token_number}
                    </p>
                  </div>
                </div>

                {/* DETAILS GRID */}
                <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-4">
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500">📅 Date</p>
                    <p className="mt-1 font-bold text-slate-900 text-sm">
                      {upcomingAppointment.appointment_date}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500">⏰ Time</p>
                    <p className="mt-1 font-bold text-slate-900 text-sm">
                      {upcomingAppointment.appointment_time}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500">💰 Fee</p>
                    <p className="mt-1 font-bold text-slate-900 text-sm">
                      ₹{upcomingAppointment.fee || 800}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500">📋 Status</p>
                    <p className={`mt-1 font-bold text-sm ${upcomingAppointment.status === "Confirmed" ? "text-green-700" : "text-red-600"}`}>
                      {upcomingAppointment.status}
                    </p>
                  </div>
                </div>

                {upcomingAppointment.reason && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs text-slate-600">
                    <strong className="text-slate-800">Reason for visit:</strong> {upcomingAppointment.reason}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row pt-4 border-t border-slate-100">
                  <Link
                    href="/doctors"
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-xs sm:text-sm font-bold text-white hover:bg-blue-700 transition"
                  >
                    Book Another Appointment
                  </Link>
                  {upcomingAppointment.status === "Confirmed" && (
                    <button
                      onClick={() => setCancelModalId(upcomingAppointment.id)}
                      className="flex-1 rounded-xl border border-red-300 py-3 text-center text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* APPOINTMENT HISTORY SECTION */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              My Appointments History ({appointments.length})
            </h2>

            {appointments.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 text-center text-xs text-slate-500">
                No past appointment records found.
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4">Token</th>
                        <th className="px-6 py-4">Doctor & Specialty</th>
                        <th className="px-6 py-4">Date & Time</th>
                        <th className="px-6 py-4">Fee</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-6 py-4 font-bold text-blue-700">
                            {app.token_number}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{app.doctor_name}</p>
                            <p className="text-xs text-slate-500">{app.specialty}</p>
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            <p className="font-semibold">{app.appointment_date}</p>
                            <p className="text-xs text-slate-500">{app.appointment_time}</p>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            ₹{app.fee || 500}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                app.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {app.status === "Confirmed" ? (
                              <button
                                onClick={() => setCancelModalId(app.id)}
                                className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline"
                              >
                                Cancel
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400">Cancelled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600 mb-4">
              ⚠️
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Cancel Appointment?
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setCancelModalId(null)}
                className="flex-1 rounded-xl border border-slate-300 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Keep Appointment
              </button>
              <button
                type="button"
                disabled={cancelling}
                onClick={handleConfirmCancel}
                className="flex-1 rounded-xl bg-red-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}