import Link from "next/link";

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
    name: "Pediatrics",
    icon: "👶",
    description: "Healthcare for children",
  },
  {
    name: "Dermatology",
    icon: "✨",
    description: "Skin & hair care",
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
    title: "Live Queue Tracking",
    text: "Track your token and know when it is your turn to meet the doctor.",
  },
  {
    icon: "🤖",
    title: "Smart Health Assistant",
    text: "Get help finding the right department before booking your appointment.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    text: "Your appointment and personal information are protected.",
  },
];

export default function Home() {
  return (
    <main
      className="min-h-screen bg-white text-slate-900"
      suppressHydrationWarning
    >
      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          {/* LOGO */}
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

          {/* NAVIGATION */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#home"
              className="font-medium text-blue-600"
            >
              Home
            </Link>

            <Link
              href="#departments"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Departments
            </Link>

            <Link
              href="#features"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Features
            </Link>

            <Link
              href="#contact"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50 sm:block"
              suppressHydrationWarning
            >
              Login
            </Link>

            <Link
              href="/doctors"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700"
              suppressHydrationWarning
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          
          {/* HERO LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <span>●</span>
              Trusted digital healthcare platform
            </div>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Healthcare that
              <span className="block text-blue-600">
                moves with you.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Find the right doctor, book an appointment, track your
              token in real time, and manage your healthcare journey
              from one simple platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/doctors"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                suppressHydrationWarning
              >
                Find a Doctor →
              </Link>

              <Link
                href="#features"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-center font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600"
                suppressHydrationWarning
              >
                How It Works
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  100+
                </p>
                <p className="text-sm text-slate-500">
                  Doctors
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  15+
                </p>
                <p className="text-sm text-slate-500">
                  Departments
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  24/7
                </p>
                <p className="text-sm text-slate-500">
                  Support
                </p>
              </div>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-blue-100 ring-1 ring-slate-100">
              
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Quick Appointment
                  </p>

                  <h3 className="text-2xl font-bold">
                    Find your doctor
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-100 p-3 text-2xl">
                  🩺
                </div>
              </div>

              <div className="space-y-4">
                
                {/* DEPARTMENT */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Department
                  </label>

                  <select
                    suppressHydrationWarning
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select department
                    </option>

                    <option value="cardiology">
                      Cardiology
                    </option>

                    <option value="neurology">
                      Neurology
                    </option>

                    <option value="orthopedics">
                      Orthopedics
                    </option>

                    <option value="pediatrics">
                      Pediatrics
                    </option>

                    <option value="dermatology">
                      Dermatology
                    </option>

                    <option value="general-medicine">
                      General Medicine
                    </option>
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Preferred Date
                  </label>

                  <input
                    suppressHydrationWarning
                    type="date"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* SEARCH */}
                <Link
                  href="/doctors"
                  className="block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white hover:bg-blue-700"
                  suppressHydrationWarning
                >
                  Search Available Doctors
                </Link>
              </div>

              {/* SUCCESS INFO */}
              <div className="mt-6 rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">✓</span>

                  <div>
                    <p className="font-semibold text-green-800">
                      Easy & Fast
                    </p>

                    <p className="text-sm text-green-700">
                      Book your appointment in minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section
        id="departments"
        className="px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              OUR SPECIALTIES
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Find the right care
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Choose from our wide range of medical departments
              and connect with qualified healthcare professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <div
                key={department.name}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {department.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {department.name}
                </h3>

                <p className="mt-2 text-slate-500">
                  {department.description}
                </p>

                <Link
                  href="/doctors"
                  className="mt-5 inline-block font-semibold text-blue-600 group-hover:text-blue-700"
                >
                  View Doctors →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="bg-slate-50 px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              WHY MEDPULSE
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Healthcare, simplified
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Everything you need to manage your hospital visits
              from one simple platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="text-4xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-8 py-14 text-center text-white shadow-2xl shadow-blue-100">
          
          <h2 className="text-4xl font-bold">
            Ready to take control of your healthcare?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Book your next appointment quickly and avoid
            unnecessary waiting at the hospital.
          </p>

          <Link
            href="/doctors"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-blue-700 hover:bg-blue-50"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-slate-200 bg-slate-950 px-6 py-12 text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                🏥
              </div>

              <h2 className="text-xl font-bold">
                MedPulse
              </h2>
            </div>

            <p className="mt-4 max-w-sm leading-7 text-slate-400">
              A smarter way to discover doctors, book appointments,
              and manage your hospital visits.
            </p>
          </div>

          <div>
            <h3 className="font-bold">
              Quick Links
            </h3>

            <div className="mt-4 space-y-3 text-slate-400">
              <Link
                href="/doctors"
                className="block hover:text-white"
              >
                Find a Doctor
              </Link>

              <Link
                href="#departments"
                className="block hover:text-white"
              >
                Departments
              </Link>

              <Link
                href="/doctors"
                className="block hover:text-white"
              >
                Appointments
              </Link>

              <Link
                href="/login"
                className="block hover:text-white"
              >
                Patient Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-slate-400">
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@medpulse.com</p>
              <p>📍 Hyderabad, India</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 MedPulse Hospital. All rights reserved.
        </div>
      </footer>
    </main>
  );
}