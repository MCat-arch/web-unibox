-- ====================================================================
-- SKEMA SUPABASE UNIBOX: KELOLA KONTEN AKTIVITAS (EVENT & BLOG)
-- Silakan salin (copy) seluruh isi file ini dan jalankan (RUN) di 
-- Supabase Dashboard -> SQL Editor -> New Query
-- ====================================================================

-- 1. Aktifkan Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Trigger Function untuk auto-update kolom updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------
-- 3. Tabel Admin Users (Autentikasi Admin)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger updated_at untuk admin_users
DROP TRIGGER IF EXISTS trg_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER trg_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 4. Tabel Aktivitas (Event & Blog)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('event', 'blog')),
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Kategori (Bilingual ID & EN)
    category_id VARCHAR(100) NOT NULL,
    category_en VARCHAR(100) NOT NULL,
    
    -- Judul (Bilingual ID & EN)
    title_id VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    
    -- Tanggal & Waktu
    date_id VARCHAR(50) NOT NULL,
    date_en VARCHAR(50) NOT NULL,
    time_id VARCHAR(50),
    time_en VARCHAR(50),
    
    -- Lokasi & Status
    location_id VARCHAR(255),
    location_en VARCHAR(255),
    status_id VARCHAR(50),      -- e.g. "Kegiatan Mendatang" atau "Telah Terlaksana"
    status_en VARCHAR(50),      -- e.g. "Upcoming Event" atau "Completed Event"
    
    -- Penulis / Author
    author_name VARCHAR(100) NOT NULL,
    author_role_id VARCHAR(100) NOT NULL,
    author_role_en VARCHAR(100) NOT NULL,
    
    -- Gambar & Ringkasan Konten
    image VARCHAR(500) NOT NULL,
    summary_id TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    intro_id TEXT NOT NULL,
    intro_en TEXT NOT NULL,
    
    -- Kutipan Opsional (Quote)
    quote_text_id TEXT,
    quote_text_en TEXT,
    quote_author VARCHAR(100),
    
    -- Capaian & Partisipan (Khusus Event Lampau / Selesai)
    outcome_id TEXT,
    outcome_en TEXT,
    participants_count VARCHAR(50),
    
    -- Status Publikasi
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indeks Performa untuk Pencarian & Filter Cepat
CREATE INDEX IF NOT EXISTS idx_activities_slug ON public.activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_published ON public.activities(is_published);
CREATE INDEX IF NOT EXISTS idx_activities_featured ON public.activities(featured);

-- Trigger updated_at untuk activities
DROP TRIGGER IF EXISTS trg_activities_updated_at ON public.activities;
CREATE TRIGGER trg_activities_updated_at
BEFORE UPDATE ON public.activities
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 5. Tabel Seksi Konten Dinamis (Sub-bab Artikel/Event)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    heading_id VARCHAR(255) NOT NULL,
    heading_en VARCHAR(255) NOT NULL,
    body_id TEXT NOT NULL,
    body_en TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indeks relasi
CREATE INDEX IF NOT EXISTS idx_content_sections_activity_id ON public.content_sections(activity_id);
CREATE INDEX IF NOT EXISTS idx_content_sections_order ON public.content_sections(activity_id, order_index);

-- --------------------------------------------------------------------
-- 6. Row Level Security (RLS) & Kebijakan Akses (Security Policy)
-- --------------------------------------------------------------------
-- Mengaktifkan RLS pada seluruh tabel
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;

-- Hapus policy lama jika ada sebelum membuat baru
DROP POLICY IF EXISTS "Public Read Published Activities" ON public.activities;
DROP POLICY IF EXISTS "Public Read Published Sections" ON public.content_sections;
DROP POLICY IF EXISTS "Service Role Full Access Activities" ON public.activities;
DROP POLICY IF EXISTS "Service Role Full Access Sections" ON public.content_sections;
DROP POLICY IF EXISTS "Service Role Full Access Admin Users" ON public.admin_users;

-- Policy 1: Publik (Anon) hanya boleh MEMBACA data activities yang is_published = TRUE
CREATE POLICY "Public Read Published Activities"
ON public.activities
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Policy 2: Publik (Anon) boleh membaca content_sections dari activities yang is_published = TRUE
CREATE POLICY "Public Read Published Sections"
ON public.content_sections
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.activities
        WHERE public.activities.id = public.content_sections.activity_id
        AND public.activities.is_published = true
    )
);

-- Policy 3: Akses penuh (CRUD) hanya untuk Service Role (Backend Server Actions Admin)
CREATE POLICY "Service Role Full Access Activities"
ON public.activities
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service Role Full Access Sections"
ON public.content_sections
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service Role Full Access Admin Users"
ON public.admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
