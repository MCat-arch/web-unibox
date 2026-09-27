export interface DbAdminUser {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface DbActivity {
  id: string;
  slug: string;
  type: "event" | "blog";
  featured: boolean;
  show_on_landing?: boolean;
  category_id: string;
  category_en: string;
  title_id: string;
  title_en: string;
  date_id: string;
  date_en: string;
  time_id?: string | null;
  time_en?: string | null;
  location_id?: string | null;
  location_en?: string | null;
  status_id?: string | null;
  status_en?: string | null;
  author_name: string;
  author_role_id: string;
  author_role_en: string;
  image: string;
  summary_id: string;
  summary_en: string;
  intro_id: string;
  intro_en: string;
  quote_text_id?: string | null;
  quote_text_en?: string | null;
  quote_author?: string | null;
  outcome_id?: string | null;
  outcome_en?: string | null;
  participants_count?: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  sections?: DbContentSection[];
}

export interface DbContentSection {
  id: string;
  activity_id: string;
  heading_id: string;
  heading_en: string;
  body_id: string;
  body_en: string;
  order_index: number;
  created_at: string;
}
