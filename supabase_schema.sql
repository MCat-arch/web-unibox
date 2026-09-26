-- ========================================================
-- UNIBOX DATABASE SCHEMA FOR SUPABASE
-- Run this in: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: admin_users
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: activities (Events & Blog Articles)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'event' | 'blog'
    featured BOOLEAN DEFAULT false,
    category_id VARCHAR(100) NOT NULL,
    category_en VARCHAR(100) NOT NULL,
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    date_id VARCHAR(100) NOT NULL,
    date_en VARCHAR(100) NOT NULL,
    time_id VARCHAR(100),
    time_en VARCHAR(100),
    location_id TEXT,
    location_en TEXT,
    status_id VARCHAR(100),
    status_en VARCHAR(100),
    author_name VARCHAR(255) NOT NULL,
    author_role_id VARCHAR(100) NOT NULL,
    author_role_en VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    summary_id TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    intro_id TEXT NOT NULL,
    intro_en TEXT NOT NULL,
    quote_text_id TEXT,
    quote_text_en TEXT,
    quote_author VARCHAR(255),
    outcome_id TEXT,
    outcome_en TEXT,
    participants_count VARCHAR(50),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: content_sections
CREATE TABLE IF NOT EXISTS public.content_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    heading_id TEXT NOT NULL,
    heading_en TEXT NOT NULL,
    body_id TEXT NOT NULL,
    body_en TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;

-- Public Read Policy for Published Activities
CREATE POLICY "Public read published activities"
    ON public.activities FOR SELECT
    USING (is_published = true);

-- Public Read Policy for Content Sections
CREATE POLICY "Public read content sections"
    ON public.content_sections FOR SELECT
    USING (true);

-- Service Role Full Access
CREATE POLICY "Service role full access on admin_users"
    ON public.admin_users FOR ALL
    USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on activities"
    ON public.activities FOR ALL
    USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on content_sections"
    ON public.content_sections FOR ALL
    USING (true) WITH CHECK (true);
