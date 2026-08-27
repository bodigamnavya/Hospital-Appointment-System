-- ============================================================================
-- Database: MedPulse Hospital Appointment Management System
-- Engine: MySQL / MariaDB (InnoDB, UTF8MB4)
-- ============================================================================

-- 1. CREATE DATABASE
CREATE DATABASE IF NOT EXISTS `medpulse`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `medpulse`;

-- Disable foreign key checks during schema creation/resets if needed
SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables in reverse dependency order if they already exist
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `doctor_availability`;
DROP TABLE IF EXISTS `appointments`;
DROP TABLE IF EXISTS `doctors`;
DROP TABLE IF EXISTS `patients`;
DROP TABLE IF EXISTS `departments`;
DROP TABLE IF EXISTS `hospital_info`;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- 2. CREATE TABLES (IN CORRECT DEPENDENCY ORDER)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table: hospital_info
-- Stores basic hospital details, emergency contacts, and address
-- ----------------------------------------------------------------------------
CREATE TABLE `hospital_info` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `hospital_name` VARCHAR(150) NOT NULL,
    `address` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(150) NULL,
    `emergency_number` VARCHAR(20) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: departments
-- Stores hospital medical departments/specialties
-- ----------------------------------------------------------------------------
CREATE TABLE `departments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `description` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: patients
-- Stores patient registration profiles and authentication credentials
-- ----------------------------------------------------------------------------
CREATE TABLE `patients` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `phone` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NULL,
    `date_of_birth` DATE NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: doctors
-- Stores doctor listings, professional details, fees, and department links
-- ----------------------------------------------------------------------------
CREATE TABLE `doctors` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `specialty` VARCHAR(100) NOT NULL,
    `department_id` INT NOT NULL,
    `experience` VARCHAR(100) NOT NULL,
    `fee` DECIMAL(10,2) NOT NULL,
    `available_time` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(150) NULL,
    `profile_image` VARCHAR(255) NULL,
    `status` VARCHAR(20) DEFAULT 'Available',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_doctors_department`
        FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: appointments
-- Stores booked appointments, token numbers, status, and patient/doctor relations
-- ----------------------------------------------------------------------------
CREATE TABLE `appointments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `patient_id` INT NOT NULL,
    `doctor_id` INT NOT NULL,
    `appointment_date` DATE NOT NULL,
    `appointment_time` TIME NOT NULL,
    `token_number` VARCHAR(20) NULL,
    `reason` VARCHAR(255) NULL,
    `status` VARCHAR(30) DEFAULT 'Confirmed',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_appointments_patient`
        FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT `fk_appointments_doctor`
        FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    INDEX `idx_appointments_patient_id` (`patient_id`),
    INDEX `idx_appointments_doctor_id` (`doctor_id`),
    INDEX `idx_appointments_date` (`appointment_date`),
    INDEX `idx_appointments_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: doctor_availability
-- Stores doctor scheduling slots, specific dates, and working windows
-- ----------------------------------------------------------------------------
CREATE TABLE `doctor_availability` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `doctor_id` INT NOT NULL,
    `available_date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `status` VARCHAR(20) DEFAULT 'Available',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_doctor_availability_doctor`
        FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    INDEX `idx_doctor_availability_date` (`available_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: notifications
