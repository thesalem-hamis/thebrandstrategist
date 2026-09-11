// ---- Core domain types for The Brand Strategist ----

export type ConsultationStatus = "pending" | "paid" | "failed" | "refunded";

export interface Consultation {
  id: string;
  reference: string;
  service_id: string | null;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  notes: string | null;
  session_date: string;
  session_time: string;
  amount: number;
  currency: string;
  status: ConsultationStatus;
  paystack_channel: string | null;
  zoom_link_sent: boolean;
  paystack_data: Record<string, unknown> | null;
  created_at: string;
  paid_at: string | null;
}

export interface ServiceRecord {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  payment_required: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
}

export type RequestStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export interface ServiceRequest {
  id: string;
  service_id: string | null;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  message: string | null;
  budget: string | null;
  request_status: RequestStatus;
  email_sent: boolean;
  created_at: string;
  services?: { name: string } | null;
}

export interface BookProduct {
  id: string;
  sku: string | null;
  title: string;
  author: string | null;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  pdf_url: string | null;
  stock_qty: number | null;
  is_digital: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  selar_link: string | null;
}

export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderDeliveryInfo {
  address?: string;
  city?: string;
  postcode?: string;
  country?: string;
  note?: string;
}

export interface Order {
  id: string;
  order_number: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  currency: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  delivery_info: OrderDeliveryInfo | null;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  paystack_reference: string | null;
  email_sent: boolean;
  created_at: string;
  paid_at: string | null;
  book_products?: { title: string; sku: string | null } | null;
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
