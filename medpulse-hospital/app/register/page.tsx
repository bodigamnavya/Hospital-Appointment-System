"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    const existingUser = localStorage.getItem("medpulseUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === email) {
        setMessage("An account with this email already exists.");
        return;
      }
    }

    const user = {
      name,
      email,
      phone,
      password,
    };

    localStorage.setItem("medpulseUser", JSON.stringify(user));

    setMessage("Account created successfully!");

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <div className="w-full rounded-3xl bg-white p-8 shadow-xl">
          
          {/* LOGO */}
          <div className="text-center">
            <Link href="/">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-3xl">
                🏥
              </div>
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Create Your Account
            </h1>

            <p className="mt-2 text-slate-500">
              Join MedPulse and manage your healthcare easily.
            </p>
          </div>

          {/* REGISTER FORM */}
          <form onSubmit={handleRegister} className="mt-8 space-y-5">

            {/* NAME */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-700">
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <p className="text-slate-500">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </div>

          {/* HOME */}
          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-blue-600"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}