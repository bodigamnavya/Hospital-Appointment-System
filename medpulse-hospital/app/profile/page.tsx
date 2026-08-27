"use client";

import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser, logout } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setGender(user.gender || "");
      setDateOfBirth(user.date_of_birth ? user.date_of_birth.split("T")[0] : "");
    }
  }, [user, authLoading, router]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name || !phone) {
      setError("Full name and phone number are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          gender: gender || null,
          date_of_birth: dateOfBirth || null,
        }),
      });

      const data = await res.json();
      setSaving(false);

      if (res.ok) {
        setMessage("Profile updated successfully!");
        refreshUser();
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch {
      setSaving(false);
      setError("Network error occurred while saving changes.");
    }
  };

  if (authLoading || (!user && authLoading)) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500 font-medium">Loading profile...</div>
      </main>
    );
  }

  if (!user) return null;

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
              href="/dashboard"
              className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 transition text-sm"
            >
              ← Back to Dashboard
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

      {/* PROFILE SECTION */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl shadow-inner">
                👤
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Patient ID: <strong className="text-slate-800">MP-{1000 + user.id}</strong>
                </p>
                <p className="text-xs text-slate-500">✉️ {user.email}</p>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            {message && (
              <div className="mt-6 rounded-2xl bg-green-50 p-4 border border-green-200 text-xs sm:text-sm font-semibold text-green-800">
                ✅ {message}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl bg-red-50 p-4 border border-red-200 text-xs sm:text-sm font-semibold text-red-700">
                ⚠️ {error}
              </div>
            )}

            {/* EDIT PROFILE FORM */}
            <form onSubmit={handleSave} className="mt-6 space-y-4">
              {/* FULL NAME */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              {/* EMAIL (READ ONLY) */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email Address <span className="text-xs text-slate-400 font-normal">(Registered email cannot be changed)</span>
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              {/* GENDER & DATE OF BIRTH */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* GENDER */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* DATE OF BIRTH */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                  />
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button
                type="submit"
                disabled={saving}
                className="w-full mt-4 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-md hover:bg-blue-700 transition disabled:opacity-50 text-sm"
              >
                {saving ? "Saving Changes..." : "Save Profile Changes"}
              </button>
            </form>
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
