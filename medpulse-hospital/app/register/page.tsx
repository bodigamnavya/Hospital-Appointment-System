"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone.trim().length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    const result = await register({
      name,
      email,
      phone,
      password,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message || "Registration failed. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
          {/* LOGO */}
          <div className="text-center">
            <Link href="/" className="inline-flex">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-3xl text-white shadow-md shadow-blue-200">
                🏥
              </div>
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Create Your Account
            </h1>

            <p className="mt-2 text-slate-500 text-sm">
              Join MedPulse and manage your hospital healthcare easily.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {success ? (
            <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center border border-green-100">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600 mb-3">
                ✓
              </div>
              <h3 className="text-xl font-bold text-green-800">Account created successfully!</h3>
              <p className="mt-2 text-sm text-green-700">
                Welcome to MedPulse, {name}! Your patient profile is now ready.
              </p>
              <div className="mt-6 space-y-2.5">
                <Link
                  href="/dashboard"
                  className="block w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-md hover:bg-blue-700 transition text-center"
                >
                  Go to Patient Dashboard →
                </Link>
                <Link
                  href="/login"
                  className="block w-full rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition text-center text-sm"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="mt-8 space-y-4">
              {/* ERROR ALERT */}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 border border-red-100">
                  ⚠️ {error}
                </div>
              )}

              {/* NAME */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Navya Bodigam"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
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
                  placeholder="+91 98765 43210"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* LOGIN LINK */}
          <div className="mt-6 text-center text-sm">
            <p className="text-slate-500">Already have an account?</p>
            <Link
              href="/login"
              className="mt-1 inline-block font-semibold text-blue-600 hover:text-blue-700"
            >
              Login to your account
            </Link>
          </div>

          {/* HOME */}
          <div className="mt-5 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-blue-600 transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}