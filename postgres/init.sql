-- =========================================
-- 🐾 PETTRACK – Inicialización completa
-- =========================================

-- =======================
-- 🧩 CREACIÓN DE BASES
-- =======================
CREATE DATABASE vet_auth;
CREATE DATABASE vet_pets;
CREATE DATABASE vet_appointments;
CREATE DATABASE vet_postconsultas;
CREATE DATABASE vet_rewards;

-- =======================
-- 1️⃣ vet_auth
-- =======================
\c vet_auth;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(200) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- =======================
-- 2️⃣ vet_pets
-- =======================
\c vet_pets;
CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    species VARCHAR(100),
    breed VARCHAR(100),
    owner_name VARCHAR(100)
);

-- =======================
-- 3️⃣ vet_appointments
-- =======================
\c vet_appointments;
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    pet_name VARCHAR(100),
    owner_name VARCHAR(100),
    doctor_name VARCHAR(100),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255)
);

-- =======================
-- 4️⃣ vet_postconsultas
-- =======================
\c vet_postconsultas;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_consulta') THEN
        CREATE TYPE estado_consulta AS ENUM ('pendiente', 'completada', 'cancelada');
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS postconsultas (
    id SERIAL PRIMARY KEY,
    mascota_id INTEGER NOT NULL,
    veterinario_id INTEGER NOT NULL,
    fecha_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT,
    observaciones TEXT,
    proxima_cita TIMESTAMP,
    estado estado_consulta DEFAULT 'pendiente'
);

-- =======================
-- 5️⃣ vet_rewards
-- =======================
\c vet_rewards;

CREATE TABLE IF NOT EXISTS rewards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    "desc" VARCHAR(255) NOT NULL,
    cost INTEGER NOT NULL,
    img VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS redemptions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    reward_id INTEGER NOT NULL,
    reward_name VARCHAR(100) NOT NULL,
    points INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'Pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
