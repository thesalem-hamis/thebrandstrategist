// ============================================================
// Edge Function: send-confirmation-email
// Single entry point for all customer-facing emails.
//
// Required secrets (supabase secrets set):
//   RESEND_API_KEY
//   EMAIL_FROM   e.g. "The Brand Strategist <bookings@yourdomain.com>"
//
// Endpoint: https://<project>.supabase.co/functions/v1/send-confirmation-email
// ============================================================
import { createClient } from "@supabase/supabase-js";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "onboarding@resend.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type EmailTemplate = "consultation" | "service_request" | "order";

interface ConsultationRow {
  client_name: string;
  client_email: string;
  session_date: string;
  session_time: string;
  amount: number;
  currency: string;
  reference: string;
  service_name?: string;
}

interface ServiceRequestRow {
  client_name: string;
  client_email: string;
  service_name: string;
  request_status: string;
  created_at: string;
}

interface OrderRow {
  client_name: string;
  client_email: string;
  book_title: string;
  quantity: number;
  total_amount: number;
  currency: string;
  order_number: string;
  pdf_url?: string | null;
}

const BRAND_COLOR = "#5D1F17";

const wrapHtml = (inner: string) => `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f4f2;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <div style="background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
        <div style="background:${BRAND_COLOR};padding:28px 32px;">
          <p style="margin:0;color:#ffffff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">The Brand Strategist</p>
        </div>
        <div style="padding:32px;">
          ${inner}
        </div>
        <div style="padding:20px 32px;background:#faf9f7;border-top:1px solid #eee;">
          <p style="margin:0;color:#aaa;font-size:11px;font-family:Arial,sans-serif;">© The Brand Strategist — Bimpe Mohammed</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

function consultationEmail(c: ConsultationRow, zoomLink: string): string {
  const amountDisplay = (c.amount / 100).toFixed(0);
  const joinBlock = zoomLink
    ? `<div style="background:#faf9f7;border:1px solid #e5e5e5;border-radius:6px;padding:20px;text-align:center;">
         <p style="margin:0 0 14px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-family:Arial,sans-serif;">Your Zoom Link</p>
         <a href="${zoomLink}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;">Join via Zoom</a>
         <p style="margin:14px 0 0;color:#777;font-size:11px;word-break:break-all;font-family:Arial,sans-serif;">${zoomLink}</p>
       </div>`
    : `<div style="background:#fff3cd;border:1px solid #ffe69c;border-radius:6px;padding:16px;text-align:center;">
         <p style="margin:0;color:#664d03;font-size:13px;font-family:Arial,sans-serif;">The Zoom link will be sent to you shortly. If you don't receive it, please reply to this email.</p>
       </div>`;
  return wrapHtml(`
    <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Dear ${c.client_name},</p>
    <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">
      Thank you — your payment of <strong>$${amountDisplay} ${c.currency}</strong> was received successfully.
      Your 1-on-1 strategy consultation${c.service_name ? ` (${c.service_name})` : ""} is confirmed.
    </p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-family:Arial,sans-serif;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Date</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.session_date}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Time</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.session_time}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Reference</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.reference}</td></tr>
    </table>
    ${joinBlock}
    <p style="margin:24px 0 0;color:#888;font-size:12px;line-height:1.6;font-family:Arial,sans-serif;">
      Please keep this email safe. If you have any questions, simply reply to this message.
    </p>
  `);
}

function serviceRequestEmail(r: ServiceRequestRow): string {
  return wrapHtml(`
    <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Dear ${r.client_name},</p>
    <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">
      Thank you — we have received your request for <strong>${r.service_name}</strong>.
      Our team has reviewed your submission and will reach out to you at <strong>${r.client_email}</strong> within 2 business days.
    </p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-family:Arial,sans-serif;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Submitted</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${new Date(r.created_at).toLocaleDateString()}</td></tr>
    </table>
    <div style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:6px;padding:16px;">
      <p style="margin:0;color:#065f46;font-size:13px;font-family:Arial,sans-serif;">
        💡 What happens next: Bimpe will review your goals and reply with tailored next steps and a proposal.
      </p>
    </div>
  `);
}

function orderEmail(o: OrderRow): string {
  const qty = String(o.quantity);
  const unit = (o.total_amount / o.quantity / 100).toFixed(2);

  const downloadBlock = o.pdf_url
    ? `<div style="background:#faf9f7;border:1px solid #e5e5e5;border-radius:6px;padding:20px;text-align:center;margin:0 0 24px;">
         <p style="margin:0 0 12px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-family:Arial,sans-serif;">Download Your Book</p>
         <a href="${o.pdf_url}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;">Download PDF</a>
         <p style="margin:12px 0 0;color:#777;font-size:11px;font-family:Arial,sans-serif;">This link is valid for 60 minutes.</p>
       </div>`
    : `<div style="background:#fff3cd;border:1px solid #ffe69c;border-radius:6px;padding:16px;text-align:center;">
         <p style="margin:0;color:#664d03;font-size:13px;font-family:Arial,sans-serif;">Your order is being processed and will ship in 1–3 business days. We'll email you again once your package is on the way.</p>
       </div>`;

  return wrapHtml(`
    <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Dear ${o.client_name},</p>
    <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">
      Thank you — your payment of <strong>$${(o.total_amount / 100).toFixed(0)} ${o.currency}</strong> was received successfully.
      Your order for <strong>${o.book_title}</strong> is confirmed.
    </p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-family:Arial,sans-serif;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Order #</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${o.order_number}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Item</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${o.book_title} x${qty}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Unit price</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">$${unit} ${o.currency}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Total</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">$${(o.total_amount / 100).toFixed(0)} ${o.currency}</td></tr>
    </table>
    ${downloadBlock}
  `);
}

async function getSetting(supabase: ReturnType<typeof createClient>, key: string): Promise<string> {
  const { data } = await supabase.from("site_settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? "";
}

async function getClientIp(req: Request): Promise<string> {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { template, data: payload } = body;
  if (!template || !payload) {
    return new Response(JSON.stringify({ error: "template and data are required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  let html: string;

  if (template === "consultation") {
    const zoomLink = await getSetting(supabase, "zoom_link");
    html = consultationEmail(payload as ConsultationRow, zoomLink);
  } else if (template === "service_request") {
    html = serviceRequestEmail(payload as ServiceRequestRow);
  } else if (template === "order") {
    html = orderEmail(payload as OrderRow);
  } else {
    return new Response(JSON.stringify({ error: "Unknown template" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [payload.client_email],
      subject:
        template === "consultation"
          ? `Your Session is Confirmed — ${payload.session_date} at ${payload.session_time}`
          : template === "service_request"
            ? `We received your request for ${payload.service_name}`
            : `Order ${payload.order_number} confirmed`,
      html,
    }),
  });

  const ip = await getClientIp(req);

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", errText);
    // Still persist email tracking even on failure if caller asked
    if (payload._tracking) {
      await supabase.from("email_log").insert({
        reference_id: payload._tracking.id,
        reference_type: payload._tracking.type,
        to_email: payload.client_email,
        status: "failed",
        provider_error: errText.slice(0, 500),
        client_ip: ip,
      });
    }
    return new Response(JSON.stringify({ success: false, error: errText }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (payload._tracking) {
    await supabase.from("email_log").insert({
      reference_id: payload._tracking.id,
      reference_type: payload._tracking.type,
      to_email: payload.client_email,
      status: "sent",
      provider_response: "ok",
      client_ip: ip,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
