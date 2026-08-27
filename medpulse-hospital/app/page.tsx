"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const departments = [
  {
    name: "Cardiology",
    icon: "❤️",
    description: "Heart & cardiovascular care",
  },
  {
    name: "Neurology",
    icon: "🧠",
    description: "Brain & nervous system",
  },
  {
    name: "Orthopedics",
    icon: "🦴",
    description: "Bones & joint care",
  },
  {
    name: "Dermatology",
    icon: "✨",
    description: "Skin & hair care",
  },
  {
    name: "Pediatrics",
    icon: "👶",
    description: "Healthcare for children",
  },
  {
    name: "General Medicine",
    icon: "🩺",
    description: "Primary healthcare",
  },
];

const features = [
  {
    icon: "📅",
    title: "Easy Appointment Booking",
    text: "Find your doctor and book an available time slot in minutes.",
  },
  {
    icon: "⏱️",
    title: "Live Token Generation",
    text: "Get your real-time token number instantly upon confirmation.",
  },
  {
    icon: "🤖",
    title: "Department Filters",
    text: "Filter through Cardiology, Neurology, Orthopedics, and Dermatology.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    text: "Your appointment and personal medical data are safely protected.",
  },
];

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDept) params.append("department", selectedDept);
    router.push(`/doctors${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white shadow-md shadow-blue-200">
              🏥
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-700">MedPulse</h1>
              <p className="text-xs text-slate-500">Healthcare made simple</p>
            </div>
          </Link>

          {/* NAVIGATION LINKS */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="font-medium text-blue-600">
              Home
            </Link>
            <Link href="/doctors" className="font-medium text-slate-600 hover:text-blue-600">
              Find a Doctor
            </Link>
            <Link href="#departments" className="font-medium text-slate-600 hover:text-blue-600">
              Departments
            </Link>
            <Link href="#features" className="font-medium text-slate-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="#contact" className="font-medium text-slate-600 hover:text-blue-600">
              Contact
            </Link>
          </div>

          {/* ACTION BUTTONS (DYNAMIC AUTH STATE) */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-blue-50 px-4 py-2.5 font-semibold text-blue-700 hover:bg-blue-100 transition"
                >
                  Dashboard ({user.name.split(" ")[0]})
                </Link>
                <button
                  onClick={() => logout()}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hidden rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700 transition sm:block"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          {/* HERO LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Trusted digital healthcare platform
            </div>

            <h2 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Healthcare that
              <span className="block text-blue-600">moves with you.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Find the right doctor, book an appointment in seconds, track your unique token number, and manage your hospital visits from one simple platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/doctors"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
              >
                Find a Doctor →
              </Link>
              <Link
                href="#departments"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-center font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition"
              >
                View Specialties
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-200 pt-8">
              <div>
                <p className="text-3xl font-extrabold text-slate-900">4+</p>
                <p className="text-sm font-medium text-slate-500">Expert Doctors</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900">4</p>
                <p className="text-sm font-medium text-slate-500">Key Departments</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900">100%</p>
                <p className="text-sm font-medium text-slate-500">Confirmed Tokens</p>
              </div>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-7 shadow-2xl shadow-blue-100 ring-1 ring-slate-100">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Quick Appointment
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">Find your doctor</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  🩺
                </div>
              </div>

              <form onSubmit={handleQuickSearch} className="space-y-4">
                {/* DEPARTMENT */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Department / Specialty
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="">All Departments</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>

                {/* SEARCH BUTTON */}
                <button
                  type="submit"
                  className="block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Search Available Doctors
                </button>
              </form>

              {/* SUCCESS INFO */}
              <div className="mt-6 rounded-xl bg-green-50 p-4 border border-green-100">
                <div className="flex items-center gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-green-800">Direct Booking & Token Generation</p>
                    <p className="text-xs text-green-700">Receive an instant digital token for your appointment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section id="departments" className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600 uppercase tracking-wide">Our Specialties</p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900">Find the right medical care</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Choose from our range of specialized departments and connect with trusted healthcare specialists.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl">
                  {dept.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{dept.name}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{dept.description}</p>
                <Link
                  href={`/doctors?department=${dept.name}`}
                  className="mt-5 inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:text-blue-700"
                >
                  View Doctors →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600 uppercase tracking-wide">Why Choose MedPulse</p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900">Healthcare, simplified</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Everything you need to manage your hospital visits and appointments from one single dashboard.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 hover:shadow-md transition"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-8 py-14 text-center text-white shadow-2xl shadow-blue-200">
          <h2 className="text-4xl font-bold">Ready to take control of your healthcare?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Book your consultation now, avoid long hospital queues, and manage your visits easily.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/doctors"
              className="rounded-xl bg-white px-8 py-4 font-bold text-blue-700 shadow-md hover:bg-blue-50 transition"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-slate-200 bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl text-white">
                🏥
              </div>
              <h2 className="text-xl font-bold">MedPulse</h2>
            </div>
            <p className="mt-4 max-w-sm leading-7 text-slate-400 text-sm">
              MedPulse Super Speciality Hospital. A smarter digital healthcare platform to discover doctors, book appointments, and track your visits.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white text-base">Quick Links</h3>
            <div className="mt-4 space-y-2.5 text-sm text-slate-400">
              <Link href="/doctors" className="block hover:text-white transition">
                Find a Doctor
              </Link>
              <Link href="/dashboard" className="block hover:text-white transition">
                Patient Dashboard
              </Link>
              <Link href="/login" className="block hover:text-white transition">
                Patient Login
              </Link>
              <Link href="/register" className="block hover:text-white transition">
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-base">Hospital Contact & Emergency</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p>📍 Plot 42, Health Avenue, Medical Enclave, Hyderabad, Telangana 500081</p>
              <p>📞 Phone: +91 40 1234 5678</p>
              <p>🚨 Emergency: 1066 / +91 40 9999 0000</p>
              <p>✉️ Email: contact@medpulsehospital.com</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © 2026 MedPulse Hospital. All rights reserved.
        </div>
      </footer>
    </main>
  );
}