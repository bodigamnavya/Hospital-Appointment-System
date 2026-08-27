"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  department_name?: string;
  experience: string;
  fee: number;
  available_time: string;
  status: string;
}

const defaultDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    department_name: "Cardiology",
    experience: "12 Years Experience",
    fee: 800,
    available_time: "10:00 AM - 1:00 PM",
    status: "Available",
  },
  {
    id: 2,
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    department_name: "Neurology",
    experience: "10 Years Experience",
    fee: 700,
    available_time: "11:00 AM - 2:00 PM",
    status: "Available",
  },
  {
    id: 3,
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    department_name: "Orthopedics",
    experience: "15 Years Experience",
    fee: 600,
    available_time: "9:00 AM - 12:00 PM",
    status: "Available",
  },
  {
    id: 4,
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    department_name: "Dermatology",
    experience: "8 Years Experience",
    fee: 500,
    available_time: "2:00 PM - 5:00 PM",
    status: "Available",
  },
];

const departments = ["All", "Cardiology", "Neurology", "Orthopedics", "Dermatology"];

function DoctorsContent() {
  const searchParams = useSearchParams();
  const initialDept = searchParams.get("department") || "All";

  const [doctors, setDoctors] = useState<Doctor[]>(defaultDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("q", searchQuery);
        if (selectedDept && selectedDept !== "All") params.append("department", selectedDept);

        const res = await fetch(`/api/doctors?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.doctors && data.doctors.length > 0) {
            setDoctors(data.doctors);
          } else {
            setDoctors([]);
          }
        }
      } catch {
        // Fallback to client filtering
        let filtered = defaultDoctors;
        if (selectedDept !== "All") {
          filtered = filtered.filter(
            (d) => d.specialty.toLowerCase() === selectedDept.toLowerCase()
          );
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
          );
        }
        setDoctors(filtered);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, [searchQuery, selectedDept]);

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
              href="/"
              className="hidden rounded-lg px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 sm:block"
            >
              Home
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 transition shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="px-6 py-10 bg-gradient-to-b from-blue-50/70 to-slate-50">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            MedPulse Medical Staff
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
            Find Your Specialist
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 text-sm sm:text-base">
            Book an appointment with qualified doctors across multiple departments and receive instant token confirmation.
          </p>

          {/* SEARCH & FILTERS */}
          <div className="mt-8 mx-auto max-w-3xl space-y-4">
            {/* SEARCH INPUT */}
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-lg text-slate-400">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, or condition..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* DEPARTMENT FILTER PILLS */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                    selectedDept.toLowerCase() === dept.toLowerCase()
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS GRID */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="py-20 text-center text-slate-500 font-medium">
              Loading available doctors...
            </div>
          ) : doctors.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200 max-w-lg mx-auto">
              <div className="text-4xl mb-4">🩺</div>
              <h3 className="text-xl font-bold text-slate-900">No Doctors Found</h3>
              <p className="mt-2 text-sm text-slate-500">
                We couldn't find any doctor matching "{searchQuery}" in {selectedDept}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("All");
                }}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-50/50 flex flex-col justify-between"
                >
                  <div>
                    {/* DOCTOR HEADER */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-3xl shadow-sm">
                          👨‍⚕️
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {doctor.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-blue-600 text-sm">
                              {doctor.specialty}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                              {doctor.department_name || doctor.specialty}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            ⭐ {doctor.experience}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 border border-green-200">
                        ● {doctor.status || "Available"}
                      </span>
                    </div>

                    {/* DOCTOR DETAILS */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Consultation Fee</p>
                        <p className="mt-0.5 font-extrabold text-slate-900 text-base">
                          ₹{doctor.fee}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Available Time</p>
                        <p className="mt-0.5 font-bold text-slate-800 text-xs sm:text-sm">
                          {doctor.available_time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <Link
                      href={`/doctors/${doctor.id}`}
                      className="rounded-xl border border-slate-300 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/appointment/${doctor.id}`}
                      className="rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-10 text-white mt-12">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-xl font-bold">🏥 MedPulse</h2>
          <p className="mt-2 text-xs text-slate-400">Healthcare made simple.</p>
          <p className="mt-4 text-xs text-slate-500">© 2026 MedPulse Hospital. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-500">Loading directory...</div>}>
      <DoctorsContent />
    </Suspense>
  );
}