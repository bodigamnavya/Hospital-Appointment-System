"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

const doctors = [
  {
    id: "1",
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    experience: "12 Years Experience",
    fee: "₹800",
    time: "10:00 AM - 1:00 PM",
  },
  {
    id: "2",
    name: "Dr. Priya Reddy",
    specialty: "Neurology",
    experience: "10 Years Experience",
    fee: "₹700",
    time: "11:00 AM - 2:00 PM",
  },
  {
    id: "3",
    name: "Dr. Anil Kumar",
    specialty: "Orthopedics",
    experience: "15 Years Experience",
    fee: "₹600",
    time: "9:00 AM - 12:00 PM",
  },
  {
    id: "4",
    name: "Dr. Sneha Rao",
    specialty: "Dermatology",
    experience: "8 Years Experience",
    fee: "₹500",
    time: "2:00 PM - 5:00 PM",
  },
];

export default function BookAppointmentPage() {
  const params = useParams();

  const doctorId = String(params.id);

  const doctor =
    doctors.find((item) => item.id === doctorId) || doctors[0];

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
  }

  /* SUCCESS PAGE */

  if (submitted) {
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

          </div>
        </nav>

        {/* SUCCESS MESSAGE */}

        <section className="flex min-h-[75vh] items-center justify-center px-6">

          <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
              ✓
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Appointment Confirmed!
            </h2>

            <p className="mt-3 text-slate-600">
              Your appointment has been successfully booked.
            </p>

            {/* APPOINTMENT DETAILS */}

            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">

              <div>
                <p className="text-sm text-slate-500">
                  Doctor
                </p>

                <p className="font-bold text-slate-900">
                  {doctor.name}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">
                  Department
                </p>

                <p className="font-bold text-blue-600">
                  {doctor.specialty}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">
                  Patient
                </p>

                <p className="font-bold text-slate-900">
                  {patientName}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <p className="font-bold text-slate-900">
                  {phone}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">
                  Appointment
                </p>

                <p className="font-bold text-slate-900">
                  {date} - {time}
                </p>
              </div>

            </div>

            {/* BUTTONS */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/doctors"
                className="flex-1 rounded-xl border border-blue-600 px-5 py-3 text-center font-bold text-blue-600 hover:bg-blue-50"
              >
                Find Another Doctor
              </Link>

              <Link
                href="/"
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-center font-bold text-white hover:bg-blue-700"
              >
                Back to Home
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* BOOKING PAGE */

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
            Back to Doctors
          </Link>

        </div>

      </nav>

      {/* HEADER */}

      <section className="px-6 py-12">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="font-semibold text-blue-600">
              MEDPULSE APPOINTMENTS
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Book an Appointment
            </h2>

            <p className="mt-3 text-slate-600">
              Select your preferred date and time.
            </p>

          </div>

          {/* CONTENT */}

          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            {/* DOCTOR DETAILS */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                👨‍⚕️
              </div>

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                {doctor.name}
              </h3>

              <p className="mt-2 font-semibold text-blue-600">
                {doctor.specialty}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {doctor.experience}
              </p>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Consultation Fee
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {doctor.fee}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Available Hours
                  </p>

                  <p className="mt-1 font-bold">
                    {doctor.time}
                  </p>

                </div>

              </div>

            </div>

            {/* BOOKING FORM */}

            <div className="lg:col-span-2">

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
              >

                <h3 className="text-2xl font-bold text-slate-900">
                  Patient Information
                </h3>

                <p className="mt-2 text-slate-500">
                  Enter your details to book the appointment.
                </p>

                {/* PATIENT NAME */}

                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) =>
                      setPatientName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* PHONE */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter your phone number"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* DATE + TIME */}

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                  {/* DATE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Appointment Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        setDate(e.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>

                  {/* TIME */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Appointment Time
                    </label>

                    <select
                      value={time}
                      onChange={(e) =>
                        setTime(e.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    >

                      <option value="">
                        Select time
                      </option>

                      <option value="10:00 AM">
                        10:00 AM
                      </option>

                      <option value="10:30 AM">
                        10:30 AM
                      </option>

                      <option value="11:00 AM">
                        11:00 AM
                      </option>

                      <option value="11:30 AM">
                        11:30 AM
                      </option>

                      <option value="12:00 PM">
                        12:00 PM
                      </option>

                      <option value="12:30 PM">
                        12:30 PM
                      </option>

                    </select>

                  </div>

                </div>

                {/* REASON */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Reason for Visit
                  </label>

                  <textarea
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    placeholder="Describe your problem briefly"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* CONFIRM */}

                <button
                  type="submit"
                  className="mt-7 w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
                >
                  Confirm Appointment
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-10 text-white">

        <div className="mx-auto max-w-7xl text-center">

          <h2 className="text-xl font-bold">
            🏥 MedPulse
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Healthcare made simple.
          </p>

          <p className="mt-5 text-sm text-slate-500">
            © 2026 MedPulse Hospital. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}