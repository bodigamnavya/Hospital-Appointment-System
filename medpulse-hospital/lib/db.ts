import mysql from "mysql2/promise";

// In-memory data store for fallback mode when MySQL server is not reachable
interface PatientRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: string | null;
  date_of_birth: string | null;
  created_at: string;
}

interface DepartmentRecord {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface DoctorRecord {
  id: number;
  name: string;
  specialty: string;
  department_id: number;
  department_name?: string;
  experience: string;
  fee: number;
  available_time: string;
  phone: string | null;
  email: string | null;
  profile_image: string | null;
  status: string;
  created_at: string;
}

interface AppointmentRecord {
  id: number;
  patient_id: number;
  doctor_id: number;
  doctor_name?: string;
  specialty?: string;
  department_name?: string;
  patient_name?: string;
  patient_phone?: string;
  appointment_date: string;
  appointment_time: string;
  token_number: string;
  reason: string | null;
  status: string;
  fee?: number;
  created_at: string;
}

// Initial seed data
const inMemoryData: {
  patients: PatientRecord[];
  departments: DepartmentRecord[];
  doctors: DoctorRecord[];
  appointments: AppointmentRecord[];
  nextPatientId: number;
  nextAppointmentId: number;
} = {
  patients: [
    {
      id: 1,
      name: "Navya Bodigam",
      email: "navya@example.com",
      phone: "+91 98765 43210",
      password: "d5c64c58f0b784a9ff59c40db2687103a11680d2cfb1bb18b0fb600eb9ebdfbe", // sha256 of "password123"
      gender: "Female",
      date_of_birth: "1998-06-15",
      created_at: new Date().toISOString(),
    },
  ],
  departments: [
    { id: 1, name: "Cardiology", description: "Heart & cardiovascular care", created_at: new Date().toISOString() },
    { id: 2, name: "Neurology", description: "Brain & nervous system disorders", created_at: new Date().toISOString() },
    { id: 3, name: "Orthopedics", description: "Bones, joints, and musculoskeletal care", created_at: new Date().toISOString() },
    { id: 4, name: "Dermatology", description: "Skin, hair, and cosmetic treatments", created_at: new Date().toISOString() },
  ],
  doctors: [
    {
      id: 1,
      name: "Dr. Rahul Sharma",
      specialty: "Cardiology",
      department_id: 1,
      department_name: "Cardiology",
      experience: "12 Years Experience",
      fee: 800,
      available_time: "10:00 AM - 1:00 PM",
      phone: "+91 98765 43210",
      email: "rahul.sharma@medpulse.com",
      profile_image: "/images/doctors/dr-rahul-sharma.jpg",
      status: "Available",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Dr. Priya Reddy",
      specialty: "Neurology",
      department_id: 2,
      department_name: "Neurology",
      experience: "10 Years Experience",
      fee: 700,
      available_time: "11:00 AM - 2:00 PM",
      phone: "+91 98765 43211",
      email: "priya.reddy@medpulse.com",
      profile_image: "/images/doctors/dr-priya-reddy.jpg",
      status: "Available",
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Dr. Anil Kumar",
      specialty: "Orthopedics",
      department_id: 3,
      department_name: "Orthopedics",
      experience: "15 Years Experience",
      fee: 600,
      available_time: "9:00 AM - 12:00 PM",
      phone: "+91 98765 43212",
      email: "anil.kumar@medpulse.com",
      profile_image: "/images/doctors/dr-anil-kumar.jpg",
      status: "Available",
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Dr. Sneha Rao",
      specialty: "Dermatology",
      department_id: 4,
      department_name: "Dermatology",
      experience: "8 Years Experience",
      fee: 500,
      available_time: "2:00 PM - 5:00 PM",
      phone: "+91 98765 43213",
      email: "sneha.rao@medpulse.com",
      profile_image: "/images/doctors/dr-sneha-rao.jpg",
      status: "Available",
      created_at: new Date().toISOString(),
    },
  ],
  appointments: [
    {
      id: 1,
      patient_id: 1,
      doctor_id: 1,
      doctor_name: "Dr. Rahul Sharma",
      specialty: "Cardiology",
      department_name: "Cardiology",
      patient_name: "Navya Bodigam",
      patient_phone: "+91 98765 43210",
      appointment_date: "2026-08-30",
      appointment_time: "10:30 AM",
      token_number: "MP-CARD-101",
      reason: "Routine cardiology checkup and follow-up",
      status: "Confirmed",
      fee: 800,
      created_at: new Date().toISOString(),
    },
  ],
  nextPatientId: 2,
  nextAppointmentId: 2,
};

let pool: mysql.Pool | null = null;
let isMySqlAvailable = false;
let checkedConnection = false;

export async function getDbPool(): Promise<mysql.Pool | null> {
  if (checkedConnection) {
    return isMySqlAvailable ? pool : null;
  }

  try {
    const p = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "medpulse",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000,
    });