-- Stores alerts, booking confirmations, reminders, and updates for patients
-- ----------------------------------------------------------------------------
CREATE TABLE `notifications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `patient_id` INT NOT NULL,
    `appointment_id` INT NULL,
    `message` VARCHAR(255) NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_notifications_patient`
        FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT `fk_notifications_appointment`
        FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    INDEX `idx_notifications_patient_read` (`patient_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================================
-- 3. SAMPLE DATA INSERTION
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Insert Hospital Information
-- ----------------------------------------------------------------------------
INSERT INTO `hospital_info` (
    `hospital_name`,
    `address`,
    `phone`,
    `email`,
    `emergency_number`
) VALUES (
    'MedPulse Super Speciality Hospital',
    'Plot 42, Health Avenue, Medical Enclave, Hyderabad, Telangana 500081',
    '+91 40 1234 5678',
    'helpdesk@medpulsehospital.com',
    '1066 / +91 40 9999 0000'
);

-- ----------------------------------------------------------------------------
-- Insert Departments
-- ----------------------------------------------------------------------------
INSERT INTO `departments` (`id`, `name`, `description`) VALUES
(1, 'Cardiology', 'Comprehensive cardiovascular diagnostics, heart care, and surgical treatments.'),
(2, 'Neurology', 'Diagnosis and advanced treatments for brain, nerve, and spine disorders.'),
(3, 'Orthopedics', 'Treatment for joint, bone, ligament injuries, arthritis, and musculoskeletal care.'),
(4, 'Dermatology', 'Expert dermatological skin, hair, nail treatments, and cosmetic care.');

-- ----------------------------------------------------------------------------
-- Insert Doctors
-- ----------------------------------------------------------------------------
INSERT INTO `doctors` (
    `id`,
    `name`,
    `specialty`,
    `department_id`,
    `experience`,
    `fee`,
    `available_time`,
    `phone`,
    `email`,
    `profile_image`,
    `status`
) VALUES
(
    1,
    'Dr. Rahul Sharma',
    'Cardiologist',
    1,
    '12 Years Experience',
    800.00,
    '10:00 AM to 1:00 PM',
    '+91 98765 43210',
    'rahul.sharma@medpulse.com',
    '/images/doctors/dr-rahul-sharma.jpg',
    'Available'
),
(
    2,
    'Dr. Priya Reddy',
    'Neurologist',
    2,
    '10 Years Experience',
    700.00,
    '11:00 AM to 2:00 PM',
    '+91 98765 43211',
    'priya.reddy@medpulse.com',
    '/images/doctors/dr-priya-reddy.jpg',
    'Available'
),
(
    3,
    'Dr. Anil Kumar',
    'Orthopedic Surgeon',
    3,
    '15 Years Experience',
    600.00,
    '9:00 AM to 12:00 PM',
    '+91 98765 43212',
    'anil.kumar@medpulse.com',
    '/images/doctors/dr-anil-kumar.jpg',
    'Available'
),
(
    4,
    'Dr. Sneha Rao',
    'Dermatologist',
    4,
    '8 Years Experience',
    500.00,
    '2:00 PM to 5:00 PM',
    '+91 98765 43213',
    'sneha.rao@medpulse.com',
    '/images/doctors/dr-sneha-rao.jpg',
    'Available'
);

-- ----------------------------------------------------------------------------
-- Insert Sample Patients (Demonstration data with dummy hashed passwords)
-- ----------------------------------------------------------------------------
INSERT INTO `patients` (
    `id`,
    `name`,
    `email`,
    `phone`,
    `password`,
    `gender`,
    `date_of_birth`
) VALUES
(
    1,
    'Aarav Patel',
    'aarav.patel@example.com',
    '+91 91234 56789',
    '$2y$10$e8w.gT1yK7oRzWl90UvDde5cQe7fLzB.1xQ4rT2gH8k9pL0mM1n2O', -- demo bcrypt hash
    'Male',
    '1992-05-14'
),
(
    2,
    'Ananya Verma',
    'ananya.verma@example.com',
    '+91 92345 67890',
    '$2y$10$e8w.gT1yK7oRzWl90UvDde5cQe7fLzB.1xQ4rT2gH8k9pL0mM1n2O', -- demo bcrypt hash
    'Female',
    '1996-11-20'
);

-- ----------------------------------------------------------------------------
-- Insert Sample Doctor Availability
-- ----------------------------------------------------------------------------
INSERT INTO `doctor_availability` (
    `doctor_id`,
    `available_date`,
    `start_time`,
    `end_time`,
    `status`
) VALUES
(1, CURDATE(), '10:00:00', '13:00:00', 'Available'),
(2, CURDATE(), '11:00:00', '14:00:00', 'Available'),
(3, CURDATE(), '09:00:00', '12:00:00', 'Available'),
(4, CURDATE(), '14:00:00', '17:00:00', 'Available');

-- ----------------------------------------------------------------------------
-- Insert Sample Appointments with Token Numbers
-- ----------------------------------------------------------------------------
INSERT INTO `appointments` (
    `id`,
    `patient_id`,
    `doctor_id`,
    `appointment_date`,
    `appointment_time`,
    `token_number`,
    `reason`,
    `status`
) VALUES
(
    1,
    1,
    1,
    CURDATE(),
    '10:30:00',
    'MP-CARD-101',
    'Routine cardiology checkup and mild chest discomfort follow-up',
    'Confirmed'
),
(
    2,
    2,
    4,
    CURDATE(),
    '14:15:00',
    'MP-DERM-102',
    'Skin rash and seasonal allergy consultation',
    'Confirmed'
);

-- ----------------------------------------------------------------------------
-- Insert Sample Notifications
-- ----------------------------------------------------------------------------
INSERT INTO `notifications` (
    `patient_id`,
    `appointment_id`,
    `message`,
    `is_read`
) VALUES
(
    1,
    1,
    'Your appointment with Dr. Rahul Sharma (Token: MP-CARD-101) is confirmed for today at 10:30 AM.',
    FALSE
),
(
    2,
    2,
    'Your appointment with Dr. Sneha Rao (Token: MP-DERM-102) is confirmed for today at 2:15 PM.',
    FALSE
);


-- ============================================================================
-- 4. VERIFICATION / REPORTING QUERIES
-- ============================================================================

-- Query 1: Display all doctors with their department names
SELECT 
    d.id AS doctor_id,
    d.name AS doctor_name,
    d.specialty,
    dept.name AS department_name,
    d.experience,
    CONCAT('₹', FORMAT(d.fee, 2)) AS consultation_fee,
    d.available_time,
    d.phone,
    d.email,
    d.status
FROM doctors d
INNER JOIN departments dept ON d.department_id = dept.id
ORDER BY dept.name ASC, d.name ASC;

-- Query 2: Display appointments with patient name and doctor name
SELECT 
    a.id AS appointment_id,
    a.token_number,
    p.name AS patient_name,
    p.phone AS patient_phone,
    d.name AS doctor_name,
    dept.name AS department,
    a.appointment_date,
    TIME_FORMAT(a.appointment_time, '%h:%i %p') AS appointment_time,
    a.reason,
    a.status,
    a.created_at AS booking_time
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.id
INNER JOIN doctors d ON a.doctor_id = d.id
INNER JOIN departments dept ON d.department_id = dept.id
ORDER BY a.appointment_date DESC, a.appointment_time ASC;
