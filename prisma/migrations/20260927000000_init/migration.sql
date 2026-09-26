-- CreateTable
CREATE TABLE IF NOT EXISTS "admin_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "activities" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "category_id" TEXT NOT NULL,
    "category_en" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "date_id" TEXT NOT NULL,
    "date_en" TEXT NOT NULL,
    "time_id" TEXT,
    "time_en" TEXT,
    "location_id" TEXT,
    "location_en" TEXT,
    "status_id" TEXT,
    "status_en" TEXT,
    "author_name" TEXT NOT NULL,
    "author_role_id" TEXT NOT NULL,
    "author_role_en" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "summary_id" TEXT NOT NULL,
    "summary_en" TEXT NOT NULL,
    "intro_id" TEXT NOT NULL,
    "intro_en" TEXT NOT NULL,
    "quote_text_id" TEXT,
    "quote_text_en" TEXT,
    "quote_author" TEXT,
    "outcome_id" TEXT,
    "outcome_en" TEXT,
    "participants_count" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "content_sections" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "heading_id" TEXT NOT NULL,
    "heading_en" TEXT NOT NULL,
    "body_id" TEXT NOT NULL,
    "body_en" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "admin_users_username_key" ON "admin_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "activities_slug_key" ON "activities"("slug");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'content_sections_activity_id_fkey'
    ) THEN
        ALTER TABLE "content_sections" ADD CONSTRAINT "content_sections_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
