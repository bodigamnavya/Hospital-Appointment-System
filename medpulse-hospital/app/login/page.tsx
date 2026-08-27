"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.message || "Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
          {/* LOGO */}
          <div className="text-center">
            <Link href="/" className="inline-flex">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white shadow-md shadow-blue-200">
                🏥
              </div>
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Login to your MedPulse patient account
            </p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {/* ERROR ALERT */}
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 border border-red-100">
                ⚠️ {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
              />
            </div>

            {/* DEMO CREDENTIALS HINT */}
            <div className="rounded-xl bg-blue-50/60 p-3 border border-blue-100 text-xs text-blue-800">
              <span className="font-bold">Demo Login:</span> <code className="bg-blue-100/70 px-1 py-0.5 rounded">navya@example.com</code> / <code className="bg-blue-100/70 px-1 py-0.5 rounded">password123</code>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-50 text-base mt-2"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* REGISTER */}
          <div className="mt-7 text-center text-sm">
            <p className="text-slate-500">Don't have an account?</p>
            <Link
              href="/register"
              className="mt-1 inline-block font-bold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </div>

          {/* BACK HOME */}
          <div className="mt-6 border-t border-slate-200 pt-5 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-blue-600 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}