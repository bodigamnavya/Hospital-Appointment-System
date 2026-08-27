"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setMessage("Login successful! Welcome to MedPulse.");

    // Later we will connect this to database/backend.
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center justify-center">

        <div className="w-full rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">

          {/* LOGO */}
          <div className="text-center">

            <Link href="/" className="inline-flex">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl">
                🏥
              </div>
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-500">
              Login to your MedPulse account
            </p>

          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-semibold text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                onClick={() => setMessage("Password recovery will be added later.")}
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          {/* MESSAGE */}
          {message && (
            <div className="mt-5 rounded-xl bg-blue-50 p-4 text-center text-sm font-semibold text-blue-700">
              {message}
            </div>
          )}

          {/* REGISTER */}
          <div className="mt-7 text-center">

            <p className="text-slate-500">
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block font-bold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>

          </div>

          {/* BACK HOME */}
          <div className="mt-6 border-t border-slate-200 pt-5 text-center">

            <Link
              href="/"
              className="text-sm font-medium text-slate-500 hover:text-blue-600"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}