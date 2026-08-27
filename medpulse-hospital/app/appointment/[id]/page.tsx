"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const doctors: Record<
  string,
  {
    name: string;
    specialty: string;
    fee: string;
    time: string;
  }
> = {
  "1": {
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    fee: "₹800",
    time: "10:00 AM - 1:00 PM",
  },
  "2": {
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    fee: "₹700",
    time: "11:00 AM - 2:00 PM",
  },
  "3": {
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    fee: "₹600",
    time: "9:00 AM - 12:00 PM",
  },
  "4": {
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    fee: "₹500",
    time: "2:00 PM - 5:00 PM",
  },
};

export default function AppointmentPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const doctor = doctors[id] || doctors["1"];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date || !time) {
      alert("Please fill all appointment details.");
      return;
    }

    alert("Appointment booked successfully!");

    router.push("/appointment-success");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🏥
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-700">
                MedPulse
              </h1>

              <p className="text-xs text-slate-500">
                Healthcare made simple
              </p>
            </div>
          </Link>

          <Link
            href="/doctors"
            className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
          >
            ← Doctors
          </Link>

        </div>
      </nav>

      {/* APPOINTMENT SECTION */}
      <section className="px-6 py-14">

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <p className="font-semibold text-blue-600">
              MEDPULSE APPOINTMENT
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Book Appointment
            </h1>

            <p className="mt-3 text-slate-600">
              Enter your details and select your preferred appointment time.
            </p>

          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">

            {/* DOCTOR INFORMATION */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

              <div className="text-center">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl">
                  👨‍⚕️
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {doctor.name}
                </h2>

                <p className="mt-2 font-semibold text-blue-600">
                  {doctor.specialty}
                </p>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Consultation Fee
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {doctor.fee}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Available Time
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {doctor.time}
                  </p>
                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="md:col-span-2 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

              <h2 className="text-2xl font-bold text-slate-900">
                Patient Details
              </h2>

              <form
                onSubmit={handleConfirm}
                className="mt-6 space-y-5"
              >

                {/* NAME */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* TIME */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Preferred Time
                  </label>

                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="">
                      Select appointment time
                    </option>

                    <option value="10:00 AM">
                      10:00 AM
                    </option>

                    <option value="11:00 AM">
                      11:00 AM
                    </option>

                    <option value="12:00 PM">
                      12:00 PM
                    </option>

                    <option value="1:00 PM">
                      1:00 PM
                    </option>

                    <option value="2:00 PM">
                      2:00 PM
                    </option>

                    <option value="3:00 PM">
                      3:00 PM
                    </option>
                  </select>
                </div>

                {/* CONFIRM BUTTON */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg hover:bg-blue-700"
                >
                  ✅ Confirm Appointment
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-center text-white">

        <h2 className="font-bold">
          🏥 MedPulse
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Healthcare made simple.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          © 2026 MedPulse Hospital. All rights reserved.
        </p>

      </footer>

    </main>
  );
}