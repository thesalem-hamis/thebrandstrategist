export type ConsultationStatus = "pending" | "paid" | "failed";

export interface Consultation {
  id: string;
  reference: string;
  client_name: string;
  client_email: string;
  notes: string | null;
  session_date: string; // YYYY-MM-DD
  session_time: string;
  amount: number; // subunits
  currency: string;
  status: ConsultationStatus;
  paystack_channel: string | null;
  zoom_link_sent: boolean;
  paystack_data: Record<string, unknown> | null;
  created_at: string;
  paid_at: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  budget: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface SiteSettings {
  zoom_link: string;
  consultation_fee_usd: string;
  contact_email: string;
}