    const conn = await p.getConnection();
    conn.release();
    pool = p;
    isMySqlAvailable = true;
    checkedConnection = true;
    console.log("Connected to MySQL MedPulse Database successfully.");
    return pool;
  } catch (err: unknown) {
    console.warn("MySQL server not reachable; using resilient in-memory database fallback.");
    isMySqlAvailable = false;
    checkedConnection = true;
    return null;
  }
}

// Database helper functions
export const db = {
  // Patients
  async findPatientByEmail(email: string): Promise<PatientRecord | null> {
    const p = await getDbPool();
    if (p) {
      try {
        const [rows] = await p.execute<mysql.RowDataPacket[]>(
          "SELECT * FROM patients WHERE email = ? LIMIT 1",
          [email.toLowerCase().trim()]
        );
        return (rows[0] as PatientRecord) || null;
      } catch (e) {
        console.error("MySQL query error, using fallback", e);
      }
    }
    const found = inMemoryData.patients.find(
      (pt) => pt.email.toLowerCase() === email.toLowerCase().trim()
    );
    return found ? { ...found } : null;
  },

  async findPatientById(id: number): Promise<PatientRecord | null> {
    const p = await getDbPool();
    if (p) {
      try {
        const [rows] = await p.execute<mysql.RowDataPacket[]>(
          "SELECT id, name, email, phone, gender, date_of_birth, created_at FROM patients WHERE id = ? LIMIT 1",
          [id]
        );
        return (rows[0] as PatientRecord) || null;
      } catch (e) {
        console.error("MySQL query error, using fallback", e);
      }
    }
    const found = inMemoryData.patients.find((pt) => pt.id === id);
    if (!found) return null;
    return {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      password: "",
      gender: found.gender,
      date_of_birth: found.date_of_birth,
      created_at: found.created_at,
    };
  },

  async createPatient(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    gender?: string | null;
    date_of_birth?: string | null;
  }): Promise<PatientRecord> {
    const p = await getDbPool();
    if (p) {
      try {
        const [result] = await p.execute<mysql.ResultSetHeader>(
          "INSERT INTO patients (name, email, phone, password, gender, date_of_birth) VALUES (?, ?, ?, ?, ?, ?)",
          [
            data.name.trim(),
            data.email.toLowerCase().trim(),
            data.phone.trim(),
            data.password,
            data.gender || null,
            data.date_of_birth || null,
          ]
        );
        return {
          id: result.insertId,
          name: data.name.trim(),
          email: data.email.toLowerCase().trim(),
          phone: data.phone.trim(),
          password: data.password,
          gender: data.gender || null,
          date_of_birth: data.date_of_birth || null,
          created_at: new Date().toISOString(),
        };
      } catch (e) {
        console.error("MySQL insert error, using fallback", e);
      }
    }

    const newRecord: PatientRecord = {
      id: inMemoryData.nextPatientId++,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      password: data.password,
      gender: data.gender || null,
      date_of_birth: data.date_of_birth || null,
      created_at: new Date().toISOString(),
    };
    inMemoryData.patients.push(newRecord);
    return newRecord;
  },

  async updatePatient(
    id: number,
    data: { name?: string; phone?: string; gender?: string | null; date_of_birth?: string | null }
  ): Promise<PatientRecord | null> {
    const p = await getDbPool();
    if (p) {
      try {
        await p.execute(
          "UPDATE patients SET name = COALESCE(?, name), phone = COALESCE(?, phone), gender = COALESCE(?, gender), date_of_birth = COALESCE(?, date_of_birth) WHERE id = ?",
          [data.name ?? null, data.phone ?? null, data.gender ?? null, data.date_of_birth ?? null, id]
        );
        return await this.findPatientById(id);
      } catch (e) {
        console.error("MySQL update error, using fallback", e);
      }
    }

    const patient = inMemoryData.patients.find((pt) => pt.id === id);
    if (!patient) return null;
    if (data.name !== undefined) patient.name = data.name.trim();
    if (data.phone !== undefined) patient.phone = data.phone.trim();
    if (data.gender !== undefined) patient.gender = data.gender;
    if (data.date_of_birth !== undefined) patient.date_of_birth = data.date_of_birth;
    return { ...patient };
  },

  // Doctors
  async getDoctors(query?: string, department?: string): Promise<DoctorRecord[]> {
    const p = await getDbPool();
    if (p) {
      try {
        let sql = `
          SELECT d.*, dept.name as department_name 
          FROM doctors d
          LEFT JOIN departments dept ON d.department_id = dept.id
          WHERE 1=1
        `;
        const params: (string | number)[] = [];

        if (department && department !== "all") {
          sql += " AND (dept.name = ? OR d.specialty = ?)";
          params.push(department, department);
        }

        if (query) {
          sql += " AND (d.name LIKE ? OR d.specialty LIKE ? OR dept.name LIKE ?)";
          const search = `%${query}%`;
          params.push(search, search, search);
        }

        sql += " ORDER BY d.id ASC";
        const [rows] = await p.execute<mysql.RowDataPacket[]>(sql, params);
        return rows as DoctorRecord[];
      } catch (e) {
        console.error("MySQL query error, using fallback", e);
      }
    }

    let results = inMemoryData.doctors.map((d) => {
      const dept = inMemoryData.departments.find((dp) => dp.id === d.department_id);
      return { ...d, department_name: dept?.name || d.specialty };
    });

    if (department && department.toLowerCase() !== "all") {
      results = results.filter(
        (doc) =>
          doc.specialty.toLowerCase() === department.toLowerCase() ||
          doc.department_name?.toLowerCase() === department.toLowerCase()
      );
    }

    if (query) {
      const q = query.toLowerCase().trim();
      results = results.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialty.toLowerCase().includes(q) ||
          doc.department_name?.toLowerCase().includes(q)
      );
    }

    return results;
  },

  async getDoctorById(id: number): Promise<DoctorRecord | null> {
    const p = await getDbPool();
    if (p) {
      try {
        const [rows] = await p.execute<mysql.RowDataPacket[]>(
          `SELECT d.*, dept.name as department_name 
           FROM doctors d
           LEFT JOIN departments dept ON d.department_id = dept.id
           WHERE d.id = ? LIMIT 1`,
          [id]
        );
        return (rows[0] as DoctorRecord) || null;
      } catch (e) {
        console.error("MySQL query error, using fallback", e);
      }
    }

    const doc = inMemoryData.doctors.find((d) => d.id === id);
    if (!doc) return null;
    const dept = inMemoryData.departments.find((dp) => dp.id === doc.department_id);
    return { ...doc, department_name: dept?.name || doc.specialty };
  },

  // Appointments
  async createAppointment(data: {
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    token_number: string;
    reason?: string | null;
  }): Promise<AppointmentRecord> {
    const p = await getDbPool();
    if (p) {
      try {
        const [result] = await p.execute<mysql.ResultSetHeader>(
          `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, token_number, reason, status) 
           VALUES (?, ?, ?, ?, ?, ?, 'Confirmed')`,
          [
            data.patient_id,
            data.doctor_id,
            data.appointment_date,
            data.appointment_time,
            data.token_number,
            data.reason || null,
          ]
        );

        const doc = await this.getDoctorById(data.doctor_id);
        const pt = await this.findPatientById(data.patient_id);

        return {
          id: result.insertId,
          patient_id: data.patient_id,
          doctor_id: data.doctor_id,
          doctor_name: doc?.name,
          specialty: doc?.specialty,
          department_name: doc?.department_name,
          fee: doc?.fee,
          patient_name: pt?.name,
          patient_phone: pt?.phone,
          appointment_date: data.appointment_date,
          appointment_time: data.appointment_time,
          token_number: data.token_number,
          reason: data.reason || null,
          status: "Confirmed",
          created_at: new Date().toISOString(),
        };
      } catch (e) {
        console.error("MySQL create appointment error, using fallback", e);
      }
    }

    const doc = inMemoryData.doctors.find((d) => d.id === data.doctor_id);
    const pt = inMemoryData.patients.find((p) => p.id === data.patient_id);

    const newApp: AppointmentRecord = {
      id: inMemoryData.nextAppointmentId++,
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      doctor_name: doc?.name || "Doctor",
      specialty: doc?.specialty || "General",
      department_name: doc?.department_name || doc?.specialty,
      patient_name: pt?.name || "Patient",
      patient_phone: pt?.phone,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      token_number: data.token_number,
      reason: data.reason || null,
      status: "Confirmed",
      fee: doc?.fee || 500,
      created_at: new Date().toISOString(),
    };

    inMemoryData.appointments.unshift(newApp);
    return newApp;
  },

  async getPatientAppointments(patient_id: number): Promise<AppointmentRecord[]> {
    const p = await getDbPool();
    if (p) {
      try {
        const [rows] = await p.execute<mysql.RowDataPacket[]>(
          `SELECT a.*, d.name as doctor_name, d.specialty, d.fee, dept.name as department_name
           FROM appointments a
           LEFT JOIN doctors d ON a.doctor_id = d.id
           LEFT JOIN departments dept ON d.department_id = dept.id
           WHERE a.patient_id = ?
           ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
          [patient_id]
        );
        return rows as AppointmentRecord[];
      } catch (e) {
        console.error("MySQL query appointments error, using fallback", e);
      }
    }

    return inMemoryData.appointments
      .filter((a) => a.patient_id === patient_id)
      .map((a) => {
        const doc = inMemoryData.doctors.find((d) => d.id === a.doctor_id);
        return {
          ...a,
          doctor_name: a.doctor_name || doc?.name,
          specialty: a.specialty || doc?.specialty,
          department_name: a.department_name || doc?.department_name || doc?.specialty,
          fee: a.fee || doc?.fee,
        };
      })
      .sort(
        (a, b) =>
          new Date(`${b.appointment_date} ${b.appointment_time}`).getTime() -
          new Date(`${a.appointment_date} ${a.appointment_time}`).getTime()
      );
  },

  async checkAppointmentConflict(
    doctor_id: number,
    date: string,
    time: string
  ): Promise<boolean> {
    const p = await getDbPool();
    if (p) {
      try {
        const [rows] = await p.execute<mysql.RowDataPacket[]>(
          "SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status != 'Cancelled' LIMIT 1",
          [doctor_id, date, time]
        );
        return rows.length > 0;
      } catch (e) {
        console.error("MySQL query conflict error, using fallback", e);
      }
    }

    return inMemoryData.appointments.some(
      (a) =>
        a.doctor_id === doctor_id &&
        a.appointment_date === date &&
        a.appointment_time === time &&
        a.status !== "Cancelled"
    );
  },

  async cancelAppointment(appointment_id: number, patient_id: number): Promise<boolean> {
    const p = await getDbPool();
    if (p) {
      try {
        const [res] = await p.execute<mysql.ResultSetHeader>(
          "UPDATE appointments SET status = 'Cancelled' WHERE id = ? AND patient_id = ?",
          [appointment_id, patient_id]
        );
        return res.affectedRows > 0;
      } catch (e) {
        console.error("MySQL cancel error, using fallback", e);
      }
    }

    const app = inMemoryData.appointments.find(
      (a) => a.id === appointment_id && a.patient_id === patient_id
    );
    if (!app) return false;
    app.status = "Cancelled";
    return true;
  },

  async getDepartments(): Promise<DepartmentRecord[]> {
    const p = await getDbPool();
    if (p) {
      try {
        const [rows] = await p.execute<mysql.RowDataPacket[]>(
          "SELECT * FROM departments ORDER BY id ASC"
        );
        return rows as DepartmentRecord[];
      } catch (e) {
        console.error("MySQL departments query error, using fallback", e);
      }
    }
    return inMemoryData.departments;
  },
};
